import type {  CategoryRaw } from "@/modules/categories/model/types";

export const CATEGORIES: CategoryRaw[] = [
  {
    id: 1,
    name: { en: "Chairs", ru: "Стулья" },
    slug: "chairs",
  },
  {
    id: 2,
    name: { en: "Tables", ru: "Столы" },
    slug: "tables",
  },
  {
    id: 3,
    name: { en: "Lamps", ru: "Лампы" },
    slug: "lamps",
  },
  {
    id: 4,
    name: { en: "Others", ru: "Другие" },
    slug: "others",
  },
] as const;

// export const CATEGORY_LIST = {
//   "en": [{
//       id: 1,
//       name: "Chairs",
//       slug: "chairs",
//     },
//     {
//       id: 2,
//       name: "Tables",
//       slug: "tables",
//     },
//     {
//       id: 3,
//       name: "Lamps",
//       slug: "lamps",
//     },
//     {
//       id: 4,
//       name: "Others",
//       slug: "others",
//     },
//   ],
//   "ru": [
//   {
//     id: 1,
//     name: "Стулья",
//     slug: "chairs",
//   },
//   {
//     id: 2,
//     name: "Столы",
//     slug: "tables",
//   },
//   {
//     id: 3,
//     name: "Лампы",
//     slug: "lamps",
//   },
//   {
//     id: 4,
//     name: "Другие",
//     slug: "others",
//   },
// ]
// }
