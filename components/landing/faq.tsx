import { Section, SectionIntro } from "@/components/design-system"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    value: "trial",
    question: "Do I need a credit card to start?",
    answer:
      "No. The free trial starts without a card. You can add billing later if you choose a paid plan.",
  },
  {
    value: "shops",
    question: "Can I manage more than one shop?",
    answer:
      "Yes. Growth covers up to five shops, and Enterprise is for larger chains. Each shop stays under one business dashboard.",
  },
  {
    value: "staff",
    question: "Can my staff use it without seeing everything?",
    answer:
      "Owners invite cashiers and managers with their own logins. Each role only sees the screens they need.",
  },
  {
    value: "billing",
    question: "Does it handle GST invoices?",
    answer:
      "You can create bills with tax lines and download summaries that match how shops already file GST.",
  },
  {
    value: "import",
    question: "Can I bring products from a spreadsheet?",
    answer:
      "Yes. Export your current sheet and import products so you do not retype the catalog by hand.",
  },
  {
    value: "cancel",
    question: "What happens if I cancel?",
    answer:
      "You can export your bills, customers, and stock before the subscription ends. Trial accounts stay free until the trial date.",
  },
]

export function Faq() {
  const midpoint = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)]

  return (
    <Section id="faq" tone="surface">
        <SectionIntro title="Got Questions? We've Got Answers." />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <Accordion key={columnIndex} className="w-full">
              {column.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ))}
        </div>
    </Section>
  )
}
