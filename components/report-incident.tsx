"use client"

import type React from "react"

import { useState } from "react"
import { Camera, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export function ReportIncident() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const [hasPhoto, setHasPhoto] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del reporte
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Reporte enviado",
        description: "Tu reporte ha sido enviado correctamente. Gracias por contribuir a la seguridad de tu comunidad.",
      })

      // Resetear el formulario
      const form = e.target as HTMLFormElement
      form.reset()
      setHasLocation(false)
      setHasPhoto(false)
    }, 1500)
  }

  const getLocation = () => {
    // Simular obtención de ubicación
    setHasLocation(true)
    toast({
      title: "Ubicación obtenida",
      description: "Se ha capturado tu ubicación actual.",
    })
  }

  const addPhoto = () => {
    // Simular carga de foto
    setHasPhoto(true)
    toast({
      title: "Foto añadida",
      description: "Se ha añadido la foto al reporte.",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Reportar Incidente</CardTitle>
        <CardDescription>Informa sobre situaciones sospechosas o emergencias</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="incident-type">Tipo de incidente</Label>
            <Select required>
              <SelectTrigger id="incident-type">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="robo">Robo</SelectItem>
                <SelectItem value="sospechoso">Actividad sospechosa</SelectItem>
                <SelectItem value="vandalismo">Vandalismo</SelectItem>
                <SelectItem value="accidente">Accidente</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe lo que está ocurriendo..."
              required
              className="min-h-[80px]"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant={hasLocation ? "default" : "outline"}
              className="flex-1"
              onClick={getLocation}
            >
              <MapPin className="mr-2 h-4 w-4" />
              {hasLocation ? "Ubicación añadida" : "Añadir ubicación"}
            </Button>

            <Button type="button" variant={hasPhoto ? "default" : "outline"} className="flex-1" onClick={addPhoto}>
              <Camera className="mr-2 h-4 w-4" />
              {hasPhoto ? "Foto añadida" : "Añadir foto"}
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar reporte
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
