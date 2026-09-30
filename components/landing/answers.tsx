import { Section, SectionIntro } from "@/components/design-system"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const questions = [
  "How much did I sell today?",
  "Which products are running low?",
  "Who owes me money?",
  "What is my profit this month?",
]

const bars = [42, 68, 50, 84, 62, 90, 74]

export function Answers() {
  return (
    <Section>
      <SectionIntro
        title="Your Business Answers, At a Glance"
        description="Open the dashboard and see the numbers that used to take an evening in a spreadsheet."
      />
      <div className="mt-10 grid items-start gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {questions.map((question) => (
            <Card key={question} className="bg-surface shadow-sm">
              <CardContent className="text-sm font-medium text-foreground">
                {question}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="bg-surface shadow-raised">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <p
              data-slot="card-action"
              className="text-sm font-semibold text-foreground"
            >
              ₹7,42,320
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-3">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-chart-1"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <Metric label="Today" value="₹18,450" />
              <Metric label="Low stock" value="12 items" />
              <Metric label="Pending dues" value="₹26,900" />
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-muted px-2 py-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}
