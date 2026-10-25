import { useEffect, useRef, useState } from 'react'
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { CATEGORIES, Spot } from '../data/spots'
import { Photo, photosInBounds } from '../api/wikimedia'

const EXPLORE_MIN_ZOOM = 13

const iconCache = new Map<string, L.DivIcon>()
const spotIcon = (spot: Spot, active: boolean) => {
  const key = `${spot.category}-${active}-${!!spot.unesco}`
  let icon = iconCache.get(key)
  if (!icon) {
    const { color, emoji } = CATEGORIES[spot.category]
    icon = L.divIcon({
      className: '',
      html: `<div class="spot-marker${active ? ' active' : ''}${spot.unesco ? ' unesco' : ''}" style="background:${color}">${emoji}</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    })
    iconCache.set(key, icon)
  }
  return icon
}

const photoIcon = (p: Photo) =>
  L.divIcon({
    className: '',
    html: `<div class="photo-marker" style="background-image:url('${p.thumb}')"></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

function FlyTo({ spot }: { spot: Spot | null }) {
  const map = useMap()
  useEffect(() => {
    if (spot) map.flyTo([spot.lat, spot.lng], 11, { duration: 1.5 })
  }, [spot, map])
  return null
}

function ExploreLayer({ onStatus, onPhotoClick }: { onStatus: (s: string) => void; onPhotoClick: (p: Photo) => void }) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const abortRef = useRef<AbortController | null>(null)

  const load = (map: L.Map) => {
    abortRef.current?.abort()
    if (map.getZoom() < EXPLORE_MIN_ZOOM) {
      setPhotos([])
      onStatus(`지도를 더 확대하면 (줌 ${EXPLORE_MIN_ZOOM}+) 주변 사진을 불러와요`)
      return
    }
    const b = map.getBounds()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    onStatus('주변 사진 불러오는 중…')
    photosInBounds({ north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() }, 50, ctrl.signal)
      .then((ps) => {
        setPhotos(ps)
        onStatus(`이 영역에서 사진 ${ps.length}장`)
      })
      .catch((e) => e.name !== 'AbortError' && onStatus('사진을 불러오지 못했어요'))
  }

  const map = useMapEvents({ moveend: () => load(map) })
  useEffect(() => {
    load(map)
    return () => abortRef.current?.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {photos
        .filter((p) => p.lat != null && p.lng != null)
        .map((p) => (
          <Marker key={p.pageId} position={[p.lat!, p.lng!]} icon={photoIcon(p)} eventHandlers={{ click: () => onPhotoClick(p) }} />
        ))}
    </>
  )
}

interface Props {
  spots: Spot[]
  selected: Spot | null
  onSelect: (s: Spot) => void
  explore: boolean
  onExploreStatus: (s: string) => void
  onPhotoClick: (p: Photo) => void
}

export default function MapView({ spots, selected, onSelect, explore, onExploreStatus, onPhotoClick }: Props) {
  return (
    <MapContainer center={[25, 10]} zoom={2} minZoom={2} worldCopyJump className="map">
      <LayersControl position="topleft">
        <LayersControl.BaseLayer checked name="지도 (OSM)">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="위성 (Esri)">
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <MarkerClusterGroup chunkedLoading maxClusterRadius={45} showCoverageOnHover={false}>
        {spots.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lng]} icon={spotIcon(s, s.id === selected?.id)} eventHandlers={{ click: () => onSelect(s) }}>
            <Popup>
              <strong>{s.name}</strong>
              <br />
              {s.country}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      <FlyTo spot={selected} />
      {explore && <ExploreLayer onStatus={onExploreStatus} onPhotoClick={onPhotoClick} />}
    </MapContainer>
  )
}
