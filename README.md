# HouHou Fighter v1.2.0

Data-Driven 리팩토링 2단계 버전입니다.

## 핵심 변경
- `js/managers/CharacterManager.js` 실제 런타임 로더로 분리
- `game.bundle.js`는 CharacterManager를 우선 호출하고 실패 시 내장 fallback 로더 사용
- `character_manifest.json` + 각 캐릭터 `character.json` 기반 자동 로드 유지
- 기존 전투/뽑기/이펙트/슬라임/각성한 걍사람 기능 유지
- 우측 하단 크레딧 `Art by 홍은성` 유지

## 신규 캐릭터 추가
1. `assets/characters/<key>/character.json` 작성
2. PNG 리소스 추가
3. `data/character_manifest.json`에 character.json 경로 추가
4. 필요 시 `data/gacha.json`에 뽑기 weight 추가
