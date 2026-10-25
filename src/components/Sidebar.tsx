import { CATEGORIES, Category, Spot } from '../data/spots'

interface Props {
  query: string
  onQuery: (q: string) => void
  active: Set<Category>
  onToggle: (c: Category) => void
  spots: Spot[]
  selected: Spot | null
  onSelect: (s: Spot) => void
  unescoOnly: boolean
  onUnescoOnly: (v: boolean) => void
  explore: boolean
  onExplore: (v: boolean) => void
  exploreStatus: string
}

export default function Sidebar(p: Props) {
  return (
    <aside className="sidebar">
      <h1>🌍 Nature Map</h1>
      <input className="search" placeholder="명소·국가 검색 (예: 폭포, Iceland)" value={p.query} onChange={(e) => p.onQuery(e.target.value)} />

      <div className="chips">
        {(Object.keys(CATEGORIES) as Category[]).map((c) => (
          <button
            key={c}
            className={`chip${p.active.has(c) ? ' on' : ''}`}
            style={{ '--c': CATEGORIES[c].color } as React.CSSProperties}
            onClick={() => p.onToggle(c)}
          >
            {CATEGORIES[c].emoji} {CATEGORIES[c].label}
          </button>
        ))}
      </div>

      <label className="explore">
        <input type="checkbox" checked={p.unescoOnly} onChange={(e) => p.onUnescoOnly(e.target.checked)} />
        UNESCO 세계유산만 보기
      </label>
      <label className="explore">
        <input type="checkbox" checked={p.explore} onChange={(e) => p.onExplore(e.target.checked)} />
        주변 사진 탐색 모드
      </label>
      {p.explore && <p className="status">{p.exploreStatus}</p>}

      <p className="count">명소 {p.spots.length.toLocaleString()}곳</p>
      <ul className="list">
        {p.spots.map((s) => (
          <li key={s.id} className={s.id === p.selected?.id ? 'sel' : ''} onClick={() => p.onSelect(s)}>
            <span>{CATEGORIES[s.category].emoji}</span>
            <div>
              <strong>
                {s.name}
                {s.unesco && <span className="badge">UNESCO</span>}
              </strong>
              <small>{s.country}</small>
            </div>
          </li>
        ))}
        {p.spots.length === 0 && <li className="empty">검색 결과가 없어요</li>}
      </ul>
    </aside>
  )
}
