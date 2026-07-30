import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config({ path: path.resolve(process.cwd(), '.env.locale') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

if (!process.env.DATABASE_URI) {
  const dbPath = path.resolve(process.cwd(), 'qe.db')
  process.env.DATABASE_URI = `file:${dbPath}`
}
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'YOUR_SECRET_HERE'
}

import { getPayload, type CollectionSlug, type GlobalSlug } from 'payload'

const EXCLUDE_COLLECTIONS = [
  'search',
  'payload-jobs',
  'payload-migrations',
  'payload-locked-documents',
  'payload-preferences',
]

const SYSTEM_FIELDS = ['createdAt', 'updatedAt', '__v']

function sanitizeData(data: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {}
  for (const key of Object.keys(data)) {
    if (SYSTEM_FIELDS.includes(key)) continue
    const val = data[key]
    if (val !== undefined) {
      clean[key] = val
    }
  }
  return clean
}

async function main() {
  console.log('Loading Payload config...')
  const configModule = await import('@payload-config')
  const config = await (configModule.default as any)

  console.log('Connecting to Payload...')
  const payload = await getPayload({ config })

  const collectionSlugs = (config.collections || [])
    .map((c: any) => c.slug)
    .filter((slug: string) => !EXCLUDE_COLLECTIONS.includes(slug)) as CollectionSlug[]

  const globalSlugs = (config.globals || []).map((g: any) => g.slug) as GlobalSlug[]

  console.log('Registered collection slugs:', collectionSlugs)
  console.log('Registered global slugs:', globalSlugs)

  const collectionsData: Record<string, any[]> = {}
  const globalsData: Record<string, any> = {}

  console.log('Extracting collection data...')
  for (const slug of collectionSlugs) {
    try {
      const result = await payload.find({
        collection: slug,
        limit: 1000,
        depth: 0,
        draft: true,
        locale: 'all',
        overrideAccess: true,
      })
      const items = result.docs.map((doc) => {
        const clean = sanitizeData(doc)
        if (slug === 'media' && typeof clean.url === 'string' && clean.url.includes('null')) {
          delete clean.url
        }
        return clean
      })
      collectionsData[slug] = items
      console.log(`- ${slug}: ${items.length} records extracted`)
    } catch (err: any) {
      console.error(`Error extracting collection "${slug}":`, err?.message || err)
    }
  }

  console.log('Extracting global data...')
  for (const slug of globalSlugs) {
    try {
      const data = await payload.findGlobal({
        slug,
        depth: 0,
        locale: 'all',
        overrideAccess: true,
      })
      globalsData[slug] = sanitizeData(data)
      console.log(`- ${slug}: extracted`)
    } catch (err: any) {
      console.error(`Error extracting global "${slug}":`, err?.message || err)
    }
  }

  const seedFileContent = `import type { Payload, CollectionSlug, GlobalSlug } from 'payload'
import { createLocalReq } from 'payload'
import path from 'path'
import fs from 'fs'

export const seedData = ${JSON.stringify({ collections: collectionsData, globals: globalsData }, null, 2)} as const

const EXCLUDED_COLLECTIONS = ['search', 'payload-jobs', 'payload-migrations', 'payload-locked-documents', 'payload-preferences']

const SEED_ORDER: string[] = ['users', 'categories', 'media', 'pages', 'projects', 'forms', 'form-submissions']

export async function seed(payload: Payload): Promise<void> {
  payload.logger.info('Starting seed process from generated seedData...')

  const localReq = await createLocalReq({ locale: 'all' }, payload)

  const collectionsInSeed = Object.keys(seedData.collections).filter(c => !EXCLUDED_COLLECTIONS.includes(c))
  const collections = [
    ...SEED_ORDER.filter(c => collectionsInSeed.includes(c)),
    ...collectionsInSeed.filter(c => !SEED_ORDER.includes(c))
  ] as CollectionSlug[]

  const globals = Object.keys(seedData.globals) as GlobalSlug[]

  // Clear existing collection records in reverse dependency order
  for (const collection of [...collections].reverse()) {
    try {
      payload.logger.info(\`Clearing \${collection}...\`)
      await payload.db.deleteMany({ collection, where: {}, req: localReq as any })
    } catch (err: any) {
      payload.logger.warn(\`Could not clear \${collection}: \${err.message || err}\`)
    }
  }

  // Seed collection documents
  for (const collection of collections) {
    const items = (seedData.collections as unknown as Record<string, readonly any[]>)[collection] || []
    payload.logger.info(\`Seeding \${items.length} records into \${collection}...\`)
    for (const itemRaw of items) {
      const item = JSON.parse(JSON.stringify(itemRaw))
      try {
        if (collection === 'users') {
          item.password = item.password || process.env.ADMIN_PASSWORD || 'Password123!'
        }

        if (collection === 'media') {
          if (typeof item.url === 'string' && item.url.includes('null')) {
            delete item.url
          }

          const filename = item.filename
          let fileBuffer: Buffer | null = null
          if (filename) {
            const candidates = [
              path.resolve(process.cwd(), 'public/media', filename),
              path.resolve(process.cwd(), 'src/payload/endpoints/seed', filename),
              path.resolve(process.cwd(), 'public', filename),
            ]
            for (const cand of candidates) {
              if (fs.existsSync(cand)) {
                fileBuffer = fs.readFileSync(cand)
                break
              }
            }
          }

          let fileObj: any = undefined
          if (fileBuffer && filename) {
            fileObj = {
              name: filename,
              data: fileBuffer,
              mimetype: item.mimeType || 'image/webp',
              size: fileBuffer.byteLength,
            }
          } else {
            const fallbackBuffer = Buffer.from(
              'UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAQAcJaQAA3AA/v38gAA=',
              'base64',
            )
            fileObj = {
              name: filename || 'placeholder.webp',
              data: fallbackBuffer,
              mimetype: item.mimeType || 'image/webp',
              size: fallbackBuffer.byteLength,
            }
          }

          await payload.create({
            collection: 'media',
            data: item as any,
            file: fileObj,
            locale: 'all',
            req: localReq,
            overrideAccess: true,
          })
          continue
        }

        await payload.create({
          collection,
          data: item as any,
          locale: 'all',
          req: localReq,
          overrideAccess: true,
        })
      } catch (err: any) {
        payload.logger.error(\`Failed to create record in \${collection} (ID: \${item.id}): \${err.message || err}\`)
      }
    }
  }

  // Seed globals
  for (const globalSlug of globals) {
    const data = JSON.parse(JSON.stringify((seedData.globals as unknown as Record<string, any>)[globalSlug] || {}))
    if (Object.keys(data).length > 0) {
      payload.logger.info(\`Updating global \${globalSlug}...\`)
      try {
        await payload.updateGlobal({
          slug: globalSlug,
          data: data as any,
          locale: 'all',
          req: localReq,
          overrideAccess: true,
        })
      } catch (err: any) {
        payload.logger.error(\`Failed to update global \${globalSlug}: \${err.message || err}\`)
      }
    }
  }

  payload.logger.info('Database seeded successfully from generated seedData!')
}
`

  const outputPath = path.resolve(process.cwd(), 'src/scripts/seed.ts')
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, seedFileContent, 'utf-8')
  console.log(`Successfully generated seed script at ${outputPath}`)
  process.exit(0)
}

main().catch((err) => {
  console.error('Failed to generate seed script:', err)
  process.exit(1)
})
