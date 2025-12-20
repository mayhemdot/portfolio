import type { Page } from "@/payload/payload-types";

export type AdvantagesBlockProps = Extract<Page["layout"][0], { blockType: "advantages" }>;
