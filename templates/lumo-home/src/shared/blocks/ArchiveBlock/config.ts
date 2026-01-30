import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/Text-lexical";
import type { Block } from "payload";

export const Archive: Block = {
  slug: "archive",
  interfaceName: "ArchiveBlock",
  fields: [
    {
      name: "introContent",
      type: "Text",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: "Intro Content",
    },
    {
      name: "populateBy",
      type: "select",
      defaultValue: "collection",
      options: [
        {
          label: "Collection",
          value: "collection",
        },
        {
          label: "Individual Selection",
          value: "selection",
        },
      ],
    },
    {
      name: "relationTo",
      type: "select",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
      },
      defaultValue: "products",
      label: "Collections To Show",
      options: [
        {
          label: "Products",
          value: "products",
        },
      ],
    },
    // {
    //   name: 'categories',
    //   type: 'relationship',
    //   admin: {
    //     condition: (_, siblingData) => siblingData.populateBy === 'collection',
    //   },
    //   hasMany: true,
    //   relationTo: 'categories',
    //   label: 'Categories To Show',
    // },
    {
      name: "limit",
      type: "number",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "collection",
        step: 1,
      },
      defaultValue: 10,
      label: "Limit",
    },
    {
      name: "selectedDocs",
      type: "relationship",
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === "selection",
      },
      hasMany: true,
      label: "Selection",
      relationTo: ["products"],
    },
  ],
  labels: {
    plural: "Archives",
    singular: "Archive",
  },

  // defaultSort: '-createdAt',
  // defaultSort: ''
  // sorted: '-createdAt',
};
