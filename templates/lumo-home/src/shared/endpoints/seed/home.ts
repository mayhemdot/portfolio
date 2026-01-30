import type { RequiredDataFromCollectionSlug } from 'payload'
import type { CallToActionBlock, Media } from '@/payload-types'

type HomeArgs = {
  heroImage?: Media
  metaImage?: Media
}

export const home: (
  args: HomeArgs,
) => RequiredDataFromCollectionSlug<'pages'> = ({ heroImage, metaImage }) => {
  return {
    slug: 'home',
    _status: 'published',
    title: 'Home',
    heroImage,
    metaImage,
    breadcrumbs: [
      {
        url: '/',
        label: 'Home',
        slug: 'home',
        title: 'Home',
      },
    ],
    layout: [
      {
        blockType: 'cta',
        id: 'callToAction',
        links: [],
        blockName: 'Call to Action',
        Text: TextHeading({ text: 'Call to Action' }),
      } as CallToActionBlock,
    ],
    hero: {
      type: 'none',
      links: [],
      //   media: heroImage,
    },
  }
}

function TextHeading({ text }: { text: string }) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: text,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
