# Nature Map 🌍

지도에서 세계 자연 명소를 찾아보고 Wikimedia Commons 사진을 보는 웹앱.

- 지도: Leaflet + OpenStreetMap / Esri 위성
- 사진: Wikimedia Commons geosearch API (키 필요 없음)
- 기능: 명소 마커와 사진 패널, 카테고리 필터, 검색, 주변 사진 탐색 (줌 13 이상)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

배포: `main` 브랜치에 push하면 GitHub Actions가 https://ahnjs5576-cyber.github.io/nature-map/ 에 자동 배포합니다.

## 명소 데이터

- `src/data/spots.ts`: 직접 고른 명소 (한글 설명 포함)
- `public/data/spots-wikidata.json`: Wikidata에서 자동 수집한 명소 (UNESCO 자연유산, 국립공원, 산·화산·폭포·호수·빙하·사막·협곡·숲·해안)

Wikidata 데이터 생성/갱신:

```bash
npm run fetch:data   # Node 18+, 1~3분 소요
```

카테고리별 수집 개수와 최소 유명도(위키백과 언어판 수)는 `scripts/fetch-wikidata.mjs`의 `QUERIES`에서 조정합니다.
두 데이터는 앱에서 합쳐지며, 영문 이름이 같으면 직접 고른 쪽에 대표 사진·UNESCO 정보가 더해지고, 2km 이내 중복은 제거됩니다.
