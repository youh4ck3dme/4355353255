
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
             <AccordionItem key={item.id} value={item.id} className="border-b border-white/10 dark:border-brand-bright-green/20">
                <AccordionTrigger className="text-lg text-left font-semibold text-white dark:text-brand-bright-green hover:text-brand-bright-green dark:hover:text-white hover:no-underline">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-300 dark:text-brand-light-gray">
                   {item.answer}
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  )
}
