# HouHou Engine Skill Registry

`data/skill_registry.json`은 앞으로 `character.json`의 `skills` 배열에서 사용할 공용 스킬 목록입니다.

현재 단계에서는 **스킬 이름, 발동 조건, 파라미터 표준을 먼저 고정**하는 것이 목적입니다.  
실제 전투 적용 로직은 이후 `SkillManager.js` 또는 기존 전투 로직에 단계적으로 연결합니다.

## 기본 사용 예

```json
"skills": [
  {
    "type": "lifesteal",
    "trigger": "onHit",
    "value": 0.15
  },
  {
    "type": "paralyze",
    "trigger": "onHit",
    "chance": 1,
    "duration": 1,
    "cooldownAfter": 2
  }
]
```

## 등록된 스킬

| type | 설명 |
|---|---|
| lifesteal | 흡혈 |
| double_attack | 추가 공격 |
| paralyze | 마비 |
| burn | 지속 화상 피해 |
| poison | 지속 독 피해 |
| shield | 보호막 |
| damage_reflect | 데미지 반사 |
| critical_boost | 치명타 확률/배율 증가 |
| attack_boost | 공격력 증가 |
| defense_boost | 방어력 증가 |
| speed_boost | 이동/공격속도 증가 |
| heal_on_win | 승리 후 회복 |
| knockback | 넉백 |
| splash_damage | 범위 피해 |
| pierce | 관통 공격 |
| stun_immunity | 마비 면역 |
| revive | 1회 부활 |
| transformation | 변신 |

## 변신 설계

변신은 일반 버프가 아니라 `targetCharacterId`에 해당하는 캐릭터 데이터를 불러와 현재 캐릭터 정보를 교체하는 방식으로 설계합니다.

```json
{
  "type": "transformation",
  "trigger": "onHpBelow",
  "hpThreshold": 0.3,
  "targetCharacterId": "awakened_normal_man",
  "keepHpRatio": true,
  "once": true
}
```

권장 방식:

1. 변신 전 캐릭터와 변신 후 캐릭터를 각각 `assets/characters/*/character.json`으로 등록합니다.
2. 변신 후 캐릭터는 뽑기/선택창에 나오지 않게 `hidden: true` 옵션을 사용할 수 있게 확장합니다.
3. 발동 시 현재 HP 비율을 유지하면서 스탯, 이미지, 스킬, 공격 방식을 교체합니다.
