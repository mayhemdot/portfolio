import { ProjectsBlock as ProjectBlockProps } from '@/payload-types'
import { Project } from '@/payload-types'
import { Media } from '@/components/Media'
import { Bounded } from '@/components/Bounded'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function ProjectsBlock({ populateBy, limit, selectedDocs }: ProjectBlockProps) {
  let projects: Project[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    // const flattenedCategories = categories?.map((category) => {
    //   if (typeof category === 'object') return category.id
    //   else return category
    // })

    const fetched = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: limit || 10,
      // ...(flattenedCategories && flattenedCategories.length > 0
      //   ? {
      //       where: {
      //         categories: {
      //           in: flattenedCategories,
      //         },
      //       },
      //     }
      //   : {}),
    })

    projects = fetched.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelected = selectedDocs.map((project) => {
        if (typeof project.value === 'object') return project.value
      }) as Project[]

      projects = filteredSelected
    }
  }
  return (
    <div className="min-h-dvh bg-black dark:bg-card text-white dark:text-black">
      <Bounded className={'fl-py-64/180'}>
        <h3 className="relative w-full text-center fl-text-20/40 px-4 md:w-3/5 md:mx-auto py-16 z-10">
          Our Projects
        </h3>

        <div className="flex flex-col fl-gap-16/32">
          {projects?.length ? (
            projects
              ?.filter((project) => typeof project === 'object')
              .map(({ id, title, year, gallery }) => (
                <div key={id} className="projectContainer flex items-center">
                  <div className="projectMedia basis-1/2">
                    <div className="px-12 py-8 bg-amber-600">
                      {typeof gallery?.[0] === 'object' ? (
                        <Media resource={gallery?.[0]!.mediaItem!} />
                      ) : null}
                    </div>
                  </div>
                  <div className="basis-1/2 flex justify-center items-center relative">
                    <div>
                      {title && (
                        <span className="block fl-text-20/24 font-extralight">{title}</span>
                      )}
                      {year && (
                        <span className="block text-secondary fl-text-20/24 font-extralight">
                          {year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div>No projects found</div>
          )}
        </div>
      </Bounded>
    </div>
  )
}

// padding-top: env(safe-area-inset-top);
// padding-bottom: env(safe-area-inset-bottom);
