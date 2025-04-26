"use client"

import type React from "react"

import { useState } from "react"
import { EyeOff, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export function AnonymousReport() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [includeLocation, setIncludeLocation] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del reporte anónimo
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Denuncia anónima enviada",
        description: "Tu denuncia ha sido enviada de forma anónima. Gracias por tu colaboración.",
      })

      // Resetear el formulario
      const form = e.target as HTMLFormElement
      form.reset()
      setIncludeLocation(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <EyeOff className="mr-2 h-4 w-4" />
          Denuncia Anónima
        </CardTitle>
        <CardDescription>Tu identidad permanecerá protegida</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Tipo de denuncia</Label>
            <Select required>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="drogas">Venta de drogas</SelectItem>
                <SelectItem value="corrupcion">Corrupción</SelectItem>
                <SelectItem value="organizacion">Organización criminal</SelectItem>
                <SelectItem value="trafico">Tráfico de personas</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="anonymous-description">Descripción detallada</Label>
            <Textarea
              id="anonymous-description"
              placeholder="Describe la situación con el mayor detalle posible..."
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location-description">Ubicación aproximada</Label>
            <Input
              id="location-description"
              placeholder="Ej: Cerca de la plaza principal, Av. Las Flores 123..."
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="include-location" checked={includeLocation} onCheckedChange={setIncludeLocation} />
            <Label htmlFor="include-location">Incluir mi ubicación actual (solo autoridades tendrán acceso)</Label>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>Tu denuncia es completamente anónima. No se guardará información que pueda identificarte.</p>
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
                Enviar denuncia anónima
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
