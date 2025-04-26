"use client"

import { useState } from "react"
import { AlertTriangle, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function PanicButton() {
  const { toast } = useToast()
  const [isActivated, setIsActivated] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [open, setOpen] = useState(false)

  const handlePanicButton = () => {
    setOpen(true)
  }

  const activateEmergency = () => {
    setIsActivated(true)
    setOpen(false)

    // Simular envío de alerta a serenazgo y contactos de emergencia
    toast({
      title: "Alerta enviada",
      description: "Se ha notificado a serenazgo y tus contactos de emergencia",
      variant: "destructive",
    })

    // En una implementación real, aquí se enviaría la ubicación a los servicios de emergencia
  }

  const cancelEmergency = () => {
    setIsActivated(false)
    toast({
      title: "Alerta cancelada",
      description: "La alerta de emergencia ha sido cancelada",
    })
  }

  return (
    <>
      <Card className={isActivated ? "border-red-500 bg-red-50" : ""}>
        <CardHeader className="pb-2">
          <CardTitle>Botón de Pánico</CardTitle>
          <CardDescription>Activa en caso de emergencia para alertar a serenazgo y contactos</CardDescription>
        </CardHeader>
        <CardContent>
          {isActivated ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="h-12 w-12 text-white" />
                </div>
              </div>
              <p className="text-red-600 font-bold mb-2">¡ALERTA ACTIVADA!</p>
              <p className="text-sm mb-4">
                Se ha enviado tu ubicación a serenazgo y contactos de emergencia. Mantén la calma, ayuda está en camino.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={cancelEmergency}>
                  <X className="mr-2 h-4 w-4" /> Cancelar alerta
                </Button>
                <Button>
                  <Phone className="mr-2 h-4 w-4" /> Llamar a emergencias
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Button
                size="lg"
                variant="destructive"
                className="h-24 w-24 rounded-full text-lg font-bold"
                onClick={handlePanicButton}
              >
                SOS
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">Presiona solo en caso de emergencia real</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar alerta de emergencia</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas activar la alerta de emergencia? Esto notificará inmediatamente a serenazgo y
              tus contactos de emergencia.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <div className="h-20 w-20 bg-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={activateEmergency}>
              Activar emergencia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
