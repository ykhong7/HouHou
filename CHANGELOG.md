# v1.7.1 refactor fix

- Fixed resource loading hang caused by missing combatEffects.js script tag in index.html.
- Updated script cache-busting query strings to v1.7.1.
- game.bundle.js line count unchanged from v1.7.0.

# v1.7.0 Refactor

- `Effects` 클래스와 치명타 배율 계산 함수를 `js/combatEffects.js`로 분리했습니다.
- `game.bundle.js`는 전투 흐름 중심으로 축소했습니다.
- 캐릭터 추가 방식은 v1.6의 `assets/characters/<key>/character.json` 구조를 유지합니다.


## v1.6.0 Refactor

- `Assets` 클래스를 `js/assetManager.js`로 분리하여 `game.bundle.js` 실제 라인 수 감소.
- HTTP/GitHub Pages 실행 시 `data/character_manifest.json`을 통해 `assets/characters/<key>/character.json`을 직접 로드하도록 변경.
- 중복 캐릭터 데이터 폴더 `data/characters/` 제거.
- 사용하지 않는 `data/gacha.json` 제거.
- `tools/` 폴더 제거.
- 신규 캐릭터 추가 시 `game.bundle.js` 수정 없이 캐릭터 폴더 복사 + manifest 한 줄 추가 구조로 정리.


## v1.5.0 - Character JSON 중심 등록 구조
- `Gacha` 클래스를 `js/gachaManager.js`로 분리했습니다.
- 뽑기 풀을 `data/gacha.json`이 아니라 각 캐릭터 JSON의 `gachaRate`에서 자동 생성하도록 변경했습니다.
- 신규 캐릭터 추가 시 `game.bundle.js`와 `gacha.json` 수정이 필요 없도록 범위를 줄였습니다.
- `tools/update_character_registry.py/.bat`를 추가해 `data/characters/*.json` 기준으로 manifest를 재생성할 수 있게 했습니다.
- `docs/ADD_CHARACTER.md`에 신규 캐릭터 추가 절차를 정리했습니다.

# HouHou Fighter v1.4.0 Refactor

- 기준: HouHouFighter_v1.3.0_refactor.zip
- 목표: game.bundle.js 실제 축소 유지
- 변경: AudioManager 클래스를 js/audioManager.js로 분리
- game.bundle.js: 406줄 → 386줄, 20줄 감소
- 실행 확인: JS 문법 검사 및 JSON 파싱 확인

# HouHou Fighter v1.2.0

## Refactor 기준
- 기준 프로젝트: HouHouFighter_v1.1.1_refactor_fix.zip
- 목표: game.bundle.js 실제 코드 감소 유지

## 변경 내용
- ProfileGrid UI 클래스를 js/profileGrid.js로 분리
- index.html 스크립트 로딩 순서에 profileGrid.js 추가
- 화면 하단 버전 문구를 v1.2.0으로 갱신

## game.bundle.js 줄 수
- v1.1.1: 564 lines
- v1.2.0: 466 lines
- 감소: 98 lines

## 테스트
- node --check js/game.bundle.js 통과
- node --check js/profileGrid.js 통과
- node --check js/dataLoader.js 통과
- data/characters/*.json 13개 파싱 통과


## v1.3.0_refactor
- `game.bundle.js`에서 UI 공통 함수와 Button 클래스를 `js/uiCore.js`로 분리했습니다.
- 분리 대상: `inRect`, `roundRect`, `panel`, `modernPanel`, `gradeColor`, `Button`.
- `index.html`에 `uiCore.js`를 `profileGrid.js`, `game.bundle.js`보다 먼저 로드하도록 추가했습니다.
- 하단 버전 표시를 v1.3.0으로 갱신했습니다.

## v1.8.0
- `GachaDraft` 클래스를 `js/gachaDraft.js`로 분리했습니다.
- `index.html`에 `gachaDraft.js` script 연결을 추가했습니다.
- `game.bundle.js` 버전 표시를 v1.8.0으로 변경했습니다.
- `game.bundle.js` 307줄에서 279줄로 28줄 감소했습니다.


## v1.9.0 Refactor
- Added: `js/battleActors.js`
- Changed: `index.html`, `js/game.bundle.js`, `README.md`, `CHANGELOG.md`
- Removed from game.bundle.js: Projectile/Fighter classes.


## v2.0.0
- Battle 전투 흐름 클래스를 js/battleSystem.js로 분리.
- game.bundle.js는 Game 초기화/루프 중심으로 축소.
- 신규 캐릭터 추가 시 game.bundle.js 수정 없음 원칙 유지.


## v2.1.0
- Game 클래스 본문을 js/gameApp.js로 분리했습니다.
- js/game.bundle.js는 전역 상수와 실행 진입점만 남겼습니다.
- 신규 캐릭터 추가 흐름에는 영향이 없도록 데이터 로딩 순서는 유지했습니다.

## HouHou Engine v1.0.0
- `game.bundle.js`의 마지막 부트스트랩 코드 7줄을 `js/houhouEngine.js`로 이동
- `game.bundle.js`를 빈 호환 파일로 전환
- `index.html`에서 `game.bundle.js` 의존 제거
- 엔진 구조 문서 `docs/ENGINE_STRUCTURE.md` 추가
- 게임 화면 버전 문구를 `HouHou Engine v1.0.0`으로 변경
