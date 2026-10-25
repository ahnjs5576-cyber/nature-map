// Wikimedia Commons API: geotagged photos (File namespace = 6)
const API = 'https://commons.wikimedia.org/w/api.php'

export interface Photo {
  pageId: number
  title: string
  thumb: string
  full: string
  pageUrl: string
  artist: string
  license: string
  lat?: number
  lng?: number
}

type Bounds = { north: number; south: number; east: number; west: number }

const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '').trim()

async function query(params: Record<string, string>, signal?: AbortSignal): Promise<Photo[]> {
  const url = new URL(API)
  const all = {
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'geosearch',
    ggsnamespace: '6',
    prop: 'imageinfo|coordinates',
    iiprop: 'url|mime|extmetadata',
    iiurlwidth: '640',
    iiextmetadatafilter: 'Artist|LicenseShortName',
    ...params,
  }
  Object.entries(all).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`Wikimedia API ${res.status}`)
  const data = await res.json()
  const pages: any[] = Object.values(data?.query?.pages ?? {})

  return pages
    .filter((p) => p.imageinfo?.[0]?.mime === 'image/jpeg')
    .map((p) => {
      const ii = p.imageinfo[0]
      const meta = ii.extmetadata ?? {}
      return {
        pageId: p.pageid,
        title: p.title.replace(/^File:/, '').replace(/\.jpe?g$/i, ''),
        thumb: ii.thumburl,
        full: ii.url,
        pageUrl: ii.descriptionurl,
        artist: stripHtml(meta.Artist?.value) || 'Unknown',
        license: meta.LicenseShortName?.value ?? '',
        lat: p.coordinates?.[0]?.lat,
        lng: p.coordinates?.[0]?.lon,
      }
    })
}

/** Photos within radius (max 10km) of a point */
export function photosNear(lat: number, lng: number, radius = 5000, limit = 30, signal?: AbortSignal) {
  return query({ ggscoord: `${lat}|${lng}`, ggsradius: String(radius), ggslimit: String(limit) }, signal)
}

/** Photos inside a map bounding box (API rejects very large boxes, so only use at high zoom) */
export function photosInBounds(b: Bounds, limit = 50, signal?: AbortSignal) {
  return query({ ggsbbox: `${b.north}|${b.west}|${b.south}|${b.east}`, ggslimit: String(limit) }, signal)
}

/** Resized image URL for a Commons file name */
export const commonsThumb = (file: string, width: number) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`
