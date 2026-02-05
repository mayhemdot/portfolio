import { CATEGORIES } from "@/modules/categories/model/data";
import type { ProductRaw } from "@/modules/products/model/types";

// --- Отдельные экземпляры продуктов ---

const product1: ProductRaw = {
  id: 1,
  slug: "modern-glass-chair-103",
  title: {
    en: "Modern glass chair 103",
    ru: "Современный стеклянный стул 103",
  },
  price: { rub: 17900, usd: 199 },
  images: [
    {
      id: 1,
      url: "/images/product_1-1.webp",
      alt: { en: "Modern glass chair 103", ru: "Современный стеклянный стул 103" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  category: CATEGORIES[0],
  characteristics: [
    { name: { en: "Dimensions", ru: "Размеры" }, value: { en: "H: 140 cm, W: 60 cm, D: 70 cm", ru: "Высота: 140 см, ширина: 60 см, глубина: 70 см" } },
    { name: { en: "Color", ru: "Цвет" }, value: { en: "White", ru: "Белый" } },
    { name: { en: "Material", ru: "Материал" }, value: { en: "Acrylic material with high strength", ru: "Акрил с высокой прочностью" } },
  ],
  description: {
    en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a vibrant red hue. The chair's construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
    ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного красного цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле.",
  },
  meta: {
    title: { en: "Modern glass chair 103", ru: "Современный стеклянный стул 103" },
    description: {
      en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a vibrant red hue. The chair's construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
      ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного красного цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле.",
    },
  },
  inStock: true,
  enableVariants: false,
  relatedProducts: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const product2: ProductRaw = {
  id: 2,
  slug: "modern-orange-glass-chair-111",
  title: {
    en: "Modern orange glass chair 111",
    ru: "Современный оранжевый стеклянный стул 111",
  },
  price: { rub: 23000, usd: 249 },
  images: [
    {
      id: 1,
      url: "/images/product_2-1.webp",
      alt: { en: "Modern orange glass chair 111", ru: "Оранжевый стеклянный стул 111" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  category: CATEGORIES[0],
  characteristics: [
    { name: { en: "Dimensions", ru: "Размеры" }, value: { en: "H: 100 cm, W: 60 cm, D: 70 cm", ru: "Высота: 100 см, ширина: 60 см, глубина: 70 см" } },
    { name: { en: "Color", ru: "Цвет" }, value: { en: "Orange", ru: "Оранжевый" } },
    { name: { en: "Material", ru: "Материал" }, value: { en: "Acrylic material with high strength", ru: "Акрил с высокой степенью прочности" } },
  ],
  description: {
    en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a soft peach-orange hue. The chair's construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
    ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного персиково-оранжевого цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле.",
  },
  meta: {
    title: { en: "Modern orange glass chair 111", ru: "Современный оранжевый стеклянный стул 111" },
    description: {
      en: "This is a designer chair in a modern minimalist style. It is made from a semi-transparent material in a soft peach-orange hue. The chair's construction is defined by smooth, rounded forms: the seat features a thick, curved edge, while the legs are formed by two arched lines that create a sense of lightness and movement. Owing to its unusual shape and material, the chair appears both sculptural and functional—it resembles an art object more than a traditional piece of furniture. This chair would be an ideal addition to a contemporary interior in a minimalist, high-tech, or futuristic style.",
      ru: "Это дизайнерское кресло в современном минималистском стиле. Оно выполнено из полупрозрачного материала нежного персиково-оранжевого цвета. Конструкция стула отличается плавными, округлыми формами: сиденье имеет толстый изогнутый край, а ножки образованы двумя дугообразными линиями, которые создают впечатление легкости и подвижности. Благодаря своей необычной форме и материалу, стул выглядит одновременно скульптурным и функциональным — он больше напоминает арт-объект, чем традиционную мебель. Этот стул станет идеальным дополнением к современному интерьеру в стиле минимализма, хай-тек или футуристическом стиле.",
    },
  },
  inStock: true,
  enableVariants: false,
  relatedProducts: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const product3: ProductRaw = {
  id: 3,
  slug: "modern-violet-glass-table-032",
  title: {
    en: "Modern violet glass table 032",
    ru: "Современный фиолетовый стеклянный стол 032",
  },
  price: { rub: 23000, usd: 259 },
  images: [
    {
      id: 1,
      url: "/images/product_3-1.webp",
      alt: { en: "Modern violet glass table 032", ru: "Фиолетовый стеклянный стол 032" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  category: CATEGORIES[1],
  characteristics: [
    { name: { en: "Color", ru: "Цвет" }, value: { en: "Violet", ru: "Фиолетовый" } },
  ],
  description: {
    en: "This is a designer side table with a clear geometric form, made of a semi-transparent glossy material in a rich purple-berry shade",
    ru: "Это дизайнерский столик с чёткой геометрической формой, выполненный из полупрозрачного глянцевого материала насыщенного фиолетово-ягодного оттенка",
  },
  meta: {
    title: { en: "Modern violet glass table 032", ru: "Современный фиолетовый стеклянный стол 032" },
    description: {
      en: "This is a designer side table with a clear geometric form, made of a semi-transparent glossy material in a rich purple-berry shade",
      ru: "Это дизайнерский столик с чёткой геометрической формой, выполненный из полупрозрачного глянцевого материала насыщенного фиолетово-ягодного оттенка",
    },
  },
  inStock: true,
  enableVariants: false,
  relatedProducts: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const product4: ProductRaw = {
  id: 4,
  slug: "modern-rose-glass-bath-132",
  title: {
    en: "Modern rose glass bath 132",
    ru: "Современная розовая стеклянная ванна 132",
  },
  price: { rub: 93000, usd: 999 },
  images: [
    {
      id: 1,
      url: "/images/product_4.png",
      alt: { en: "Modern rose glass bath 132", ru: "Розовая стеклянная ванна 132" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  category: CATEGORIES[3],
  characteristics: [
    { name: { en: "Color", ru: "Цвет" }, value: { en: "Rose", ru: "Розовый" } },
    { name: { en: "Material", ru: "Материал" }, value: { en: "Glass", ru: "Тонированное стекло" } },
  ],
  meta: {
    title: { en: "Modern rose glass bath 132", ru: "Современная розовая стеклянная ванна 132" },
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
};

const product5: ProductRaw = {
  id: 5,
  slug: "modern-red-glass-lamp-004",
  title: {
    en: "Modern red glass lamp 004",
    ru: "Современная красная стеклянная лампа 004",
  },
  price: { rub: 9000, usd: 100 },
  images: [
    {
      id: 1,
      url: "/images/product_5-1.webp",
      alt: { en: "Modern red glass lamp 004", ru: "Красная стеклянная лампа 004" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  category: CATEGORIES[2],
  characteristics: [
    { name: { en: "Color", ru: "Цвет" }, value: { en: "Red", ru: "Красный" } },
  ],
  description: {
    en: "This is a designer table lamp with a pronounced sculptural character, designed as a rectangular block with horizontal textured segments that create a layered effect.",
    ru: "Это дизайнерская настольная лампа с ярко выраженным скульптурным характером, выполненная в виде прямоугольного блока с горизонтальными рельефными сегментами, создающими эффект слоёв",
  },
  meta: {
    title: { en: "Modern red glass lamp 004", ru: "Современная оранжевая стеклянная лампа 004" },
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
};

const product6: ProductRaw = {
  id: 6,
  slug: "modern-orange-glass-lamp-004",
  title: {
    en: "Modern orange glass lamp 004",
    ru: "Современная оранжевая стеклянная лампа 004",
  },
  price: { rub: 11000, usd: 129 },
  images: [
    {
      id: 1,
      url: "/images/product_6.png",
      alt: { en: "Modern orange glass lamp 004", ru: "Оранжевая стеклянная лампа 004" },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  description: { en: "", ru: "" },
  category: CATEGORIES[2],
  characteristics: [
    { name: { en: "Color", ru: "Цвет" }, value: { en: "Orange", ru: "Оранжевый" } },
  ],
  meta: {
    title: { en: "Modern orange glass lamp 004", ru: "Современная оранжевая стеклянная лампа 004" },
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
};

// --- Массив продуктов с relatedProducts по категории и цвету ---
// Белый стул (1): та же категория — стулья → оранжевый стул (2)
// Оранжевый стул (2): та же категория — стулья → белый стул (1); тот же цвет — оранжевая лампа (6)
// Фиолетовый стол (3): одна в категории «столы», того же цвета нет
// Розовая ванна (4): одна в «другие», того же цвета нет
// Красная лампа (5): та же категория — лампы → оранжевая лампа (6)
// Оранжевая лампа (6): та же категория — лампы → красная лампа (5); тот же цвет — оранжевый стул (2)

product1.relatedProducts = [product2.id];
product2.relatedProducts = [product1.id, product6.id];
product3.relatedProducts = [];
product4.relatedProducts = [];
product5.relatedProducts = [product6.id];
product6.relatedProducts = [product5.id, product2.id];

export const PRODUCTS: ProductRaw[] = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
];
