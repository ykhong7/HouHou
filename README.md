# HouHou Engine v1.0.0

HouHou Fighter를 데이터 중심 구조로 정리한 엔진화 버전입니다.

## 핵심 변경
- `game.bundle.js`를 빈 호환 파일로 전환했습니다.
- 실제 부트스트랩은 `js/houhouEngine.js`에서 담당합니다.
- 게임 기능은 역할별 JS 파일로 분리되어 있습니다.
- 캐릭터 데이터는 `assets/characters/*/character.json` 기준으로 관리합니다.

## 신규 캐릭터 추가
현재 GitHub Pages 같은 정적 웹 환경을 기준으로 안정성을 우선했습니다.

1. 기존 캐릭터 폴더를 복사합니다.
2. `character.json`과 이미지를 수정합니다.
3. `data/character_manifest.json`에 새 캐릭터 폴더 경로를 1줄 추가합니다.

자세한 구조는 `docs/ENGINE_STRUCTURE.md`를 참고하세요.

## 스킬 등록 파일
- 공용 스킬 목록은 `data/skill_registry.json`에 정리했습니다.
- 사용 예시는 `docs/SKILL_REGISTRY.md`를 참고하세요.
- 현재 단계는 스킬 정의/표준화용이며, 실제 전투 적용은 이후 SkillManager 단계에서 확장합니다.



## v1.0.2 Auto Character Scan

GitHub Pages에서 `assets/characters/*/character.json`을 자동으로 스캔합니다.
신규 캐릭터를 추가할 때는 캐릭터 폴더를 `assets/characters/` 아래에 넣고 GitHub에 push하면 됩니다.
로컬 실행 또는 GitHub API 실패 시에는 기존 `data/character_manifest.json`을 fallback으로 사용합니다.

자세한 내용은 `docs/AUTO_CHARACTER_SCAN.md`를 참고하세요.

### Projectile / Effect JSON 제어 예시

`projectile`은 날아가는 이미지입니다.

```json
"projectile": {
  "path": "assets/projectiles/example.png",
  "trajectory": "ground",
  "spawnX": 46,
  "spawnY": -58,
  "targetX": -18,
  "targetY": 35,
  "arcHeight": 80,
  "scale": 1,
  "width": 105,
  "height": 52
}
```

`effect`는 타격 시 표시되는 이미지입니다.

```json
"effect": {
  "path": "assets/effects/example.png",
  "offsetX": 0,
  "offsetY": 12,
  "scale": 1,
  "width": 190,
  "height": 62
}
```

### v1.0.5 projectile trajectory 구조
`js/battleActors.js`의 `PROJECTILE_TRAJECTORY`에서 탄도별 계산을 분리합니다.
- `straight`: 발사 높이 그대로 직선 이동
- `ground`: 목표의 `targetX / targetY` 위치로 이동
- `arc`: ground 목표로 이동하면서 포물선 보정
- `homing`: 매 프레임 목표 위치를 갱신


## v1.0.7 effect role reorganization
- JSON 구조를 projectile / attackEffect / hitEffect로 분리했습니다.
- projectile: 원거리 캐릭터가 날아가게 하는 투사체입니다.
- attackEffect: 근접 캐릭터의 공격 순간/공격 모션 이미지입니다.
- hitEffect: 원거리 투사체 또는 공격이 맞았을 때 상대 위치에 표시되는 타격 이미지입니다.
- 기존 effect 필드는 하위호환용으로만 유지되며, 신규 캐릭터는 attackEffect 또는 hitEffect를 사용하세요.
- 폴더 구조를 assets/projectiles, assets/attackEffects, assets/hitEffects 기준으로 정리했습니다.


## v1.0.7 변신 기능
`character.json`의 `transform` 설정으로 체력 조건/확률 기반 변신을 제어합니다. 예: 걍사람은 HP 50% 미만 시 50% 확률로 각성한 걍사람으로 변신하고 "각성" 텍스트를 표시합니다.


## v1.0.8 effect role clean
- 기존 `effect` / `effectPath` / `effectFrames` 계열 제거
- `projectile`, `attackEffect`, `hitEffect`만 사용하도록 JSON/로더 정리
- 미사용 `assets/effects/` 폴더 및 `*.meta.json` 제거
- `assetManager.js`, `dataLoader.js`, `characterData.js`, `CharacterManager.js`의 legacy effect 참조 제거
- 변신 시스템(v1.0.7)은 유지
