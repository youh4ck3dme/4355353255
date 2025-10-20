
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import GlassCard from './GlassCard';

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
    <GlassCard>
      <div className="p-4 sm:p-8">
        <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
                 <AccordionItem key={item.id} value={item.id} className="border-b border-white/10 last:border-b-0">
                    <AccordionTrigger className="text-lg text-left font-semibold text-white hover:text-brand-bright-green hover:no-underline">
                        {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-slate-300">
                       {item.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </GlassCard>
  )
}
