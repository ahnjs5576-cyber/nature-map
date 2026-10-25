#!/usr/bin/env node
// Collects natural landmarks from Wikidata into public/data/spots-wikidata.json
// Usage: npm run fetch:data   (Node 18+, needs internet access to query.wikidata.org)

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ENDPOINT = 'https://query.wikidata.org/sparql'
const USER_AGENT = 'NatureMap/0.1 (https://github.com/; educational project)'
const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../public/data/spots-wikidata.json')

// Popularity is approximated by sitelinks (number of Wikipedia language editions).
// classes: Wikidata class QIDs matched against P31 (instance of)
const QUERIES = [
  { category: 'park', classes: ['Q46169'], minSitelinks: 25, limit: 250 }, // national park
  { category: 'mountain', classes: ['Q8502'], minSitelinks: 30, limit: 150 }, // mountain
  { category: 'volcano', classes: ['Q8072', 'Q212057', 'Q190869'], minSitelinks: 20, limit: 100 }, // volcano, stratovolcano, shield volcano
  { category: 'waterfall', classes: ['Q34038'], minSitelinks: 12, limit: 120 }, // waterfall
  { category: 'lake', classes: ['Q23397'], minSitelinks: 40, limit: 120 }, // lake
  { category: 'glacier', classes: ['Q35666'], minSitelinks: 10, limit: 80 }, // glacier
  { category: 'desert', classes: ['Q8514'], minSitelinks: 15, limit: 60 }, // desert
  { category: 'canyon', classes: ['Q150784'], minSitelinks: 10, limit: 60 }, // canyon
  { category: 'forest', classes: ['Q4421'], minSitelinks: 15, limit: 50 }, // forest
  { category: 'coast', classes: ['Q40080', 'Q39594', 'Q107679', 'Q11292'], minSitelinks: 20, limit: 100 }, // beach, bay, cliff, coral reef
]

// UNESCO World Heritage Sites (P1435 = Q9259) that are natural places.
// More specific categories come first: an item matching several takes the first one.
const UNESCO_CLASSES = [
  ['Q8072', 'volcano'],
  ['Q34038', 'waterfall'],
  ['Q35666', 'glacier'],
  ['Q150784', 'canyon'],
  ['Q8514', 'desert'],
  ['Q23397', 'lake'],
  ['Q8502', 'mountain'],
  ['Q11292', 'coast'],
  ['Q23442', 'coast'], // island
  ['Q39594', 'coast'],
  ['Q4421', 'forest'],
  ['Q46169', 'park'],
  ['Q179049', 'park'], // nature reserve
  ['Q473972', 'park'], // protected area
]

const LABELS = `
  OPTIONAL { ?item rdfs:label ?labelKo FILTER(LANG(?labelKo) = "ko") }
  OPTIONAL { ?item rdfs:label ?labelEn FILTER(LANG(?labelEn) = "en") }
  OPTIONAL { ?item schema:description ?descKo FILTER(LANG(?descKo) = "ko") }
  OPTIONAL { ?item schema:description ?descEn FILTER(LANG(?descEn) = "en") }
  OPTIONAL {
    ?item wdt:P17 ?country .
    OPTIONAL { ?country rdfs:label ?countryKo FILTER(LANG(?countryKo) = "ko") }
    OPTIONAL { ?country rdfs:label ?countryEn FILTER(LANG(?countryEn) = "en") }
  }
  OPTIONAL { ?item wdt:P18 ?image }
  ?item wdt:P625 ?coord .
  BIND(EXISTS { ?item wdt:P1435 wd:Q9259 } AS ?unesco)
`

const categoryQuery = ({ classes, minSitelinks, limit }) => `
SELECT ?item ?sitelinks ?labelKo ?labelEn ?descKo ?descEn ?countryKo ?countryEn ?image ?coord ?unesco WHERE {
  {
    SELECT ?item ?sitelinks WHERE {
      VALUES ?cls { ${classes.map((q) => `wd:${q}`).join(' ')} }
      ?item wdt:P31 ?cls ; wdt:P625 [] ; wikibase:sitelinks ?sitelinks .
      FILTER(?sitelinks >= ${minSitelinks})
    }
    ORDER BY DESC(?sitelinks)
    LIMIT ${limit}
  }
  ${LABELS}
}`

