"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DynamicMapWrapper from "./dinamyc-map-wraper"
import FilterSheet from "./filter-sheet"

// Datos de ejemplo para incidentes
const MOCK_INCIDENTS = [
  { id: 1, type: "robo", lat: -9.29713745, lng: -76.00895578, description: "Robo de celular", time: "Hace 30 min" },
  {
    id: 2,
    type: "sospechoso",
    lat: -9.29442694,
    lng: -75.99689484,
    description: "Persona sospechosa",
    time: "Hace 1 hora",
  },
  {
    id: 3,
    type: "emergencia",
    lat: -9.30120318,
    lng: -75.99775314,
    description: "Accidente de tránsito",
    time: "Hace 2 horas",
  },
]
const tingoMariaPosition: [number, number] = [-9.2970, -76.0079];

export function IncidentMap({ haveTitle }: { haveTitle: boolean }) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null)
  const [incidents, setIncidents] = useState([])

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

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incident');
      if (!response.ok) {
        throw new Error('Error al cargar incidentes');
      }
      const data = await response.json();
      console.log("Incidentes del api en el front", data)
      setIncidents(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return (
    <Card className="card-mapa h-full flex flex-col">
      <CardHeader className="pb-2 relative">
        {haveTitle && (
          <CardTitle className="flex items-center justify-between">
            <span>Mapa de Incidentes</span>
            <Badge variant="outline" className="ml-2">
              En vivo
            </Badge>
          </CardTitle>
        )}
        <CardDescription>Visualiza incidentes reportados en tu zona</CardDescription>
        <div className="absolute top-0 right-6">
          <FilterSheet />
        </div>
      </CardHeader>

      <CardContent className="contendido-mapa grow">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center bg-muted rounded-md">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Cargando mapa...</p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full bg-slate-100 rounded-md overflow-hidden">
            {/* Aquí iría la integración real con Mapbox o Google Maps */}

            <DynamicMapWrapper incidents={incidents} initialPosition={tingoMariaPosition} />


            {/* Marcador de usuario */}


            {/* Marcadores de incidentes */}


            {/* Controles del mapa */}


            {/* Leyenda */}
            <div className="absolute bottom-2 right-2 bg-white/80 p-2 rounded text-xs">
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
