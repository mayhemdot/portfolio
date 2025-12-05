import type React from "react";

// // import type { Page } from "@/payload-types"

// import { HighImpactHero } from "@/payload/heros/HighImpact";
// import { LowImpactHero } from "@/payload/heros/LowImpact";
// // import { MainHero } from "@/payload/heros/MainHero";
// import { MediumImpactHero } from "@/payload/heros/MediumImpact";

// const heroes = {
//   highImpact: HighImpactHero,
//   lowImpact: LowImpactHero,
//   mediumImpact: MediumImpactHero,
// //   mainHero: MainHero,
// };

// export const RenderHero: React.FC<any> = (props) => {
//   const { type } = props || {};

//   if (!type || type === "none") return null;

//   const HeroToRender = heroes[type];

//   if (!HeroToRender) return null;

//   return <HeroToRender {...props} />;
// };
