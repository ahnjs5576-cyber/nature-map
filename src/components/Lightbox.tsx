import { useEffect } from 'react'
import { Photo } from '../api/wikimedia'

export default function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="lightbox" onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={photo.full} alt={photo.title} />
        <figcaption>
          <strong>{photo.title}</strong>
          <span>
            © {photo.artist} {photo.license && `· ${photo.license}`} ·{' '}
            <a href={photo.pageUrl} target="_blank" rel="noreferrer">원본 보기</a>
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
