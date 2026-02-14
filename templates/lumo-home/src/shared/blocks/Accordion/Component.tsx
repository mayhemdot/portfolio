export type AccordionBlockProps = {
	introContent: string;
	items: AccordionItemType[];
};

export type AccordionItemType = {
	id: string | number;
	content: string;
	title: string;
};

import { Text } from "@/shared/components/Text";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/shared/components/ui/accordion";

export function AccordionBlock(props: AccordionBlockProps) {
	const { introContent, items } = props;

	return (
		<section className='mb-24'>
			{introContent && (
				<div className='fl-px-16/32 mx-auto  mb-12 max-w-3xl rounded-3xl'>
					<Text
						comp='h1'
						variant={"secondary"}
						size='smd'
						className='ms-0 mt-4 max-w-3xl'
					>
						{introContent}
					</Text>
				</div>
			)}
			<div className='bg-secondary  fl-py-8/16 fl-px-16/32 mx-auto max-w-3xl rounded-3xl'>
				<Accordion type='single' collapsible className='w-full'>
					{items?.map((item, i) => (
						<AccordionItem
							key={item.id || `item-${i}`}
							value={String(item.id) || `item-${i}`}
						>
							<AccordionTrigger>
								<Text
									comp='p'
									size={"sm"}
									weight={"medium"}
									variant={"secondary"}
								>
									{item.title}
								</Text>
							</AccordionTrigger>
							<AccordionContent>
								{item.content && (
									<Text comp='p' variant={"mutedForeground"}>
										{item.content}
									</Text>
								)}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}

{
	/* 
 <AccordionItem value="item-2">
   <AccordionTrigger className="text-lg font-medium">
     What is your return policy?
   </AccordionTrigger>
   <AccordionContent className="text-base text-muted-foreground">
     You can return unworn and unwashed items within 30 days of
     purchase for a full refund or exchange. Please ensure all original
     tags are attached.
   </AccordionContent>
 </AccordionItem>
 <AccordionItem value="item-3">
   <AccordionTrigger className="text-lg font-medium">
     How do I find my size?
   </AccordionTrigger>
   <AccordionContent className="text-base text-muted-foreground">
     Each product page has a detailed size guide to help you choose the
     perfect fit. We recommend measuring yourself and comparing it to
     our chart.
   </AccordionContent>
 </AccordionItem>
 <AccordionItem value="item-4">
   <AccordionTrigger className="text-lg font-medium">
     What payment methods do you accept?
   </AccordionTrigger>
   <AccordionContent className="text-base text-muted-foreground">
     We accept all major credit cards (Visa, Mastercard, American
     Express, Discover), PayPal, and Apple Pay.
   </AccordionContent>
 </AccordionItem>
 <AccordionItem value="item-5">
   <AccordionTrigger className="text-lg font-medium">
     Do you offer gift cards?
   </AccordionTrigger>
   <AccordionContent className="text-base text-muted-foreground">
     Yes, we offer digital gift cards in various denominations. They
     are delivered via email and can be redeemed online at checkout.
   </AccordionContent>
 </AccordionItem> */
}
