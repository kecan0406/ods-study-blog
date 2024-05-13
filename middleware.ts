import { NextRequest, NextResponse } from 'next/server'

const allowedOrigin = 'https://giscus.app'

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Private-Network': 'true'
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigin.includes(origin)

  if (req.method === 'OPTIONS') {
    const preflightHeaders = { ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }), ...corsOptions }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  const res = NextResponse.next()
  if (isAllowedOrigin) res.headers.set('Access-Control-Allow-Origin', origin)
  Object.entries(corsOptions).forEach(([key, val]) => res.headers.set(key, val))
  return res
}

export const config = { matcher: '/themes/:path*' }
