# AUTO_CHARACTER_SCAN

## 목적

GitHub Pages에서 `assets/characters/*/character.json`을 자동으로 찾아 캐릭터를 등록합니다.
이제 GitHub에 캐릭터 폴더를 추가한 뒤 `data/character_manifest.json`을 매번 수정하지 않아도 됩니다.

## 신규 캐릭터 추가 흐름

```txt
1. assets/characters/기존캐릭터 폴더 복사
2. 새 폴더명으로 변경
3. character.json 수정
4. 이미지 파일 교체
5. GitHub에 commit / push
```

## 동작 방식

1. GitHub Pages 주소에서 owner/repository를 자동 확인합니다.
2. GitHub Contents API로 `assets/characters` 폴더 목록을 읽습니다.
3. 각 하위 폴더의 `character.json`을 로드합니다.
4. 실패하면 기존 `data/character_manifest.json`을 fallback으로 사용합니다.
5. 그래도 실패하면 기존 bundle 내부 기본 데이터를 사용합니다.

## 주의사항

- GitHub 저장소가 public이어야 자동 스캔이 안정적으로 동작합니다.
- 로컬 파일로 직접 실행할 때는 브라우저 제한 때문에 자동 스캔이 안 될 수 있습니다.
- 이 경우 기존 `data/character_manifest.json` fallback이 사용됩니다.
- 자동 스캔 대상은 `assets/characters/캐릭터폴더/character.json` 형식입니다.
