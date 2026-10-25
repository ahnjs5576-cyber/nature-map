export type Category =
  | 'mountain'
  | 'volcano'
  | 'waterfall'
  | 'desert'
  | 'glacier'
  | 'coast'
  | 'canyon'
  | 'forest'
  | 'lake'
  | 'park'

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  mountain: { label: '산', emoji: '⛰️', color: '#7c5c3b' },
  volcano: { label: '화산', emoji: '🌋', color: '#c62828' },
  waterfall: { label: '폭포', emoji: '💧', color: '#1e88e5' },
  desert: { label: '사막', emoji: '🏜️', color: '#e0a03a' },
  glacier: { label: '빙하', emoji: '🧊', color: '#4fc3f7' },
  coast: { label: '해안', emoji: '🌊', color: '#00897b' },
  canyon: { label: '협곡', emoji: '🪨', color: '#d84315' },
  forest: { label: '숲', emoji: '🌲', color: '#2e7d32' },
  lake: { label: '호수', emoji: '🏞️', color: '#3949ab' },
  park: { label: '국립공원', emoji: '🏕️', color: '#8e24aa' },
}

export interface Spot {
  id: string
  name: string
  nameEn: string
  country: string
  category: Category
  lat: number
  lng: number
  description: string
  /** Commons file name of a representative photo (Wikidata P18) */
  image?: string
  unesco?: boolean
  source?: 'curated' | 'wikidata'
}

type Row = [id: string, name: string, nameEn: string, country: string, category: Category, lat: number, lng: number, description: string]

