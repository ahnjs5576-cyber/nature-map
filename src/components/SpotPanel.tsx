import { useEffect, useState } from 'react'
import { CATEGORIES, Spot } from '../data/spots'
import { Photo, commonsThumb, photosNear } from '../api/wikimedia'

interface Props {
  spot: Spot
  onClose: () => void
  onPhotoClick: (p: Photo) => void
}

export default function SpotPanel({ spot, onClose, onPhotoClick }: Props) {
  const [photos, setPhotos] = useState<Photo[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const ctrl = new AbortController()
    setPhotos(null)
    setError(false)
    photosNear(spot.lat, spot.lng, 10000, 40, ctrl.signal)
      .then(setPhotos)
      .catch((e) => e.name !== 'AbortError' && setError(true))
    return () => ctrl.abort()
  }, [spot])

  return (
    <section className="panel">
      <button className="close" onClick={onClose} aria-label="닫기">✕</button>
      <span className="tag" style={{ background: CATEGORIES[spot.category].color }}>
        {CATEGORIES[spot.category].emoji} {CATEGORIES[spot.category].label}
      </span>
      {spot.unesco && <span className="tag unesco">UNESCO 세계유산</span>}
      <h2>{spot.name}</h2>
      <p className="sub">{spot.nameEn} · {spot.country}</p>
      {spot.description && <p>{spot.description}</p>}
      {spot.image && (
        <figure className="hero">
          <img
            src={commonsThumb(spot.image, 800)}
            alt={spot.name}
            onError={(e) => ((e.currentTarget.parentElement as HTMLElement).style.display = 'none')}
          />
          <figcaption>
            대표 사진 · <a href={`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(spot.image)}`} target="_blank" rel="noreferrer">저작자·라이선스 보기</a>
          </figcaption>
        </figure>
      )}
      <h3>주변에서 찍힌 사진</h3>

      {error && <p className="status">사진을 불러오지 못했어요.</p>}
      {!photos && !error && <p className="status">사진 불러오는 중…</p>}
      {photos?.length === 0 && <p className="status">반경 10km 안에 위치 정보가 있는 사진이 없어요.</p>}

      <div className="grid">
        {photos?.map((ph) => (
          <img key={ph.pageId} src={ph.thumb} alt={ph.title} loading="lazy" onClick={() => onPhotoClick(ph)} />
        ))}
      </div>
      <p className="credit">사진 출처: Wikimedia Commons</p>
    </section>
  )
}
