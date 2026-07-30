import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.locale') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

if (!process.env.DATABASE_URI || process.env.DATABASE_URI === 'file:./qe.db') {
  const dbPath = path.resolve(process.cwd(), 'qe.db')
  process.env.DATABASE_URI = `file:${dbPath}`
}
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'YOUR_SECRET_HERE'
}

import { getPayload } from 'payload'
import { seed } from './seed'

async function run() {
  console.log('Loading Payload config...')
  const configModule = await import('@payload-config')
  const config = await (configModule.default as any)

  console.log('Initializing Payload for seeding...')
  const payload = await getPayload({ config })
  await seed(payload)
  console.log('Seed application complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Error applying seed:', err)
  process.exit(1)
})
