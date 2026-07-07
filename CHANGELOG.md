# Changelog

## v1.2.0
- CharacterManager를 실제 런타임 로더로 구현
- `index.html`에서 `js/managers/CharacterManager.js`를 먼저 로드하도록 변경
- `game.bundle.js`의 `loadCharacterDatabase()`가 `window.CharacterManager.loadDatabase()`를 우선 사용하도록 변경
- CharacterManager 실패 시 기존 내장 JSON 로더로 fallback 처리
- 버전 표기 `v1.2.0 | CharacterManager 실제 분리`로 변경
- `Art by 홍은성` 크레딧 유지

## v1.1.0
- Manager 파일 뼈대 추가
- Data-Driven 구조 유지
