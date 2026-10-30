'use client'

import 'leaflet/dist/leaflet.css'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export const OFFICE = {
  address: '2500 N Military Trl, Ste 120, Boca Raton, FL 33431',
  // Approximate — read off the design's map. Confirm before launch.
  lat: 26.3815,
  lng: -80.1205,
}

// CARTO Voyager tiles (light, with darker roads and labels) tinted with the hero green, reproducing the design's map
// (a light map in overlay mode over #03250f). Tiles live in their own
// stacking context, so the tint is a green pane above them in hard-light mode,
// which gives the same result as the tiles in overlay over green.
// CARTO's free tiles are for low traffic; swap in a keyed provider for launch.
const TILES = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
const ATTRIBUTION = '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/attributions">CARTO</a>'

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE.address)}`

/**
 * A live, draggable map of the office. Until tiles arrive (or if they can't
 * load at all) the static map from the design shows in its place.
 */
export function OfficeMap({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilesLoaded, setTilesLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let map: import('leaflet').Map | undefined
    let cancelled = false

    import('leaflet').then((L) => {
      if (cancelled) return
      map = L.map(el, {
        center: [OFFICE.lat, OFFICE.lng],
        zoom: 14,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
      })
      map.attributionControl.setPrefix(false)
      const tint = map.createPane('tint')
      tint.style.zIndex = '450'
      tint.style.pointerEvents = 'none'
      // The pane is its own stacking context, so it (not its child) blends.
      tint.style.mixBlendMode = 'hard-light'
      tint.innerHTML = '<div class="office-map-tint"></div>'
      L.tileLayer(TILES, { attribution: ATTRIBUTION, subdomains: 'abcd', maxZoom: 19 })
        // 'load' also fires when every tile failed, so wait for a real tile.
        .once('tileload', () => setTilesLoaded(true))
        .addTo(map)
      L.marker([OFFICE.lat, OFFICE.lng], {
        icon: L.divIcon({ className: 'office-pin', html: '<span></span>', iconSize: [14, 14] }),
        keyboard: false,
      }).addTo(map)
    })

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [])

  return (
    <div className={`office-map relative overflow-hidden bg-hero ${className}`}>
      <div ref={ref} className="absolute inset-0" />
      <Image
        src="/images/map-boca-fallback@2x.png"
        alt=""
        fill
        sizes="241px"
        className={`pointer-events-none z-[650] object-cover transition-opacity duration-700 ${tilesLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute top-2 right-2 z-[700] rounded-[4px] bg-hero/80 px-2 py-1 font-mono text-[10px] leading-none text-white/80 uppercase backdrop-blur transition-colors hover:text-brand"
      >
        Directions ↗
      </a>
    </div>
  )
}