// Hand-picked spots with Korean descriptions
const ROWS: Row[] = [
  // 산
  ['everest', '에베레스트산', 'Mount Everest', '네팔/중국', 'mountain', 27.9881, 86.925, '해발 8,849m, 세계에서 가장 높은 산.'],
  ['k2', 'K2', 'K2', '파키스탄/중국', 'mountain', 35.8825, 76.5133, '세계 제2봉, 가장 오르기 어려운 산 중 하나.'],
  ['matterhorn', '마터호른', 'Matterhorn', '스위스/이탈리아', 'mountain', 45.9763, 7.6586, '피라미드 형태로 유명한 알프스의 상징.'],
  ['montblanc', '몽블랑', 'Mont Blanc', '프랑스/이탈리아', 'mountain', 45.8326, 6.8652, '서유럽 최고봉(4,806m).'],
  ['eiger', '아이거', 'Eiger', '스위스', 'mountain', 46.5775, 8.0053, '악명 높은 북벽으로 유명한 베른 알프스의 봉우리.'],
  ['trecime', '트레 치메 디 라바레도', 'Tre Cime di Lavaredo', '이탈리아', 'mountain', 46.6187, 12.3022, '돌로미티를 대표하는 세 개의 암봉.'],
  ['fuji', '후지산', 'Mount Fuji', '일본', 'mountain', 35.3606, 138.7274, '완벽한 원뿔형의 성층화산.'],
  ['kilimanjaro', '킬리만자로', 'Mount Kilimanjaro', '탄자니아', 'mountain', -3.0674, 37.3556, '아프리카 최고봉, 적도 근처의 만년설.'],
  ['denali', '디날리', 'Denali', '미국', 'mountain', 63.0695, -151.0074, '북미 최고봉(6,190m).'],
  ['aconcagua', '아콩카과', 'Aconcagua', '아르헨티나', 'mountain', -32.6532, -70.0109, '아시아 밖에서 가장 높은 산(6,961m).'],
  ['torres', '토레스 델 파이네', 'Torres del Paine', '칠레', 'mountain', -50.9423, -73.4068, '파타고니아의 화강암 첨탑.'],
  ['fitzroy', '피츠로이', 'Mount Fitz Roy', '아르헨티나/칠레', 'mountain', -49.2714, -73.0431, '일출에 붉게 타오르는 파타고니아의 암봉.'],
  ['vinicunca', '비니쿤카 무지개산', 'Vinicunca', '페루', 'mountain', -13.8695, -71.3027, '광물 줄무늬가 무지개처럼 보이는 산.'],
  ['table', '테이블 마운틴', 'Table Mountain', '남아프리카공화국', 'mountain', -33.9628, 18.4098, '케이프타운 뒤로 펼쳐진 평평한 산.'],
  ['huangshan', '황산', 'Huangshan', '중국', 'mountain', 30.1333, 118.1667, '기암괴석과 운해로 유명한 명산.'],
  ['hallasan', '한라산', 'Hallasan', '대한민국', 'mountain', 33.3617, 126.5292, '제주도 중앙의 순상화산, 백록담.'],
  ['seoraksan', '설악산', 'Seoraksan', '대한민국', 'mountain', 38.1194, 128.4656, '화강암 봉우리와 단풍으로 유명한 명산.'],
  ['jirisan', '지리산', 'Jirisan', '대한민국', 'mountain', 35.337, 127.7306, '한국 최초의 국립공원, 남한 내륙 최고봉.'],
  ['baekdu', '백두산 천지', 'Heaven Lake', '북한/중국', 'lake', 42.0067, 128.0558, '백두산 정상의 칼데라 호수.'],

  // 화산
  ['etna', '에트나산', 'Mount Etna', '이탈리아', 'volcano', 37.751, 14.9934, '유럽에서 가장 활발한 활화산.'],
  ['vesuvius', '베수비오산', 'Mount Vesuvius', '이탈리아', 'volcano', 40.8213, 14.4261, '폼페이를 묻은 화산.'],
  ['kilauea', '킬라우에아', 'Kīlauea', '미국(하와이)', 'volcano', 19.4069, -155.2834, '용암이 흐르는 하와이의 활화산.'],
  ['bromo', '브로모산', 'Mount Bromo', '인도네시아', 'volcano', -7.9425, 112.953, '모래 바다 위로 연기를 뿜는 화산.'],
  ['cotopaxi', '코토팍시', 'Cotopaxi', '에콰도르', 'volcano', -0.6838, -78.4378, '만년설을 인 안데스의 성층화산.'],
  ['villarrica', '비야리카', 'Villarrica', '칠레', 'volcano', -39.42, -71.93, '분화구 안 용암호를 볼 수 있는 화산.'],
  ['ertaale', '에르타 알레', 'Erta Ale', '에티오피아', 'volcano', 13.6, 40.67, '용암호가 끓는 다나킬 사막의 화산.'],
  ['seongsan', '성산일출봉', 'Seongsan Ilchulbong', '대한민국', 'volcano', 33.4581, 126.9425, '바다에서 솟은 응회구, 일출 명소.'],

  // 폭포
  ['iguazu', '이구아수 폭포', 'Iguazu Falls', '아르헨티나/브라질', 'waterfall', -25.6953, -54.4367, '275개 폭포가 이어진 세계 최대 폭포군.'],
  ['victoria', '빅토리아 폭포', 'Victoria Falls', '잠비아/짐바브웨', 'waterfall', -17.9243, 25.8572, '"천둥 치는 연기"라 불리는 거대한 폭포.'],
  ['niagara', '나이아가라 폭포', 'Niagara Falls', '미국/캐나다', 'waterfall', 43.0799, -79.0747, '북미의 대표적인 폭포.'],
  ['angel', '앙헬 폭포', 'Angel Falls', '베네수엘라', 'waterfall', 5.9701, -62.5362, '낙차 979m, 세계에서 가장 높은 폭포.'],
  ['kaieteur', '카이에투르 폭포', 'Kaieteur Falls', '가이아나', 'waterfall', 5.175, -59.48, '단일 낙차로 손꼽히는 거대한 폭포.'],
  ['yosemitefalls', '요세미티 폭포', 'Yosemite Falls', '미국', 'waterfall', 37.7568, -119.5965, '북미에서 가장 높은 폭포 중 하나.'],
  ['skogafoss', '스코가포스', 'Skógafoss', '아이슬란드', 'waterfall', 63.5321, -19.5114, '무지개가 자주 뜨는 아이슬란드 폭포.'],
  ['gullfoss', '굴포스', 'Gullfoss', '아이슬란드', 'waterfall', 64.3271, -20.1199, '협곡으로 두 번 꺾여 떨어지는 "황금 폭포".'],
  ['seljalandsfoss', '셀랴란즈포스', 'Seljalandsfoss', '아이슬란드', 'waterfall', 63.6156, -19.9886, '폭포 뒤로 걸어 들어갈 수 있는 폭포.'],
  ['detian', '더톈 폭포', 'Detian Falls', '중국/베트남', 'waterfall', 22.8549, 106.7232, '국경에 걸친 아시아 최대급 폭포.'],
  ['huangguoshu', '황궈수 폭포', 'Huangguoshu Waterfall', '중국', 'waterfall', 25.992, 105.669, '중국을 대표하는 대형 폭포.'],
  ['cheonjiyeon', '천지연 폭포', 'Cheonjiyeon Falls', '대한민국', 'waterfall', 33.2445, 126.5592, '서귀포 난대림 속 폭포.'],

  // 사막
  ['sahara', '사하라 (에르그 셰비)', 'Erg Chebbi', '모로코', 'desert', 31.1453, -4.0186, '사하라의 거대한 모래 언덕.'],
  ['whitedesert', '백사막', 'White Desert', '이집트', 'desert', 27.1, 27.97, '버섯 모양 흰 석회암이 흩어진 사막.'],
  ['wadirum', '와디 럼', 'Wadi Rum', '요르단', 'desert', 29.5764, 35.4196, '붉은 모래와 사암 절벽의 "달의 계곡".'],
  ['rubalkhali', '룹알할리', "Rub' al Khali", '사우디아라비아', 'desert', 20.0, 51.0, '세계 최대의 모래 사막.'],
  ['gobi', '고비 사막 (홍고린 엘스)', 'Khongoryn Els', '몽골', 'desert', 43.78, 102.3, '노래하는 모래언덕이 있는 고비 사막.'],
  ['uyuni', '우유니 소금사막', 'Salar de Uyuni', '볼리비아', 'desert', -20.1338, -67.4891, '세계 최대 소금평원, 우기엔 거울처럼.'],
  ['atacama', '달의 계곡 (아타카마)', 'Valle de la Luna', '칠레', 'desert', -22.9087, -68.2, '세계에서 가장 건조한 사막의 기묘한 지형.'],
  ['lencois', '렌소이스 마라냔지스', 'Lençóis Maranhenses', '브라질', 'desert', -2.4859, -43.1284, '흰 모래언덕 사이 빗물 호수들.'],
  ['namib', '소수스블레이', 'Sossusvlei', '나미비아', 'desert', -24.7275, 15.3428, '나미브 사막의 붉은 사구.'],
  ['deathvalley', '데스밸리', 'Death Valley', '미국', 'desert', 36.5054, -117.0794, '북미에서 가장 덥고 낮은 곳.'],
  ['whitesands', '화이트 샌즈', 'White Sands', '미국', 'desert', 32.7872, -106.3257, '석고 결정으로 된 새하얀 모래언덕.'],
  ['uluru', '울루루', 'Uluru', '호주', 'desert', -25.3444, 131.0369, '사막 한가운데 솟은 거대한 붉은 바위.'],

  // 빙하
  ['perito', '페리토 모레노 빙하', 'Perito Moreno Glacier', '아르헨티나', 'glacier', -50.4967, -73.1377, '지금도 전진하는 거대한 빙하.'],
  ['jokulsarlon', '요쿨살론', 'Jökulsárlón', '아이슬란드', 'glacier', 64.0784, -16.2306, '빙산이 떠다니는 빙하 호수.'],
  ['vatnajokull', '바트나요쿨', 'Vatnajökull', '아이슬란드', 'glacier', 64.4, -16.8, '유럽 최대 규모의 빙하.'],
  ['aletsch', '알레치 빙하', 'Aletsch Glacier', '스위스', 'glacier', 46.5, 8.03, '알프스에서 가장 긴 빙하.'],
  ['franzjosef', '프란츠 요제프 빙하', 'Franz Josef Glacier', '뉴질랜드', 'glacier', -43.4667, 170.1833, '온대 우림까지 내려오는 빙하.'],
  ['columbia', '컬럼비아 대빙원', 'Columbia Icefield', '캐나다', 'glacier', 52.17, -117.32, '로키산맥 최대의 빙원.'],
  ['glacierbay', '글레이셔 베이', 'Glacier Bay', '미국', 'glacier', 58.6658, -136.9002, '알래스카의 조수 빙하.'],
  ['mendenhall', '멘덴홀 빙하', 'Mendenhall Glacier', '미국', 'glacier', 58.4954, -134.5455, '주노 근교의 푸른 빙하.'],
  ['lemaire', '르메르 해협', 'Lemaire Channel', '남극', 'glacier', -65.08, -63.95, '빙벽 사이로 지나는 남극의 해협.'],

  // 해안
  ['twelve', '12사도 바위', 'Twelve Apostles', '호주', 'coast', -38.6662, 143.1044, '그레이트 오션 로드의 석회암 기둥.'],
  ['whitehaven', '화이트헤븐 비치', 'Whitehaven Beach', '호주', 'coast', -20.2823, 149.0385, '순백의 실리카 모래 해변.'],
  ['reef', '그레이트 배리어 리프', 'Great Barrier Reef', '호주', 'coast', -18.2871, 147.6992, '세계 최대 산호초 지대.'],
  ['halong', '하롱베이', 'Ha Long Bay', '베트남', 'coast', 20.9101, 107.1839, '에메랄드 바다 위 수천 개의 섬.'],
  ['mayabay', '마야 베이', 'Maya Bay', '태국', 'coast', 7.6783, 98.7656, '석회암 절벽에 둘러싸인 만.'],
  ['rajaampat', '라자 암팟', 'Raja Ampat', '인도네시아', 'coast', -0.2346, 130.5079, '해양 생물 다양성이 가장 높은 바다.'],
  ['borabora', '보라보라', 'Bora Bora', '프랑스령 폴리네시아', 'coast', -16.5004, -151.7415, '석호에 둘러싸인 화산섬.'],
  ['moher', '모허 절벽', 'Cliffs of Moher', '아일랜드', 'coast', 52.9715, -9.4309, '대서양을 향한 214m 절벽.'],
  ['causeway', '자이언츠 코즈웨이', "Giant's Causeway", '영국(북아일랜드)', 'coast', 55.2408, -6.5116, '4만 개의 육각형 현무암 기둥.'],
  ['durdle', '더들 도어', 'Durdle Door', '영국', 'coast', 50.6212, -2.2766, '바다로 뻗은 천연 석회암 아치.'],
  ['geiranger', '게이랑에르피오르', 'Geirangerfjord', '노르웨이', 'coast', 62.1049, 7.0947, '폭포가 쏟아지는 깊은 피오르.'],
  ['milford', '밀퍼드 사운드', 'Milford Sound', '뉴질랜드', 'coast', -44.6414, 167.8974, '절벽과 폭포로 둘러싸인 피오르.'],
  ['navagio', '나바지오 해변', 'Navagio', '그리스', 'coast', 37.8597, 20.6249, '난파선이 있는 절벽 속 해변.'],
  ['benagil', '베나길 동굴', 'Benagil Cave', '포르투갈', 'coast', 37.0873, -8.4268, '천장이 뚫린 알가르브의 해식 동굴.'],
  ['napali', '나 팔리 코스트', 'Nā Pali Coast', '미국(하와이)', 'coast', 22.17, -159.65, '깎아지른 초록 절벽 해안.'],
  ['bigsur', '빅서', 'Big Sur', '미국', 'coast', 36.3714, -121.9016, '태평양을 따라 이어진 절벽 해안 도로.'],
  ['jusangjeolli', '대포 주상절리', 'Jungmun Daepo Jusangjeolli', '대한민국', 'coast', 33.2378, 126.4253, '육각형 현무암 기둥이 늘어선 해안.'],

  // 협곡
  ['grandcanyon', '그랜드 캐니언', 'Grand Canyon', '미국', 'canyon', 36.1069, -112.1129, '콜로라도강이 깎아낸 대협곡.'],
  ['antelope', '앤텔로프 캐니언', 'Antelope Canyon', '미국', 'canyon', 36.8619, -111.3743, '빛이 쏟아지는 슬롯 캐니언.'],
  ['horseshoe', '홀스슈 벤드', 'Horseshoe Bend', '미국', 'canyon', 36.8791, -111.5104, '말굽 모양으로 휘어진 콜로라도강.'],
  ['bryce', '브라이스 캐니언', 'Bryce Canyon', '미국', 'canyon', 37.593, -112.1871, '후두라 불리는 붉은 첨탑의 원형극장.'],
  ['fishriver', '피시 리버 캐니언', 'Fish River Canyon', '나미비아', 'canyon', -27.6, 17.6, '아프리카 최대의 협곡.'],
  ['colca', '콜카 캐니언', 'Colca Canyon', '페루', 'canyon', -15.6, -71.9, '안데스 콘도르가 나는 깊은 협곡.'],
  ['verdon', '베르동 협곡', 'Verdon Gorge', '프랑스', 'canyon', 43.7488, 6.3285, '청록빛 강이 흐르는 유럽의 그랜드 캐니언.'],
  ['tigerleaping', '호도협', 'Tiger Leaping Gorge', '중국', 'canyon', 27.1886, 100.1062, '진사강이 흐르는 세계에서 가장 깊은 협곡 중 하나.'],
  ['zhangjiajie', '장자제', 'Zhangjiajie', '중국', 'canyon', 29.3249, 110.4343, '안개 속 사암 봉우리 숲.'],
  ['danxia', '장예 단샤 지형', 'Zhangye Danxia', '중국', 'canyon', 38.93, 100.13, '무지개빛 지층이 드러난 구릉.'],
  ['cappadocia', '카파도키아', 'Cappadocia', '튀르키예', 'canyon', 38.6431, 34.8289, '요정의 굴뚝이라 불리는 기암 지대.'],
  ['tsingy', '칭기 드 베마라하', 'Tsingy de Bemaraha', '마다가스카르', 'canyon', -18.7, 44.7, '칼날처럼 솟은 석회암 숲.'],

  // 숲
  ['amazon', '아마존 열대우림', 'Amazon rainforest', '브라질', 'forest', -3.4653, -62.2159, '지구의 허파, 세계 최대 열대우림.'],
  ['daintree', '데인트리 열대우림', 'Daintree Rainforest', '호주', 'forest', -16.17, 145.42, '세계에서 가장 오래된 열대우림 중 하나.'],
  ['monteverde', '몬테베르데 운무림', 'Monteverde Cloud Forest', '코스타리카', 'forest', 10.3, -84.8, '구름 속에 잠긴 숲.'],
  ['redwood', '레드우드 국립공원', 'Redwood National Park', '미국', 'forest', 41.2132, -124.0046, '세계에서 가장 키 큰 나무들.'],
  ['hoh', '호 레인포레스트', 'Hoh Rainforest', '미국', 'forest', 47.8606, -123.9349, '이끼로 뒤덮인 온대 우림.'],
  ['blackforest', '슈바르츠발트', 'Black Forest', '독일', 'forest', 48.3, 8.15, '동화의 배경이 된 짙은 침엽수림.'],
  ['bialowieza', '비아워비에자 숲', 'Białowieża Forest', '폴란드/벨라루스', 'forest', 52.7, 23.85, '유럽 최후의 원시림, 유럽들소의 서식지.'],
  ['baobab', '바오밥 거리', 'Avenue of the Baobabs', '마다가스카르', 'forest', -20.2508, 44.4183, '거대한 바오밥나무가 늘어선 길.'],
  ['arashiyama', '아라시야마 대나무숲', 'Arashiyama Bamboo Grove', '일본', 'forest', 35.017, 135.6713, '하늘로 뻗은 대나무 길.'],
  ['yakushima', '야쿠시마', 'Yakushima', '일본', 'forest', 30.3581, 130.5286, '수천 년 된 삼나무가 자라는 섬.'],

  // 호수
  ['baikal', '바이칼 호', 'Lake Baikal', '러시아', 'lake', 53.5587, 108.165, '세계에서 가장 깊고 오래된 호수.'],
  ['titicaca', '티티카카 호', 'Lake Titicaca', '페루/볼리비아', 'lake', -15.9254, -69.3354, '배가 다니는 호수 중 가장 높은 곳.'],
  ['moraine', '모레인 호수', 'Moraine Lake', '캐나다', 'lake', 51.3217, -116.186, '로키산맥의 청록빛 빙하호.'],
  ['louise', '루이스 호수', 'Lake Louise', '캐나다', 'lake', 51.4167, -116.2167, '빅토리아 빙하를 품은 에메랄드빛 호수.'],
  ['peyto', '페이토 호수', 'Peyto Lake', '캐나다', 'lake', 51.7177, -116.5136, '늑대 머리 모양의 빙하호.'],
  ['craterlake', '크레이터 호수', 'Crater Lake', '미국', 'lake', 42.9446, -122.109, '화산 칼데라에 고인 미국에서 가장 깊은 호수.'],
  ['plitvice', '플리트비체 호수', 'Plitvice Lakes', '크로아티아', 'lake', 44.8654, 15.582, '계단식 호수와 폭포의 연속.'],
  ['bled', '블레드 호수', 'Lake Bled', '슬로베니아', 'lake', 46.3636, 14.0938, '호수 한가운데 섬과 교회.'],
  ['tekapo', '테카포 호수', 'Lake Tekapo', '뉴질랜드', 'lake', -44.0047, 170.4774, '밀키 블루 호수와 별이 빛나는 하늘.'],
  ['hillier', '힐리어 호수', 'Lake Hillier', '호주', 'lake', -34.0945, 123.2026, '분홍색으로 빛나는 염호.'],
  ['deadsea', '사해', 'Dead Sea', '이스라엘/요르단', 'lake', 31.5, 35.5, '지표면에서 가장 낮은 짠 호수.'],
  ['natron', '나트론 호', 'Lake Natron', '탄자니아', 'lake', -2.4167, 36.0, '붉은 알칼리 호수와 홍학 떼.'],

  // 국립공원
  ['yellowstone', '옐로스톤', 'Yellowstone National Park', '미국', 'park', 44.428, -110.5885, '세계 최초의 국립공원, 간헐천과 온천.'],
  ['yosemite', '요세미티', 'Yosemite National Park', '미국', 'park', 37.8651, -119.5383, '하프돔과 엘캐피탄의 화강암 계곡.'],
  ['zion', '자이언', 'Zion National Park', '미국', 'park', 37.2982, -113.0263, '붉은 사암 절벽 사이의 협곡.'],
  ['banff', '밴프', 'Banff National Park', '캐나다', 'park', 51.4968, -115.9281, '캐나다 최초의 국립공원.'],
  ['galapagos', '갈라파고스 제도', 'Galápagos Islands', '에콰도르', 'park', -0.9538, -90.9656, '진화론의 영감을 준 고유종의 섬.'],
  ['serengeti', '세렝게티', 'Serengeti National Park', '탄자니아', 'park', -2.3333, 34.8333, '누 떼의 대이동이 펼쳐지는 초원.'],
  ['masaimara', '마사이마라', 'Maasai Mara', '케냐', 'park', -1.4833, 35.1167, '빅5를 볼 수 있는 사바나.'],
  ['kruger', '크루거', 'Kruger National Park', '남아프리카공화국', 'park', -23.9884, 31.5547, '아프리카 최대급 야생동물 보호구역.'],
  ['okavango', '오카방고 삼각주', 'Okavango Delta', '보츠와나', 'park', -19.2833, 22.9, '사막 한가운데 펼쳐진 내륙 삼각주.'],
  ['komodo', '코모도', 'Komodo National Park', '인도네시아', 'park', -8.55, 119.45, '코모도왕도마뱀의 섬.'],
  ['jiuzhaigou', '주자이거우', 'Jiuzhaigou', '중국', 'park', 33.26, 103.92, '오색 빛깔 호수가 이어진 계곡.'],
  ['fiordland', '피오르드랜드', 'Fiordland National Park', '뉴질랜드', 'park', -45.4167, 167.7167, '빙하가 깎은 피오르와 원시림.'],
  ['lakedistrict', '레이크 디스트릭트', 'Lake District', '영국', 'park', 54.4609, -3.0886, '호수와 구릉이 어우러진 시인의 땅.'],
]

export const SPOTS: Spot[] = ROWS.map(([id, name, nameEn, country, category, lat, lng, description]) => ({
  id, name, nameEn, country, category, lat, lng, description, source: 'curated',
}))
