"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DynamicMapWrapper from "./dinamyc-map-wraper"

// Datos de ejemplo para incidentes
const MOCK_INCIDENTS = [
  { id: 1, type: "robo", lat: -12.046374, lng: -77.042793, description: "Robo de celular", time: "Hace 30 min" },
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

export function IncidentMap({haveTitle}: {haveTitle: boolean}) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null)

  useEffect(() => {
    // Simular carga del mapa y obtener ubicación del usuario
    const timer = setTimeout(() => {
      setUserLocation({ lat: -12.046374, lng: -77.042793 })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getIncidentColor = (type: string) => {
    switch (type) {
      case "robo":
        return "bg-red-500"
      case "sospechoso":
        return "bg-yellow-500"
      case "emergencia":
        return "bg-purple-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <Card>
      
      <CardHeader className="pb-2">
        {haveTitle && (
        <CardTitle className="flex items-center justify-between">
          <span>Mapa de Incidentes</span>
          <Badge variant="outline" className="ml-2">
            En vivo
          </Badge>
        </CardTitle>
        )}
        <CardDescription>Visualiza incidentes reportados en tu zona</CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="h-[300px] w-full flex items-center justify-center bg-muted rounded-md">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Cargando mapa...</p>
            </div>
          </div>
        ) : (
          <div className="relative h-[300px] w-full bg-slate-100 rounded-md overflow-hidden">
            {/* Aquí iría la integración real con Mapbox o Google Maps */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center opacity-50">
              <DynamicMapWrapper incidents={MOCK_INCIDENTS} initialPosition={tingoMariaPosition} />
            </div>

            {/* Marcador de usuario */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-blue-500 rounded-full absolute -left-2 -top-2 opacity-20 animate-ping"></div>
            </div>

            {/* Marcadores de incidentes */}
            {MOCK_INCIDENTS.map((incident) => (
              <div
                key={incident.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${40 + Math.random() * 60}%`,
                  top: `${30 + Math.random() * 50}%`,
                }}
                onClick={() => setSelectedIncident(incident.id === selectedIncident ? null : incident.id)}
              >
                <div className={`h-3 w-3 ${getIncidentColor(incident.type)} rounded-full`}></div>

                {selectedIncident === incident.id && (
                  <div className="absolute z-10 bg-white p-2 rounded shadow-lg text-xs w-40 -left-20 -top-20">
                    <div className="font-bold">{incident.type.toUpperCase()}</div>
                    <div>{incident.description}</div>
                    <div className="text-muted-foreground">{incident.time}</div>
                  </div>
                )}
              </div>
            ))}

            {/* Controles del mapa */}
            <div className="absolute bottom-2 right-2 flex flex-col gap-2">
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <MapPin className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <span className="text-lg">+</span>
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <span className="text-lg">-</span>
              </Button>
            </div>

            {/* Leyenda */}
            <div className="absolute top-2 left-2 bg-white/80 p-2 rounded text-xs">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <span>Robo</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <span>Sospechoso</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span>Emergencia</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