const unescoQuery = () => `
SELECT ?item ?cat ?sitelinks ?labelKo ?labelEn ?descKo ?descEn ?countryKo ?countryEn ?image ?coord ?unesco WHERE {
  {
    SELECT DISTINCT ?item ?cat ?sitelinks WHERE {
      VALUES (?cls ?cat) { ${UNESCO_CLASSES.map(([q, c]) => `(wd:${q} "${c}")`).join(' ')} }
      ?item wdt:P1435 wd:Q9259 ; wdt:P625 [] ; wikibase:sitelinks ?sitelinks ;
            wdt:P31/wdt:P279* ?cls .
    }
  }
  ${LABELS}
}`

async function sparql(query) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
      'User-Agent': USER_AGENT,
    },
    body: new URLSearchParams({ query }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return (await res.json()).results.bindings
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const val = (b, k) => b[k]?.value

function parsePoint(wkt) {
  const m = /Point\(([-\d.eE]+) ([-\d.eE]+)\)/.exec(wkt ?? '')
  return m ? { lng: Number(m[1]), lat: Number(m[2]) } : null
}

function fileName(url) {
  if (!url) return undefined
  const i = url.indexOf('/Special:FilePath/')
  return i < 0 ? undefined : decodeURIComponent(url.slice(i + '/Special:FilePath/'.length))
}

const spots = new Map() // qid -> spot (with sitelinks for sorting)

function addRows(rows, fallbackCategory) {
  const catPriority = (c) => UNESCO_CLASSES.findIndex(([, x]) => x === c)

  for (const b of rows) {
    const id = val(b, 'item').split('/').pop()
    const category = val(b, 'cat') ?? fallbackCategory
    const point = parsePoint(val(b, 'coord'))
    const nameKo = val(b, 'labelKo')
    const nameEn = val(b, 'labelEn')
    if (!point || (!nameKo && !nameEn)) continue

    let s = spots.get(id)
    if (!s) {
      s = {
        id,
        name: nameKo ?? nameEn,
        nameEn: nameEn ?? nameKo,
        country: '',
        category,
        lat: +point.lat.toFixed(4),
        lng: +point.lng.toFixed(4),
        description: val(b, 'descKo') ?? val(b, 'descEn') ?? '',
        image: fileName(val(b, 'image')),
        unesco: val(b, 'unesco') === 'true',
        source: 'wikidata',
        _countries: new Set(),
        _sitelinks: Number(val(b, 'sitelinks') ?? 0),
      }
      spots.set(id, s)
    } else if (val(b, 'cat') && catPriority(category) < catPriority(s.category)) {
      s.category = category
    }
    const country = val(b, 'countryKo') ?? val(b, 'countryEn')
    if (country) s._countries.add(country)
    s.image ??= fileName(val(b, 'image'))
  }
}

async function run(label, query, fallbackCategory) {
  process.stdout.write(`- ${label} ... `)
  try {
    const rows = await sparql(query)
    const before = spots.size
    addRows(rows, fallbackCategory)
    console.log(`${spots.size - before} new (${rows.length} rows)`)
  } catch (e) {
    console.log(`failed: ${e.message}`)
  }
  await sleep(1500) // be polite to the public endpoint
}

await run('UNESCO natural heritage', unescoQuery(), 'park')
for (const q of QUERIES) await run(q.category, categoryQuery(q), q.category)

const out = [...spots.values()]
  .sort((a, b) => b._sitelinks - a._sitelinks)
  .map(({ _countries, _sitelinks, ...s }) => ({ ...s, country: [..._countries].join('/') }))

await mkdir(dirname(OUT), { recursive: true })
await writeFile(OUT, JSON.stringify(out))
console.log(`\nSaved ${out.length} spots (${out.filter((s) => s.unesco).length} UNESCO) → ${OUT}`)
