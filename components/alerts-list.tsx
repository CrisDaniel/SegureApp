"use client"

import { useState } from "react"
import { Bell, BellOff, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

// Datos de ejemplo para alertas
const MOCK_ALERTS = [
  {
    id: 1,
    type: "emergencia",
    title: "Accidente de tránsito",
    description: "Accidente en Av. Principal con Calle Los Pinos. Tráfico congestionado.",
    time: "Hace 10 min",
    zone: "Centro",
  },
  {
    id: 2,
    type: "sospechoso",
    title: "Actividad sospechosa",
    description: "Personas desconocidas merodeando en la zona residencial de Las Flores.",
    time: "Hace 30 min",
    zone: "Las Flores",
  },
  {
    id: 3,
    type: "robo",
    title: "Robo reportado",
    description: "Robo de celular en paradero de buses. Precaución al transitar por la zona.",
    time: "Hace 1 hora",
    zone: "Comercial",
  },
  {
    id: 4,
    type: "informacion",
    title: "Corte de energía programado",
    description: "Mañana de 9am a 12pm habrá corte de energía en el sector norte.",
    time: "Hace 2 horas",
    zone: "Norte",
  },
  {
    id: 5,
    type: "emergencia",
    title: "Incendio controlado",
    description: "Bomberos controlaron incendio en local comercial. No se reportan heridos.",
    time: "Hace 3 horas",
    zone: "Comercial",
  },
]

export function AlertsList() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [filter, setFilter] = useState("all")

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "emergencia":
        return "destructive"
      case "sospechoso":
        return "warning"
      case "robo":
        return "destructive"
      case "informacion":
        return "secondary"
      default:
        return "default"
    }
  }

  const filteredAlerts = filter === "all" ? alerts : alerts.filter((alert) => alert.type === filter)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-4 w-4" />
            Alertas
          </CardTitle>
          <Badge variant="outline">{alerts.length} nuevas</Badge>
        </div>
        <CardDescription>Alertas y notificaciones de tu zona</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 py-2 bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button
                variant={filter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className="h-7 text-xs"
              >
                Todas
              </Button>
              <Button
                variant={filter === "emergencia" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("emergencia")}
                className="h-7 text-xs"
              >
                Emergencias
              </Button>
              <Button
                variant={filter === "robo" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("robo")}
                className="h-7 text-xs"
              >
                Robos
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
                size="sm"
              />
              <Label htmlFor="notifications" className="text-xs">
                {notificationsEnabled ? <Bell className="h-3 w-3" /> : <BellOff className="h-3 w-3" />}
              </Label>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[300px]">
          {filteredAlerts.length > 0 ? (
            <div className="divide-y">
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className="p-3 hover:bg-muted/50">
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant={getAlertBadgeVariant(alert.type)}>{alert.type.toUpperCase()}</Badge>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{alert.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      Zona: {alert.zone}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      <Info className="h-3 w-3 mr-1" /> Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <BellOff className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">No hay alertas</p>
              <p className="text-xs text-muted-foreground">No hay alertas activas para mostrar en este momento</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm">
          Ver historial
        </Button>
        <Button size="sm">Configurar alertas</Button>
      </CardFooter>
    </Card>
  )
}
