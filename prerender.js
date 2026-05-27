import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function run() {
  const htmlTemplatePath = path.resolve(__dirname, 'dist/index.html')
  const serverBundlePath = path.resolve(__dirname, 'dist-server/entry-server.js')

  console.log('Reading HTML template...')
  const template = fs.readFileSync(htmlTemplatePath, 'utf-8')

  console.log('Loading server-side rendered bundle...')
  const { render } = await import(pathToFileURL(serverBundlePath).href)

  console.log('Pre-rendering React app to static HTML...')
  const appHtml = render()

  console.log('Injecting pre-rendered HTML into template...')
  // Find <div id="root"></div> and inject the appHtml
  const rootDivRegex = /(<div\s+id=["']root["']\s*>)(<\/div>)/
  if (!rootDivRegex.test(template)) {
    throw new Error('Could not find <div id="root"></div> in index.html template.')
  }
  const finalHtml = template.replace(rootDivRegex, `$1${appHtml}$2`)

  console.log('Writing final index.html...')
  fs.writeFileSync(htmlTemplatePath, finalHtml, 'utf-8')

  console.log('Cleaning up temporary dist-server directory...')
  fs.rmSync(path.resolve(__dirname, 'dist-server'), { recursive: true, force: true })

  console.log('Pre-rendering completed successfully! 🎉')
}

run().catch((err) => {
  console.error('Pre-rendering failed:', err)
  process.exit(1)
})
