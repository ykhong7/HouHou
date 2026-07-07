# 신규 캐릭터 추가 방법 (v1.6.0)

## GitHub Pages / 로컬 HTTP 실행 기준

1. 기존 캐릭터 폴더 하나를 복사한다.
   - 예: `assets/characters/fire_spirit/` 복사
2. 폴더명을 새 캐릭터 key로 변경한다.
   - 예: `assets/characters/new_hero/`
3. 폴더 안의 `character.json`을 수정한다.
   - `key`, `name`, `stats`, `gacha.weight`, `combat`, `assets` 등
4. `data/character_manifest.json`에 아래 한 줄만 추가한다.
   - `assets/characters/new_hero/character.json`
5. 이미지 파일은 새 캐릭터 폴더 안에 유지한다.
   - `idle.png`, `walk.png`, `attack.png`, `hit.png`, `dead.png`, `portrait.png`, `icon.png` 등

## 중요

일반 웹브라우저/GitHub Pages는 보안상 폴더 내부 파일 목록을 자동 스캔할 수 없습니다.
그래서 완전 자동 폴더 스캔 대신 `character_manifest.json` 한 줄 등록 방식으로 구성했습니다.

## 수정하지 않아도 되는 파일

- `js/game.bundle.js`
- `js/gachaManager.js`
- `js/profileGrid.js`
- `js/assetManager.js`

뽑기 확률은 `character.json`의 `gacha.weight` 또는 `gachaRate`에서 자동 반영됩니다.
