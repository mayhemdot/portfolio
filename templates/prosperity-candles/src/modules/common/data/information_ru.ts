// import { IAdvantageCardProps } from '@/components/ui/custom/advantage-card/AdvantageCard'

export const advantageCardList: any[] = [
  {
    title: "Без вреда для здоровья",
    description: "В процессе изготовления используют только безопасные компоненты\r\nвысокого качества",
    image: { id: 1, src: "leafs_icon.svg", alt: "", is_banner: false },
  },
  {
    title: "Собственное производство",
    description: "Вся продукция изготавливается и проходит контроль качества\r\nна собственном производстве",
    image: { id: 2, src: "factures_icon.svg", alt: "", is_banner: false },
  },
  {
    title: "Ручная работа",
    description: "Каждый товар сделан с любовью вручную нашими талантливыми\r\nмастерами",
    image: { id: 3, src: "hands_icon.svg", alt: "", is_banner: false },
  },
  {
    title: "Сертификация",
    description: "Наша продукция прошла тестирование в лаборатории имеет\r\nдекларации соответствия",
    image: { id: 4, src: "cert_icon.svg", alt: "", is_banner: false },
  },
];

export const ORDER_STATUS_LIST = [
  { value: "activeOrders", label: "Активные" },
  { value: "canceledOrders", label: "Отмененные" },
  { value: "completedOrders", label: "Выполненные" },
];
