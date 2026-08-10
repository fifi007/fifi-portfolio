import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/assets',
)

const CWEBP = '/opt/homebrew/bin/cwebp'
const AVIFENC = '/opt/homebrew/bin/avifenc'

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] })
    let stderr = ''
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} exited ${code}: ${stderr.trim()}`))
    })
  })
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (/\.(jpe?g)$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

async function convertOne(jpgPath) {
  const parsed = path.parse(jpgPath)
  const webp = path.join(parsed.dir, `${parsed.name}.webp`)
  const avif = path.join(parsed.dir, `${parsed.name}.avif`)

  await Promise.all([
    run(CWEBP, ['-q', '78', '-m', '4', jpgPath, '-o', webp]),
    run(AVIFENC, ['--min', '0', '--max', '63', '-a', 'end-usage=q', '-a', 'cq-level=28', '-j', 'all', jpgPath, avif]),
  ])

  const [srcStat, webpStat, avifStat] = await Promise.all([
    stat(jpgPath),
    stat(webp),
    stat(avif),
  ])

  return {
    file: path.relative(root, jpgPath),
    jpgKB: Math.round(srcStat.size / 1024),
    webpKB: Math.round(webpStat.size / 1024),
    avifKB: Math.round(avifStat.size / 1024),
  }
}

const files = await walk(root)
console.log(`Found ${files.length} JPG files under public/assets`)

let done = 0
for (const file of files) {
  try {
    const result = await convertOne(file)
    done += 1
    console.log(
      `[${done}/${files.length}] ${result.file}  jpg=${result.jpgKB}KB → webp=${result.webpKB}KB avif=${result.avifKB}KB`,
    )
  } catch (error) {
    console.error(`Failed: ${file}`)
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}

console.log(`Done. Converted ${done}/${files.length}`)
