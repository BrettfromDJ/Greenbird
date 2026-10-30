import { redirect } from 'next/navigation'

// The V2 palette is now the site's default; keep old /v2 links working.
export default function V2() {
  redirect('/')
}
