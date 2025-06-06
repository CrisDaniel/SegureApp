import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncidentMap } from "@/components/incident-map"
import { PanicButton } from "@/components/panic-button"
import { AlertsList } from "@/components/alerts-list"
import { ReportIncident } from "@/components/report-incident"
import { AnonymousReport } from "@/components/anonymous-report"
import DynamicMapWrapper from "@/components/dinamyc-map-wraper";
import { redirect } from "next/navigation";

export default function Home() {
  const incidents = [
    {
      id: 1,
      type: "robo",
      lat: -12.046374,
      lng: -77.042793,
      description: "Robo de celular",
      time: "Hace 30 min",
    },
    {
      id: 2,
      type: "sospechoso",
      lat: -12.048374,
      lng: -77.045793,
      description: "Persona sospechosa",
      time: "Hace 1 hora",
    },
    {
      id: 3,
      type: "emergencia",
      lat: -12.043374,
      lng: -77.040793,
      description: "Accidente de tránsito",
      time: "Hace 2 horas",
    },
  ]
  const tingoMariaPosition: [number, number] = [-9.2970, -76.0079];
  redirect("/dashboard");
  // return (
  //   <div className="container mx-auto px-4 py-6">
  //     <header className="mb-6">
  //       <h1 className="text-3xl font-bold">Secure App</h1>
  //       <p className="text-muted-foreground">Juntos por una comunidad más segura</p>
  //     </header>

  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //       <div className="md:col-span-2">
  //         <div className="mb-4">
  //           <IncidentMap haveTitle={true}/>
  //           {/* <DynamicMapWrapper incidents={incidents} initialPosition={tingoMariaPosition} /> */}
  //         </div>

  //         <div className="mb-4">
  //           <PanicButton />
  //         </div>
  //       </div>

  //       <div className="space-y-4">
  //         <Tabs defaultValue="alerts" className="w-full">
  //           <TabsList className="grid w-full grid-cols-3">
  //             <TabsTrigger value="alerts">Alertas</TabsTrigger>
  //             <TabsTrigger value="report">Reportar</TabsTrigger>
  //             <TabsTrigger value="anonymous">Anónimo</TabsTrigger>
  //           </TabsList>
  //           <TabsContent value="alerts">
  //             <AlertsList />
  //           </TabsContent>
  //           <TabsContent value="report">
  //             <ReportIncident />
  //           </TabsContent>
  //           <TabsContent value="anonymous">
  //             <AnonymousReport />
  //           </TabsContent>
  //         </Tabs>
  //       </div>
  //     </div>
  //   </div>
  // )
}
