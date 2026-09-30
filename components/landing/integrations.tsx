import { Section, SectionIntro } from "@/components/design-system"
import {
  FileSpreadsheet,
  MessageCircle,
  Printer,
  QrCode,
  Receipt,
  Wallet,
} from "lucide-react"

const tools = [
  { name: "WhatsApp", icon: MessageCircle },
  { name: "Spreadsheets", icon: FileSpreadsheet },
  { name: "UPI", icon: Wallet },
  { name: "Barcode", icon: QrCode },
  { name: "Printers", icon: Printer },
  { name: "GST billing", icon: Receipt },
]

export function Integrations() {
  return (
    <Section id="resources">
      <SectionIntro
        title="Integrate With the Tools You Already Use"
        description="Billing, payments, barcodes, and the apps your counter already depends on."
      />
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tools.map((tool) => (
          <li
            key={tool.name}
            className="flex flex-col items-center gap-2 rounded-xl bg-surface px-3 py-5 text-sm font-medium text-foreground shadow-sm ring-1 ring-border"
          >
            <tool.icon className="size-5 text-primary" />
            {tool.name}
          </li>
        ))}
      </ul>
    </Section>
  )
}
