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
