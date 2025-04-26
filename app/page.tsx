import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncidentMap } from "@/components/incident-map"
import { PanicButton } from "@/components/panic-button"
import { AlertsList } from "@/components/alerts-list"
import { ReportIncident } from "@/components/report-incident"
import { AnonymousReport } from "@/components/anonymous-report"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Seguridad Ciudadana</h1>
        <p className="text-muted-foreground">Juntos por una comunidad más segura</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-4">
            <IncidentMap />
          </div>

          <div className="mb-4">
            <PanicButton />
          </div>
        </div>

        <div className="space-y-4">
          <Tabs defaultValue="alerts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
              <TabsTrigger value="report">Reportar</TabsTrigger>
              <TabsTrigger value="anonymous">Anónimo</TabsTrigger>
            </TabsList>
            <TabsContent value="alerts">
              <AlertsList />
            </TabsContent>
            <TabsContent value="report">
              <ReportIncident />
            </TabsContent>
            <TabsContent value="anonymous">
              <AnonymousReport />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
