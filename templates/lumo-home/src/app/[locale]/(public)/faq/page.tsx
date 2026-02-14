import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getLang, type LocaleCode } from "@/i18n/localization";
import { AccordionBlock } from "@/shared/blocks/Accordion/Component";
import { DynamicBreadcrumb } from "@/shared/components/Breadcrumbs";
import { SITE_EMAIL } from "@/shared/utils/constants";

type Args = {
  params: Promise<{
    locale: Locale;
  }>;
};

const BREADCRUMBS = {
  ru: [
    { label: "Главная", url: "/" },
    { label: "Вопросы и ответы", url: "!" },
  ],
  en: [
    { label: "Home", url: "/" },
    { label: "FAQ", url: "!" },
  ],
};

const FAQ_ITEMS: Record<
  "ru" | "en",
  Array<{ id: string; title: string; content: string }>
> = {
  ru: [
    {
      id: "1",
      title: "Какой срок доставки?",
      content:
        "Срок доставки варьируется от выбранной службы.\r\nОриентировочные сроки следующие: от 7 до 14 рабочих дней с момента отправки заказа (срок отправки 1-2 дня, не считая дня поступления заказа);\r\nУказанные сроки являются приблизительными, и могут отличаться как в меньшую, так и в большую сторону в зависимости от удаленности вашего региона",
    },
    {
      id: "2",
      title: "Когда будет собран и отправлен мой заказ?",
      content:
        "Мы прикладываем все возможные силы, чтобы вы как можно быстрее смогли получить заказанный товар.\r\nСрок обработки и отправки заказа, как правило, составляет от одного до двух дней*, не считая дня поступления заказа.",
    },
    {
      id: "3",
      title: "Как отследить свой заказ?",
      content: `Вы сможете отслеживать заказ на всём пути следования.\r\nДля этого, после фактической отправки посылки, мы вышлем вам на эл. почту и в sms-сообщении информацию, содержащую идентификатор (трекинг), а также ссылку на сайт перевозчика для отслеживания.\r\nВ случае, если статус посылки не меняется более одной недели, позвоните в почтовое отделение и уточните, возможно, отправление уже поступило.\r\nЕсли доставку осуществляет курьерская служба, то свяжитесь с ними и уточните статус отправления.`,
    },
    {
      id: "4",
      title: "Что делать, если пришел товар с браком/дефектом?",
      content: `Мы стараемся оперативно решить возникшую проблему.\r\nПожалуйста, напишите нам на ${SITE_EMAIL} письмо, описав проблему, а также приложите несколько фотографий места дефекта. Укажите ваш телефон, он может понадобиться нашим специалистам для оперативной связи.\r\nНам потребуется некоторое время для изучения претензии, но мы сделаем всё возможное, чтобы решить ваш вопрос как можно быстрее.`,
    },
    {
      id: "5",
      title: "Как отменить заказ?",
      content: `Вы можете отменить заказ пока он не передан на отправку или доставку, то есть до или в момент звонка нашего менеджера.\r\nДля этого свяжитесь с нами любым удобным способом, указанным в разделе «Контакты».\r\nВ случае, если доставка осуществляется по городу, вы можете отказаться от заказа в присутствии нашего курьера, при этом необходимо будет оплатить всего лишь доставку — 350 рублей.\r\nВ случае, если вы ожидаете отправленную посылку в регионе, но не сможете ее получить, откажитесь от нее в почтовом отделении или при звонке оператора курьерской службы. После получения возврата, последующие заказы от вас мы будем вынуждены выполнять по 100% предоплате.`,
    },
    {
      id: "6",
      title: "Различаются ли цены на сайте и в магазине?",
      content: `Цены идентичны как в розничном, так и в Интернет-магазине.`,
    },
    {
      id: "7",
      title: "Можно отложить или зарезервировать товар?",
      content: `Если вы увидели товар, который вам понравился, но не планируете его тут же покупать, можете воспользоваться функцией «Избранное». Эта опция не резервирует товар. Она доступна только для зарегистрированных посетителей.`,
    },
    {
      id: "8",
      title:
        "Можно ли оформить индивидуальный заказ на товар, не представленный у вас?",
      content: `Наш магазин не работает с индивидуальными заказами. Актуальные коллекции представлены в нашем розничном и Интернет-магазине.`,
    },
    {
      id: "9",
      title: "Возможно ли оформить заказ по телефону?",
      content: `Вы можете оформить заказ по телефону. Для этого свяжитесь с нами по любому из телефонов в Контактах:\r\n+7 (495) 431-13-30
\r\n+7 (800) 775-28-34\r\nЗвонки принимаются ежедневно с 9:00 до 22:00 по Московскому времени.`,
    },
  ],
  en: [
    {
      id: "1",
      title: "What is the delivery time?",
      content: `Delivery time depends on the selected shipping service.\r\nEstimated delivery time is from 7 to 14 business days from the date the order is shipped (dispatch takes 1–2 days, not including the day the order is placed).\r\nThe stated delivery times are approximate and may vary either shorter or longer depending on the remoteness of your region.`,
    },
    {
      id: "2",
      title: "When will my order be prepared and shipped?",
      content: `We make every effort to ensure that you receive your order as quickly as possible.\r\nThe processing and shipping time usually takes one to two days*, not including the day the order is placed.`,
    },
    {
      id: "3",
      title: "How can I track my order?",
      content: `You can track your order throughout its journey.\r\nAfter the parcel is actually shipped, we will send you by email and SMS the tracking ID and a link to the carrier's website for tracking.\r\nIf the parcel status does not change for more than a week, call the post office to check if the shipment has already arrived.\r\nIf delivery is by a courier service, contact them to check the shipment status.`,
    },
    {
      id: "4",
      title: "What should I do if the product arrived with a defect?",
      content: `We strive to resolve any issue promptly.\r\nPlease email us at ${SITE_EMAIL} describing the problem and attach a few photos of the defect. Include your phone number so our specialists can contact you if needed.\r\nWe will need some time to review your claim, but we will do our best to resolve your issue as quickly as possible.`,
    },
    {
      id: "5",
      title: "How can I cancel my order?",
      content: `You can cancel your order until it has been handed over for shipping or delivery, i.e. before or at the time of our manager's call.\r\nTo do this, contact us by any means listed in the «Contacts» section.\r\nFor in-city delivery, you may refuse the order in the presence of our courier; in that case you will only need to pay for delivery — 350 rubles.\r\nIf you are expecting a shipped parcel in your region but cannot receive it, refuse it at the post office or when the courier service operator calls. After we receive the return, we will have to process your future orders with 100% prepayment.`,
    },
    {
      id: "6",
      title: "Do prices differ on the website and in the store?",
      content: `Prices are the same in both our retail store and our online store.`,
    },
    {
      id: "7",
      title: "Can I put aside or reserve a product?",
      content: `If you like a product but are not planning to buy it right away, you can use the «Wishlist» feature. This option does not reserve the product. It is only available to registered users.`,
    },
    {
      id: "8",
      title:
        "Can I place an individual order for a product not available from you?",
      content: `Our store does not accept individual orders. Current collections are available in our retail and online store.`,
    },
    {
      id: "9",
      title: "Is it possible to place an order by phone?",
      content: `You can place an order by phone. Contact us using any of the numbers in the Contacts section:\r\n+7 (495) 431-13-30\r\n+7 (800) 775-28-34\r\nCalls are accepted daily from 9:00 to 22:00 Moscow time.`,
    },
  ],
};

export default async function FaqPage({ params }: Args) {
  const { locale } = await params;
  const lang = getLang(locale as LocaleCode);
  const t = await getTranslations("FaqPage");

  return (
    <>
      <div className="container mx-auto">
        <DynamicBreadcrumb breadcrumbs={BREADCRUMBS[lang]} />
      </div>
      
      {/* <LowImpactHero>
				<div className='space-y-4 text-center'>
					<Text comp='h1' size='lg' variant='primary'>
						{t("title")}
					</Text>
					<Text comp='p' size='sm' variant='mutedForeground'>
						{t("description")}{" "}
						<Link
							href='/admin'
							className='text-primary underline underline-offset-4 hover:opacity-80'
						>
							{t("adminLink")}
						</Link>{" "}
						{t("descriptionEnd")}
					</Text>
				</div>
			</LowImpactHero> */}
      <div className="container mx-auto">
        <AccordionBlock introContent={t("intro")} items={FAQ_ITEMS[lang]} />
      </div>
    </>
  );
}
