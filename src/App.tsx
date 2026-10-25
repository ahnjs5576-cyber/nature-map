import { useEffect, useMemo, useState } from 'react'
import MapView from './components/MapView'
import Sidebar from './components/Sidebar'
import SpotPanel from './components/SpotPanel'
import Lightbox from './components/Lightbox'
import { CATEGORIES, Category, SPOTS, Spot } from './data/spots'
import { Photo } from './api/wikimedia'
import { loadWikidataSpots, mergeSpots } from './data/loadSpots'

export default function App() {
  const [spots, setSpots] = useState<Spot[]>(SPOTS)
  const [query, setQuery] = useState('')
  const [unescoOnly, setUnescoOnly] = useState(false)
  const [active, setActive] = useState<Set<Category>>(new Set())
  const [selected, setSelected] = useState<Spot | null>(null)
  const [explore, setExplore] = useState(false)
  const [exploreStatus, setExploreStatus] = useState('')
  const [photo, setPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    loadWikidataSpots().then((extra) => extra.length && setSpots(mergeSpots(SPOTS, extra)))
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return spots.filter((s) => {
      if (active.size && !active.has(s.category)) return false
      if (unescoOnly && !s.unesco) return false
      if (!q) return true
      return [s.name, s.nameEn, s.country, CATEGORIES[s.category].label].some((t) => t.toLowerCase().includes(q))
    })
  }, [spots, query, active, unescoOnly])

  const toggle = (c: Category) =>
    setActive((prev) => {
      const next = new Set(prev)
      next.has(c) ? next.delete(c) : next.add(c)
      return next
    })

  return (
    <div className="app">
      <Sidebar
        query={query}
        onQuery={setQuery}
        active={active}
        onToggle={toggle}
        unescoOnly={unescoOnly}
        onUnescoOnly={setUnescoOnly}
        spots={filtered}
        selected={selected}
        onSelect={setSelected}
        explore={explore}
        onExplore={setExplore}
        exploreStatus={exploreStatus}
      />
      <main className="main">
        <MapView
          spots={filtered}
          selected={selected}
          onSelect={setSelected}
          explore={explore}
          onExploreStatus={setExploreStatus}
          onPhotoClick={setPhoto}
        />
        {selected && <SpotPanel spot={selected} onClose={() => setSelected(null)} onPhotoClick={setPhoto} />}
      </main>
      {photo && <Lightbox photo={photo} onClose={() => setPhoto(null)} />}
    </div>
  )
}
