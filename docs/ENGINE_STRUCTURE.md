# HouHou Engine v1.0.0 구조

## 목표
`game.bundle.js`에 게임 기능을 몰아넣지 않고, 역할별 엔진 파일과 캐릭터 JSON 데이터로 동작하는 구조입니다.

## 현재 엔진 파일
- `js/houhouEngine.js` : 전역 설정과 게임 부트스트랩
- `js/gameApp.js` : 게임 앱 초기화, 버튼, 메인 루프
- `js/assetManager.js` : 배경/캐릭터 리소스 로딩
- `js/dataLoader.js` : 캐릭터 JSON 로딩
- `js/characterData.js` : file:// fallback 캐릭터 데이터
- `js/gachaManager.js` : 가챠 데이터 처리
- `js/gachaDraft.js` : 뽑기 카드 UI
- `js/profileGrid.js` : 캐릭터 정보 UI
- `js/uiCore.js` : 공통 UI 함수
- `js/battleActors.js` : 전투 캐릭터 객체
- `js/battleSystem.js` : 전투 진행
- `js/combatEffects.js` : 전투 이펙트
- `js/audioManager.js` : 사운드

## 캐릭터 추가 기본 흐름
1. `assets/characters/새캐릭터폴더/character.json` 추가
2. 같은 폴더에 `idle.png`, `attack.png`, `dead.png` 등 이미지 추가
3. `data/character_manifest.json`에 캐릭터 폴더 경로 한 줄 추가

정적 웹 호스팅(GitHub Pages)에서는 브라우저가 폴더 목록을 직접 스캔할 수 없기 때문에 현재는 manifest 1줄 추가 방식이 가장 안정적입니다.
