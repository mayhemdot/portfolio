import type { RequiredDataFromCollectionSlug } from "payload";
import type { AccordionBlock } from "@/payload-types";

export const faq: () => RequiredDataFromCollectionSlug<"pages"> = () => {
  return {
    slug: "faq",
    title: "FAQ",
    _status: "published",
    breadcrumbs: [
      {
        url: "/",
        label: "FAQ",
        slug: "faq",
        title: "FAQ",
      },
    ],
    hero: {
      type: "lowImpact",
      links: [],
      media: null,
      Text: {
        root: {
          type: "root",
          children: [
            {
              type: "heading",
              children: [
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Frequently Asked Questions",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              tag: "h1",
              version: 1,
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "link",
                  children: [
                    {
                      type: "text",
                      detail: 0,
                      format: 0,
                      mode: "normal",
                      style: "",
                      text: "Visit the admin dashboard",
                      version: 1,
                    },
                  ],
                  direction: "ltr",
                  fields: {
                    linkType: "custom",
                    newTab: false,
                    url: "/admin",
                  },
                  format: "",
                  indent: 0,
                  version: 2,
                },
                {
                  type: "text",
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: " to make your account and seed content for your website.",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          version: 1,
        },
      },
      // Text: LowImpactHeading({ text: "Frequently Asked Questions" }),
    },
    layout: [
      {
        blockType: "accordion",
        links: [],
        blockName: "Frequently Asked Questions",
        introContent: {
          root: {
            type: "paragraph",
            children: [
              {
                type: "link",
                children: [
                  {
                    type: "text",
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Visit the admin dashboard",
                    version: 1,
                  },
                ],
                direction: "ltr",
                fields: {
                  linkType: "custom",
                  newTab: false,
                  url: "/admin",
                },
                format: "",
                indent: 0,
                version: 2,
              },
              {
                type: "text",
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: " to make your account and seed content for your website.",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        },
        // introContent: TextParagraph({
        //   text: " Find answers to the most common questions about our products, orders, and services.",
        // }),
        items: [
          {
            title: "Question 1",
            content: TextParagraph({
              text: "Answer 1",
            }),
          },
          {
            title: "Question 2",
            content: TextParagraph({
              text: "Answer 2",
            }),
          },
          {
            title: "Question 3",
            content: TextParagraph({
              text: "Answer 3",
            }),
          },
        ],
      } as AccordionBlock,
      // {
      //   blockType: "formBlock",
      //   enableIntro: true,
      //   form: contactForm,
      //   introContent: {
      //     root: {
      //       type: "root",
      //       children: [
      //         {
      //           type: "heading",
      //           children: [
      //             {
      //               type: "text",
      //               detail: 0,
      //               format: 0,
      //               mode: "normal",
      //               style: "",
      //               text: "Example contact form:",
      //               version: 1,
      //             },
      //           ],
      //           direction: "ltr",
      //           format: "",
      //           indent: 0,
      //           tag: "h3",
      //           version: 1,
      //         },
      //       ],
      //       direction: "ltr",
      //       format: "",
      //       indent: 0,
      //       version: 1,
      //     },
      //   },
      // },
    ],
  };
};

function LowImpactHeading({ text }: { text: string }) {
  return {
    root: {
      type: "root",
      format: "center",
      children: [
        {
          type: "heading",
          children: [
            {
              type: "text",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: text,
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          tag: "h1",
          version: 1,
        },
      ],
      direction: null,

      indent: 0,
      version: 1,
    },
  };
}

function TextParagraph({ text }: { text: string }) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "heading",
          children: [
            {
              type: "text",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: text,
              version: 1,
            },
          ],
          direction: "ltr" as const,
          format: "",
          indent: 0,
          tag: "h2",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}
