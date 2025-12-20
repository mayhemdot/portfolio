import { avatarIcon } from "./avatarIcon";
import boxesIcon from "./boxesIcon";
import { cartIcon } from "./cartIcon";
import { curveDivider } from "./curve-divider";
import { leftTopGradient } from "./hero-left-top-gradient";
import { homeIcon } from "./homeIcon";
import { logoIcon } from "./icon-logo";
import infoIcon from "./infoIcon";
import { leaf } from "./leaf";
import { leftLiefAnimated } from "./left-leaf-animated";
import locationIcon from "./locationIcon";
import logoutIcon from "./logoutIcon";
import mailIcon from "./mailIcon";
import { packageIcon } from "./packageIcon";
import { rightLiefAnimated } from "./right-leaf-animated";
import smartphoneIcon from "./smartphoneIcon";

export const Icons = {
  logo: logoIcon,
  avatar: avatarIcon,
  cart: cartIcon,
  package: packageIcon,
  home: homeIcon,
  info: infoIcon,
  smartphone: smartphoneIcon,
  mail: mailIcon,
  location: locationIcon,
  boxes: boxesIcon,
  logout: logoutIcon,
};

// Using: type LucideProps or (RefAttributes<SVGSVGElement> && RefSVGProps<SVGSVGElement>)
export const Decor = {
  hero: {
    leftTopGradient,
    leftLiefAnimated,
    rightLiefAnimated,
    curveDivider,
    leaf,
  },
};
