import fs from 'node:fs'
import { join } from 'path'

export async function GET(req: Request, { params }: { params: { theme: string } }) {
  const css = fs.readFileSync(join(process.cwd(), `styles/themes/${params.theme}`), 'utf-8')
  return new Response(css, { headers: { 'Content-Type': 'text/css' } })
}
