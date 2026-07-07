// v1.3.0 DamageCalculator
// 데미지 / 방어력 / 크리티컬 계산 전담 매니저

class DamageCalculator {
    static critMultiplier(unit) {
        const min = Number.isFinite(Number(unit.critDamageMin))
            ? Number(unit.critDamageMin)
            : Number.isFinite(Number(unit.criticalMin))
            ? Number(unit.criticalMin)
            : Number.isFinite(Number(unit.criticalMultiplier))
            ? Number(unit.criticalMultiplier)
            : 1.5;

        const max = Number.isFinite(Number(unit.critDamageMax))
            ? Number(unit.critDamageMax)
            : Number.isFinite(Number(unit.criticalMax))
            ? Number(unit.criticalMax)
            : min;

        const lo = Math.min(min, max);
        const hi = Math.max(min, max);

        if (hi <= lo) return lo;
        return lo + Math.random() * (hi - lo);
    }

    static roll(attacker, target, baseAttack = null) {
        const atk = Number(baseAttack ?? attacker.atk ?? 1);
        const def = Number(target.def || 0);

        let dmg = Math.max(1, Math.round(atk * (100 / (100 + def))));
        const crit = Math.random() < (attacker.critRate || 0);

        if (crit) {
            dmg = Math.round(dmg * this.critMultiplier(attacker));
        }

        return {
            dmg,
            crit,
            damage: dmg,
            critical: crit,
        };
    }
}

window.DamageCalculator = DamageCalculator;