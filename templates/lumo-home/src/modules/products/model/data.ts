// type ProductSeed = {
//   title: string
//   slug: string
//   price: number
//   categorySlug: 'chairs' | 'tables' | 'lamps' | 'others'
//   meta: {
//     title: string
//     description: string
//   }
// }

import { CATEGORIES } from "@/modules/categories/model/data";
import type { Product, ProductRaw } from "@/modules/products/model/types";

// export const PRODUCTS: Product[] = [
//   {
//     id: 1,
//     title: "Modern glass chair 103",
//     slug: "modern-glass-chair-103",
//     price: 17900,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_1.png",
//         alt: "Modern glass chair 103",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//      }],
//     category: CATEGORIES[0],
//     characteristics: [{
//       name: "Color",
//       value: "White",
//     }],
//     meta: {
//       title: "Modern glass chair 103",
//       description: "The Modern Glass Chair 103 is a sleek and modern chair.",
//     },
//     updatedAt: new Date().toISOString(), 
//     createdAt: new Date().toISOString(), 
//     inStock: true, 
//     enableVariants:false,
//     relatedProducts: []
//   },
//   {
//     id: 2,
//     title: "Modern orange glass chair 111",
//     slug: "modern-orange-glass-chair-104",
//     price: 23000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_2.png",
//         alt: "Modern glass chair 103",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//      }],
//     category: CATEGORIES[0],
//     characteristics: [{
//       name: "Color",
//       value: "Orange",
//     }],
//     meta: {
//       title: "Modern orange glass chair 111",
//       description:
//         "The Modern Orange Glass Chair 111 is a sleek and modern chair.",
//     },
//      updatedAt: new Date().toISOString(), 
//     createdAt: new Date().toISOString(), 
//     inStock: true, 
//     enableVariants:false,
//     relatedProducts: []
//   },
//   {
//     id: 3,
//     title: "Modern violet glass table 032",
//     slug: "modern-violet-glass-table-032",
//     price: 23000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_3.png",
//         alt: "Modern violet table 032",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//      }],
//     category: CATEGORIES[1],
//     characteristics: [{
//       name: "Color",
//       value: "Violet",
//     }],
//     meta: {
//       title: "Modern violet glass table 032",
//       description:
//         "The Modern Violet Glass Table 032 is a sleek and modern table.",
//     },
//     updatedAt: new Date().toISOString(), 
//     createdAt: new Date().toISOString(), 
//     inStock: true, 
//     enableVariants:false,
//     relatedProducts: []
//   },
//   {
//     id: 4,
//     title: "Modern rose glass bath 132",
//     slug: "modern-rose-glass-bath-132",
//     price: 93000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_4.png",
//         alt: "Modern violet table 032",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     }],
//     category: CATEGORIES[3],
//     characteristics: [{
//       name: "Color",
//       value: "Rose",
//     }],
//     meta: {
//       title: "Modern violet glass bath 132",
//       description:
//         "The Modern Violet Glass Bath 132 is a sleek and modern table.",
//     },
//     updatedAt: new Date().toISOString(), 
//     createdAt: new Date().toISOString(), 
//     inStock: true, 
//     enableVariants:false,
//     relatedProducts: []
//   },
//   {
//     id: 5,
//     title: "Modern orange glass lamp 004",
//     slug: "modern-orange-glass-lamp-004",
//     price: 11000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_6.png",
//         alt: "Modern violet table 032",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//     }],
//     category: CATEGORIES[2],
//     characteristics: [{
//       name: "Color",
//       value: "Orange",
//     }],
//     meta: {
//       title: "Modern orange glass lamp 004",
//       description:
//         "The Modern orange Glass Lamp 004 is a sleek and modern table.",
//     },
//     updatedAt: new Date().toISOString(), 
//     createdAt: new Date().toISOString(), 
//     inStock: true, 
//     enableVariants:false,
//     relatedProducts: []
//   },
// ];


