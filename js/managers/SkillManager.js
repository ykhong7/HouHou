// v1.1.0 SkillManager
// 신규 스킬은 이 파일의 applyOnHit / applyExtraHits 패턴에 case를 추가하고,
// character.json의 skills 배열에 type과 옵션을 선언하는 방식으로 확장한다.
class SkillManager {
  static applyOnHit(attacker, target, finalDamage, effects) {
    if (attacker.paralyzeChance && (target.paralyzeCooldown || 0) <= 0 && Math.random() < attacker.paralyzeChance) {
      const duration = attacker.paralyzeDuration || 1;
      target.stunTimer = Math.max(target.stunTimer || 0, duration);
      target.paralyzeCooldown = duration + (attacker.paralyzeCooldownAfter || 2);
    }

    if (attacker.lifeSteal) {
      const heal = Math.max(1, Math.round(finalDamage * attacker.lifeSteal));
      attacker.hp = Math.min(attacker.maxHp, attacker.hp + heal);
      if (effects) effects.spawnHeal(attacker.x, attacker.y, heal);
    }
  }

  static applyExtraHits(attacker, target, effects, audio) {
    if (!(attacker.extraHitChance && Math.random() < attacker.extraHitChance && !target.isDead && target.hp > 0)) return;
    const result = window.DamageCalculator.roll(attacker, target, attacker.extraHitAtk || attacker.atk);
    const final = target.damage(result.damage ?? result.dmg, result.critical ?? result.crit);
    this.applyOnHit(attacker, target, final, effects);
    if (audio) audio.hit(target, result.critical ?? result.crit);
    if (effects) effects.spawn(target, attacker, final, result.critical ?? result.crit);
  }
}

window.SkillManager = window.SkillManager || SkillManager;
