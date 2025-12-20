class ServiceLinks {
  private root = "";

  HOME = `${this.root}/`;
  DELIVERY = `${this.root}/delivery`;
  CONTACTS = `${this.root}/contacts`;
  POLITIC = `${this.root}/politic`;
  YANDEX = "https://yandex.ru/maps/2/moscow/?ll=30.234088%2C60.036911&mode=routes&rtext=~60.036800%2C30.234300&rtt=auto&ruri=~&z=16";
  VK = `#`;
  TG = `#`;
}

class UserLinks {
  private root = "";

  REGISTER = `${this.root}/create-account`;
  LOGIN = `${this.root}/login`;
  RESET = `${this.root}/recover-password`;
  ORDERS = `${this.root}/orders`;
  PROFILE = `${this.root}/account`;
}

class BaseLinks {
  private root = "";

  PRODUCT = `${this.root}`;
  CART = `${this.root}/cart`;
  CATALOG = `${this.root}/catalog`;
  THANKS_ORDER = `${this.root}/orders/confirmation`;
  THANKS_RESET_PASSWORD = `${this.root}/thanks/reset`;
}

export const SERVICE_LINKS = new ServiceLinks();
export const ACCOUNT_LINKS = new UserLinks();
export const BASE_LINKS = new BaseLinks();