export const PRODUCTS: ProductRaw[] = [
  {
    id: 1,
    slug: "modern-glass-chair-103",

    title: {
      en: "Modern glass chair 103",
      ru: "Современный стеклянный стул 103",
    },
    price: {
      rub: 17900,
      usd: 199,
      // EUR: 189,
    },
    images: [
      {
        id: 1,
        url: "/images/product_1-1.webp",
        alt: {
          en: "Modern glass chair 103",
          ru: "Современный стеклянный стул 103",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],

    category: CATEGORIES[0],
    characteristics: [
      {
        name: { en: "Dimensions", ru: "Размеры" },
        value: { en: "H: 140 cm, W: 60 cm, D: 70 cm", ru: "Высота: 140 см, ширина: 60 см, глубина: 70 см" },
      },
      {
        name: { en: "Color", ru: "Цвет" },
        value: { en: "White", ru: "Белый" },
      },
      {
        name: { en: "Material", ru: "Материал" },
        value: { en: "Acrylic material with high strength", ru: "Акрил с высокой прочностью" },
      },
    ],
    description: {
      en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a vibrant red hue. The chair’s construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
      ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного красного цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле."
    },
    meta: {
      title: {
        en: "Modern glass chair 103",
        ru: "Современный стеклянный стул 103",
      },
      description: {
        en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a vibrant red hue. The chair’s construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
        ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного красного цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле.",
      },
    },
    inStock: true,
    enableVariants: false,
    relatedProducts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    slug: "modern-orange-glass-chair-111",
    title: {
      en: "Modern orange glass chair 111",
      ru: "Современный оранжевый стеклянный стул 111",
    },
    price: {
      rub: 23000,
      usd: 249,
      // EUR: 239,
    },
    images: [
      {
        id: 1,
        url: "/images/product_2-1.webp",
        alt: {
          en: "Modern orange glass chair 111",
          ru: "Оранжевый стеклянный стул 111",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    category: CATEGORIES[0],
    characteristics: [
      {
        name: { en: "Dimensions", ru: "Размеры" },
        value: { en: "H: 100 cm, W: 60 cm, D: 70 cm", ru: "Высота: 100 см, ширина: 60 см, глубина: 70 см" },
      },
      {
        name: { en: "Color", ru: "Цвет" },
        value: { en: "Orange", ru: "Оранжевый" },
      },
      {
        name: { en: "Material", ru: "Материал" },
        value: { en: "Acrylic material with high strength", ru: "Акрил с высокой степенью прочности" },
      },
    ],
    description: {
        en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a soft peach-orange hue. The chair’s construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
        ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного персиково-оранжевого цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле. На английский",
    },
    meta: {
      title: {
        en: "Modern orange glass chair 111",
        ru: "Современный оранжевый стеклянный стул 111",
      },
      description: {
        en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a soft peach-orange hue. The chair’s construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
        ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного персиково-оранжевого цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле. На английский",
      },
    },
    inStock: true,
    enableVariants: false,
    relatedProducts: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    slug: "modern-violet-glass-table-032",
    title: {
      en: "Modern violet glass table 032",
      ru: "Современный фиолетовый стеклянный стол 032",
    },
    price: {
      rub: 23000,
      usd: 259,
    },
    images: [
      {
        id: 1,
        url: "/images/product_3-1.webp",
        alt: {
          en: "Modern violet glass table 032",
          ru: "Фиолетовый стеклянный стол 032",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    category: CATEGORIES[1],
    characteristics: [
      {
        name: { en: "Color", ru: "Цвет" },
        value: { en: "Violet", ru: "Фиолетовый" },
      },
    ],
    meta: {
      title: {
        en: "Modern violet glass table 032",
        ru: "Современный фиолетовый стеклянный стол 032",
      },
      description: {
        en: "The Modern Violet Glass Table 032 is a sleek modern table.",
        ru: "Современный стеклянный стол в фиолетовом исполнении.",
      },
    },
    inStock: true,
    enableVariants: false,
    relatedProducts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    slug: "modern-rose-glass-bath-132",
    title: {
      en: "Modern rose glass bath 132",
      ru: "Современная розовая стеклянная ванна 132",
    },
    price: {
      rub: 93000,
      usd: 999,
      // EUR: 959,
    },
    images: [
      {
        id: 1,
        url: "/images/product_4.png",
        alt: {
          en: "Modern rose glass bath 132",
          ru: "Розовая стеклянная ванна 132",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],

    category: CATEGORIES[3],
    characteristics: [
      {
        name: { en: "Color", ru: "Цвет" },
        value: { en: "Rose", ru: "Розовый" },
      },
      {
        name: { en: "Material", ru: "Материал" },
        value: { en: "Glass", ru: "Тонированное стекло" },
      },
    ],
    meta: {
      title: {
        en: "Modern rose glass bath 132",
        ru: "Современная розовая стеклянная ванна 132",
      },
      description: {
        en: "A luxury rose glass bath with a modern design.",
        ru: "Роскошная стеклянная ванна в розовом цвете.",
      },
    },
    inStock: true,
    enableVariants: false,
    relatedProducts: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    slug: "modern-red-glass-lamp-004",
    title: {
      en: "Modern red glass lamp 004",
      ru: "Современная красная стеклянная лампа 004",
    },
    price: {
      rub: 9000,
      usd: 100,
      // EUR: 119,
    },
    images: [
      {
        id: 1,
        url: "/images/product_5-1.webp",
        alt: {
          en: "Modern red glass lamp 004",
          ru: "Красная стеклянная лампа 004",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    category: CATEGORIES[2],
    characteristics: [
      {
        name: { en: "Color", ru: "Цвет" },
        value: { en: "Red", ru: "Красный" },
      },
    ],

    meta: {
      title: {
        en: "Modern red glass lamp 004",
        ru: "Современная оранжевая стеклянная лампа 004",
      },
      description: {
        en: "A sleek modern lamp made of red glass.",
        ru: "Современная лампа из красного стекла.",
      },
    },

    inStock: true,
    enableVariants: false,
    relatedProducts: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    slug: "modern-orange-glass-lamp-004",
    title: {
      en: "Modern orange glass lamp 004",
      ru: "Современная оранжевая стеклянная лампа 004",
    },
    price: {
      rub: 11000,
      usd: 129,
      // EUR: 119,
    },
    images: [
      {
        id: 1,
        url: "/images/product_6.png",
        alt: {
          en: "Modern orange glass lamp 004",
          ru: "Оранжевая стеклянная лампа 004",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    category: CATEGORIES[2],
    characteristics: [
      {
        name: { en: "Color", ru: "Цвет" },
        value: { en: "Orange", ru: "Оранжевый" },
      },
    ],

    meta: {
      title: {
        en: "Modern orange glass lamp 004",
        ru: "Современная оранжевая стеклянная лампа 004",
      },
      description: {
        en: "A sleek modern lamp made of orange glass.",
        ru: "Современная лампа из оранжевого стекла.",
      },
    },

    inStock: true,
    enableVariants: false,
    relatedProducts: [],

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];


// export const PRODUCTS: Product[] = [
//   {
//     id: 1,
//     slug: "modern-glass-chair-103",
//     price: 17900,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_1.png",
//         alt: "Modern glass chair 103",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     ],
//     category: CATEGORIES[0],
//     title: {
//       en: "Modern glass chair 103",
//       ru: "Современный стеклянный стул 103",
//     },
//     characteristics: {
//       en: [{ name: "Color", value: "White" }],
//       ru: [{ name: "Цвет", value: "Белый" }],
//     },
//     meta: {
//       en: {
//         title: "Modern glass chair 103",
//         description:
//           "The Modern Glass Chair 103 is a sleek and modern chair.",
//       },
//       ru: {
//         title: "Современный стеклянный стул 103",
//         description:
//           "Современный стеклянный стул с минималистичным дизайном.",
//       },
//     },
//     updatedAt: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     inStock: true,
//     enableVariants: false,
//     relatedProducts: [],
//   },

//   {
//     id: 2,
//     slug: "modern-orange-glass-chair-104",
//     price: 23000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_2.png",
//         alt: "Modern orange glass chair 111",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     ],
//     category: CATEGORIES[0],
//     title: {
//       en: "Modern orange glass chair 111",
//       ru: "Современный оранжевый стеклянный стул 111",
//     },
//     characteristics: {
//       en: [{ name: "Color", value: "Orange" }],
//       ru: [{ name: "Цвет", value: "Оранжевый" }],
//     },
//     meta: {
//       en: {
//         title: "Modern orange glass chair 111",
//         description:
//           "The Modern Orange Glass Chair 111 is a sleek and modern chair.",
//       },
//       ru: {
//         title: "Современный оранжевый стеклянный стул 111",
//         description:
//           "Современный оранжевый стеклянный стул с минималистичным дизайном.",
//       },
//     },
//     updatedAt: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     inStock: true,
//     enableVariants: false,
//     relatedProducts: [],
//   },

//   {
//     id: 3,
//     slug: "modern-violet-glass-table-032",
//     price: 23000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_3.png",
//         alt: "Modern violet table 032",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     ],
//     category: CATEGORIES[1],
//     title: {
//       en: "Modern violet glass table 032",
//       ru: "Современный фиолетовый стеклянный стол 032",
//     },
//     characteristics: {
//       en: [{ name: "Color", value: "Violet" }],
//       ru: [{ name: "Цвет", value: "Фиолетовый" }],
//     },
//     meta: {
//       en: {
//         title: "Modern violet glass table 032",
//         description:
//           "The Modern Violet Glass Table 032 is a sleek and modern table.",
//       },
//       ru: {
//         title: "Современный фиолетовый стеклянный стол 032",
//         description:
//           "Современный фиолетовый стеклянный стол с минималистичным дизайном.",
//       },
//     },
//     updatedAt: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     inStock: true,
//     enableVariants: false,
//     relatedProducts: [],
//   },

//   {
//     id: 4,
//     slug: "modern-rose-glass-bath-132",
//     price: 93000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_4.png",
//         alt: "Modern rose bath 132",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     ],
//     category: CATEGORIES[3],
//     title: {
//       en: "Modern rose glass bath 132",
//       ru: "Современная розовая стеклянная ванна 132",
//     },
//     characteristics: {
//       en: [{ name: "Color", value: "Rose" }],
//       ru: [{ name: "Цвет", value: "Розовый" }],
//     },
//     meta: {
//       en: {
//         title: "Modern rose glass bath 132",
//         description:
//           "The Modern Glass Bath 132 is a sleek and modern bath.",
//       },
//       ru: {
//         title: "Современная розовая стеклянная ванна 132",
//         description:
//           "Современная стеклянная ванна с минималистичным дизайном.",
//       },
//     },
//     updatedAt: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     inStock: true,
//     enableVariants: false,
//     relatedProducts: [],
//   },

//   {
//     id: 5,
//     slug: "modern-orange-glass-lamp-004",
//     price: 11000,
//     images: [
//       {
//         id: 1,
//         url: "/images/product_6.png",
//         alt: "Modern orange glass lamp 004",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       },
//     ],
//     category: CATEGORIES[2],
//     title: {
//       en: "Modern orange glass lamp 004",
//       ru: "Современная оранжевая стеклянная лампа 004",
//     },
//     characteristics: {
//       en: [{ name: "Color", value: "Orange" }],
//       ru: [{ name: "Цвет", value: "Оранжевый" }],
//     },
//     meta: {
//       en: {
//         title: "Modern orange glass lamp 004",
//         description:
//           "The Modern Orange Glass Lamp 004 is a sleek and modern lamp.",
//       },
//       ru: {
//         title: "Современная оранжевая стеклянная лампа 004",
//         description:
//           "Современная стеклянная лампа с минималистичным дизайном.",
//       },
//     },
//     updatedAt: new Date().toISOString(),
//     createdAt: new Date().toISOString(),
//     inStock: true,
//     enableVariants: false,
//     relatedProducts: [],
//   },
// ];