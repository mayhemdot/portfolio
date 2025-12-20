import type { Page } from "@/payload/payload-types";

export type WorkflowBlockProps = Extract<Page["layout"][0], { blockType: "workflow" }>;
