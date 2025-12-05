import { isEmpty } from "./isEmpty";

type ConvertToLocaleParams = {
	amount: number;
	currency_code?: string;
	locale?: string;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
};

/**
 * Определяет валюту на основе locale
 * Маппинг: locale (страна) -> валюта
 */
const getCurrencyFromLocale = (locale: string): string => {
	if (!locale || !locale.includes("-")) {
		return "usd"; // По умолчанию USD
	}

	const countryCode = locale.split("-")[1]?.toLowerCase();

	// Маппинг стран на валюты
	const countryToCurrency: Record<string, string> = {
		ru: "rub",
		us: "usd",
		gb: "gbp", // Для UK можно добавить позже
		fr: "eur",
		de: "eur",
		it: "eur",
		es: "eur",
	};

	return countryToCurrency[countryCode] || "usd";
};

/**
 * Определяет локаль форматирования на основе валюты
 */
const getFormatLocaleForCurrency = (
	currencyCode: string,
	locale: string
): string => {
	const normalizedCode = currencyCode.toLowerCase();

	switch (normalizedCode) {
		case "rub":
			return "ru-RU";
		case "usd":
			return "en-US";
		case "eur":
			// Используем переданную локаль или немецкую для EUR
			return locale?.startsWith("de") ||
				locale?.startsWith("fr") ||
				locale?.startsWith("it") ||
				locale?.startsWith("es")
				? locale
				: "de-DE";
		default:
			return locale || "en-US";
	}
};

/**
 * Форматирует цену с учетом локали и валюты
 */
export const convertToLocale = ({
	amount,
	currency_code,
	locale,
	minimumFractionDigits,
	maximumFractionDigits,
}: ConvertToLocaleParams) => {
	// Определяем валюту: если передана явно, используем её
	// Если есть locale, определяем из него, иначе пытаемся определить из currency_code
	let currency = currency_code?.toLowerCase();
	let formatLocale = locale;

	if (!currency && locale) {
		currency = getCurrencyFromLocale(locale);
	} else if (!currency) {
		// Если нет ни locale, ни currency_code, используем USD по умолчанию
		currency = "usd";
		formatLocale = "en-US";
	}

	if (!currency || isEmpty(currency)) {
		return amount.toString();
	}

	const normalizedCurrency = currency.toLowerCase();

	// Если locale не передан, определяем его из валюты
	if (!formatLocale) {
		formatLocale = getFormatLocaleForCurrency(normalizedCurrency, "en-US");
	} else {
		formatLocale = getFormatLocaleForCurrency(normalizedCurrency, formatLocale);
	}

	// Для рублей используем кастомное форматирование с символом после числа
	if (normalizedCurrency === "rub") {
		const formatter = new Intl.NumberFormat("ru-RU", {
			style: "decimal",
			minimumFractionDigits: minimumFractionDigits ?? 0,
			maximumFractionDigits: maximumFractionDigits ?? 0,
			useGrouping: true,
		});

		const formattedNumber = formatter.format(amount);
		return `${formattedNumber} ₽`;
	}

	// Для долларов - символ перед числом
	if (normalizedCurrency === "usd") {
		const formatter = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: minimumFractionDigits ?? 0,
			maximumFractionDigits: maximumFractionDigits ?? 0,
		});
		return formatter.format(amount);
	}

	// Для евро - символ после числа с пробелами между тысячами
	if (normalizedCurrency === "eur") {
		const formatter = new Intl.NumberFormat(formatLocale, {
			style: "decimal",
			minimumFractionDigits: minimumFractionDigits ?? 0,
			maximumFractionDigits: maximumFractionDigits ?? 0,
			useGrouping: true,
		});

		const formattedNumber = formatter.format(amount);
		return `${formattedNumber} €`;
	}

	// Для остальных валют используем стандартное форматирование
	return new Intl.NumberFormat(formatLocale, {
		style: "currency",
		currency: currency.toUpperCase(),
		minimumFractionDigits: minimumFractionDigits ?? 0,
		maximumFractionDigits: maximumFractionDigits ?? 0,
	}).format(amount);
};
