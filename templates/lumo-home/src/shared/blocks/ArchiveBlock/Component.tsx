// import type {
//   ArchiveBlock as ArchiveBlockProps,
//   Product,
// } from '@/payload-types'

// import configPromise from "@payload-config";
// import React from 'react'
import { CollectionArchive } from "@/shared/components/CollectionArchive";
import { Text } from "@/shared/components/Text";

// import { getPayload } from 'payload'
// import { CollectionArchive } from '@/shared/components/CollectionArchive'

type ArchiveBlockProps = {
  introContent: string;
  limit: number;
  populateBy: "products";
  selectedDocs: any[];
};

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = async (props) => {
  const {
    id,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props;
  //categories
  const limit = limitFromProps || 3;

  // let programs: Product[] = [];

  // if (populateBy === "collection") {
  //   const payload = await getPayload({ config: configPromise });
  //   // const flattenedCategories = categories?.map((category) => {
  //   //   if (typeof category === 'object') return category.id
  //   //   else return category
  //   // })
  //   const fetchedPrograms = await payload.find({
  //     collection: "products",
  //     depth: 1,
  //     limit,
  //     // ...(flattenedCategories && flattenedCategories.length > 0
  //     //   ? {
  //     //       where: {
  //     //         categories: {
  //     //           in: flattenedCategories,
  //     //         },
  //     //       },
  //     //     }
  //     //   : {}),
  //   });
  //   programs = fetchedPrograms.docs;
  // } else {
  //   if (selectedDocs?.length) {
  //     const filteredSelectedPrograms = selectedDocs.map((post: any) => {
  //       if (typeof post.value === "object") return post.value;
  //     }) as Product[];

  //     programs = filteredSelectedPrograms;
  //   }
  // }
  // console.log(programs);
  const products = [] as any;

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-4 md:mb-8">
          <Text className="ml-0 max-w-3xl">{introContent}</Text>
        </div>
      )}
      <CollectionArchive products={products} />
    </div>
  );
};
