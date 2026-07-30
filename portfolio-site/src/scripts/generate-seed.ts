import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config({ path: path.resolve(process.cwd(), '.env.locale') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

if (!process.env.DATABASE_URI || process.env.DATABASE_URI === 'file:./qe.db') {
  const dbPath = path.resolve(process.cwd(), 'qe.db')
  process.env.DATABASE_URI = `file:${dbPath}`
}
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'YOUR_SECRET_HERE'
}

console.log('DATABASE_URI:', process.env.DATABASE_URI)

import { getPayload, type CollectionSlug, type GlobalSlug } from 'payload'

const SYSTEM_COLLECTIONS = [
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
    .filter((slug: string) => !SYSTEM_COLLECTIONS.includes(slug)) as CollectionSlug[]

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
      const items = result.docs.map((doc) => sanitizeData(doc))
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

export const seedData = ${JSON.stringify({ collections: collectionsData, globals: globalsData }, null, 2)} as const

export async function seed(payload: Payload): Promise<void> {
  payload.logger.info('Starting seed process from generated seedData...')

  const collections = Object.keys(seedData.collections) as CollectionSlug[]
  const globals = Object.keys(seedData.globals) as GlobalSlug[]

  // Clear existing collection records
  for (const collection of collections) {
    try {
      payload.logger.info(\`Clearing \${collection}...\`)
      await payload.db.deleteMany({ collection, where: {}, req: {} as any })
    } catch (err: any) {
      payload.logger.warn(\`Could not clear \${collection}: \${err.message || err}\`)
    }
  }

  // Seed collection documents
  for (const collection of collections) {
    const items = (seedData.collections as unknown as Record<string, readonly any[]>)[collection] || []
    payload.logger.info(\`Seeding \${items.length} records into \${collection}...\`)
    for (const item of items) {
      try {
        await payload.create({
          collection,
          data: item as any,
          overrideAccess: true,
        })
      } catch (err: any) {
        payload.logger.error(\`Failed to create record in \${collection}: \${err.message || err}\`)
      }
    }
  }

  // Seed globals
  for (const globalSlug of globals) {
    const data = (seedData.globals as unknown as Record<string, any>)[globalSlug]
    if (data) {
      payload.logger.info(\`Updating global \${globalSlug}...\`)
      try {
        await payload.updateGlobal({
          slug: globalSlug,
          data: data as any,
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
