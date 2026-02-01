import type { Metadata } from 'next/types'
import { DynamicBreadcrumb } from '@/shared/components/Breadcrumbs'
import { ProductClient } from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

const BREADCRUMBS = {
  ru: [
    { label: 'Главная', url: '/' },
    { label: 'Каталог', url: '!' },
  ],
  en: [
    { label: 'Home', url: '/' },
    { label: 'Catalog', url: '!' },
  ],
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: string
  }>
}
export default async function Page({ params }: Args) {
  const { locale } = await params

  const breadcrumbs = BREADCRUMBS[locale as keyof typeof BREADCRUMBS]

  return (
    <div className="container mx-auto w-full">
      <DynamicBreadcrumb breadcrumbs={breadcrumbs} />
      <ProductClient />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
