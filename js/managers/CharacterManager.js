// v1.2.0 CharacterManager
// 캐릭터 데이터 로딩/정규화/가챠풀 생성 전담 모듈.
// 신규 캐릭터 추가 시:
// 1) assets/characters/<key>/character.json 작성
// 2) data/character_manifest.json에 character.json 경로 추가
// 3) 이미지/이펙트/투사체 리소스 추가
(function(){
  'use strict';

  async function loadJsonSafe(url){
    try{
      const res = await fetch(url, { cache: 'no-store' });
      if(!res.ok) throw new Error(url + ' ' + res.status);
      return await res.json();
    }catch(err){
      console.warn('[CharacterManager] JSON load failed:', url, err);
      return null;
    }
  }

  function asNumber(value, fallback){
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  }

  function percentToRatio(value, fallback){
    const n = asNumber(value, fallback);
    return n > 1 ? n / 100 : n;
  }

  function normalizeSkillFields(d){
    for(const s of (d.skills || [])){
      if(!s || !s.type) continue;

      if(s.type === 'lifesteal'){
        d.lifeSteal = asNumber(s.value, d.lifeSteal || 0);
        if(d.lifeSteal > 1) d.lifeSteal /= 100;
      }

      if(s.type === 'double_attack' || s.type === 'doubleAttack'){
        d.extraHitChance = percentToRatio(s.chance, d.extraHitChance || 0);
        d.extraHitAtk = asNumber(s.damage, d.extraHitAtk || d.atk);
      }

      if(s.type === 'paralyze'){
        d.paralyzeChance = percentToRatio(s.chance ?? 1, d.paralyzeChance ?? 1);
        d.paralyzeDuration = asNumber(s.duration, d.paralyzeDuration || 1);
        d.paralyzeCooldownAfter = asNumber(s.cooldownAfter ?? s.cooldown, d.paralyzeCooldownAfter || 2);
      }

      if(s.type === 'damage_reduction' || s.type === 'damageReduction'){
        d.damageReduction = percentToRatio(s.value, d.damageReduction || 0);
      }
    }
  }

  function normalizeCharacterData(raw){
    const d = { ...raw };
    if(!d.key) d.key = d.idKey || d.slug || String(d.name || '').trim();

    const st = d.stats || {};
    const cr = d.critical || {};
    const ga = d.gacha || {};
    const co = d.combat || {};
    const as = d.assets || {};
    const ef = d.effect || {};
    const pr = d.projectile || {};

    d.hp = asNumber(st.hp ?? d.hp, 100);
    d.atk = asNumber(st.attack ?? st.atk ?? d.atk, 10);
    d.def = asNumber(st.defense ?? st.def ?? d.def, 0);
    d.attackSpeed = asNumber(st.attackSpeed ?? d.attackSpeed, 1);
    d.attackArea = asNumber(st.attackArea ?? st.attackRadius ?? d.attackArea, 45);
    d.attackRange = asNumber(st.attackRange ?? d.attackRange, 2);
    d.moveSpeed = asNumber(st.moveSpeed ?? d.moveSpeed, 2);
    d.bodyRadius = asNumber(st.bodyRadius ?? d.bodyRadius, 48);
    d.stopGap = asNumber(st.stopGap ?? d.stopGap, 16);
    d.gridMoveSpeed = asNumber(st.gridMoveSpeed ?? d.gridMoveSpeed, d.moveSpeed);
    d.gridAttackRange = asNumber(st.gridAttackRange ?? d.gridAttackRange, d.attackRange);

    d.critRate = percentToRatio(cr.chance ?? d.critRate, 0.15);
    d.critDamageMin = asNumber(cr.min ?? d.critDamageMin ?? d.criticalMin ?? d.criticalMultiplier, 1.5);
    d.critDamageMax = asNumber(cr.max ?? d.critDamageMax ?? d.criticalMax, d.critDamageMin);

    d.gachaRate = asNumber(ga.weight ?? ga.rate ?? d.gachaRate, 10);

    d.attackType = co.attackType ?? d.attackType ?? 'melee';
    d.aiType = co.aiType ?? d.aiType;
    d.attackMethod = co.attackMethod ?? d.attackMethod ?? '';
    d.feature = co.feature ?? d.feature ?? '';

    d.spritePath = as.spritePath ?? d.spritePath ?? ('assets/characters/' + d.key + '/');
    d.effectPath = ef.path ?? as.effectPath ?? d.effectPath ?? ('assets/effects/' + d.key + '/attack.png');
    d.soundPath = as.soundPath ?? d.soundPath ?? ('assets/sounds/' + d.key + '/');
    d.projectilePath = pr.path ?? as.projectilePath ?? d.projectilePath;

    d.effectFrames = asNumber(ef.frames ?? d.effectFrames, 5);
    d.effectStartFrame = asNumber(ef.startFrame ?? d.effectStartFrame, 0);
    d.effectFrameWidth = asNumber(ef.frameWidth ?? d.effectFrameWidth, 96);
    d.centerEffect = Boolean(ef.centerEffect ?? d.centerEffect ?? false);
    d.effectAnchor = ef.anchor ?? d.effectAnchor;
    d.effectScale = asNumber(ef.scale ?? d.effectScale, 1);
    d.effectFrameSequence = ef.frameSequence ?? d.effectFrameSequence;
    d.effectFrameOffsets = ef.frameOffsets ?? d.effectFrameOffsets;
    d.hitEffect = Boolean(ef.hitEffect ?? d.hitEffect ?? false);
    d.hitEffectStart = asNumber(ef.hitEffectStart ?? d.hitEffectStart, 0.38);

    if(d.projectilePath){
      d.projectileSpeed = asNumber(pr.speed ?? d.projectileSpeed, 520);
      d.projectileSpeedCells = asNumber(pr.speedCells ?? d.projectileSpeedCells, 8);
      d.projectileFrames = asNumber(pr.frames ?? d.projectileFrames, 1);
      d.projectileStartFrame = asNumber(pr.startFrame ?? d.projectileStartFrame, 0);
      d.projectileFrameWidth = asNumber(pr.frameWidth ?? d.projectileFrameWidth, 96);
    }

    normalizeSkillFields(d);

    d.frameSize = asNumber(d.frameSize, 96);
    d.animations = d.animations || { idle:2, walk:4, attack:3, hit:1, dead:2 };
    d.schemaVersion = d.schemaVersion || '1.2.0-data-driven';
    return d;
  }

  function validateCharacter(d, source){
    const missing = [];
    for(const k of ['key','name','grade']) if(!d[k]) missing.push(k);
    if(missing.length){
      console.warn('[CharacterManager] character skipped:', source, 'missing:', missing.join(','));
      return false;
    }
    return true;
  }

  async function loadCharacters(manifestPath='data/character_manifest.json'){
    const manifest = await loadJsonSafe(manifestPath);
    if(!Array.isArray(manifest)) return null;

    const characters = {};
    for(const entry of manifest){
      const path = typeof entry === 'string' ? entry : entry && entry.path;
      if(!path) continue;
      const raw = await loadJsonSafe(path);
      if(!raw) continue;
      const normalized = normalizeCharacterData(raw);
      if(validateCharacter(normalized, path)) characters[normalized.key] = normalized;
    }

    return Object.keys(characters).length ? characters : null;
  }

  async function loadGacha(characters, gachaPath='data/gacha.json'){
    let gacha = await loadJsonSafe(gachaPath);
    if(!gacha || !Array.isArray(gacha.pool)){
      gacha = { pool: Object.values(characters).map(d => ({ key:d.key, rate:d.gachaRate || 10 })) };
    }
    gacha.pool = gacha.pool
      .filter(it => characters[it.key])
      .map(it => ({ key:it.key, rate:asNumber(it.rate ?? it.weight, characters[it.key].gachaRate || 10) }));
    return gacha;
  }

  async function loadDatabase(options={}){
    const manifestPath = options.manifestPath || 'data/character_manifest.json';
    const gachaPath = options.gachaPath || 'data/gacha.json';
    const characters = await loadCharacters(manifestPath);
    if(!characters) return null;
    const gacha = await loadGacha(characters, gachaPath);
    return { characters, gacha };
  }

  window.CharacterManager = {
    version: '1.2.0',
    loadJsonSafe,
    normalizeCharacterData,
    loadCharacters,
    loadGacha,
    loadDatabase
  };
})();
