// v1.1.0 DamageCalculator
// 데미지/방어력/크리티컬 계산을 한곳에서 관리하기 위한 분리 파일.
// 현재 배포본은 호환성을 위해 game.bundle.js 안에도 동일 로직이 포함되어 있음.
class DamageCalculator {
  static critMultiplier(unit) {
    const min = Number.isFinite(Number(unit.critDamageMin)) ? Number(unit.critDamageMin) : 1.5;
    const max = Number.isFinite(Number(unit.critDamageMax)) ? Number(unit.critDamageMax) : min;
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    return hi <= lo ? lo : lo + Math.random() * (hi - lo);
  }

  static roll(attacker, target, baseAttack = null) {
    const atk = Number(baseAttack ?? attacker.atk ?? 1);
    let damage = Math.max(1, Math.round(atk * (100 / (100 + (target.def || 0)))));
    const critical = Math.random() < (attacker.critRate || 0);
    if (critical) damage = Math.round(damage * this.critMultiplier(attacker));
    return { damage, critical };
  }
}

window.DamageCalculator = window.DamageCalculator || DamageCalculator;
