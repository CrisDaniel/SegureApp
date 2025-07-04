import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BellIcon, CircleAlertIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={'icon'} className="h-9 w-9 shrink-0 ml-auto"><BellIcon /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <div className="grid">
          <div className="p-4">
            <h4 className="leading-none font-medium">Notificaciones</h4>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 hover:bg-accent p-4">
              <div>
                <CircleAlertIcon />
              </div>
              <div>
                <p className="text-sm"><span className="text-primary">Romulo Cordova</span> a activado su alerta de panico pregunte si requiere ayuda</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 hover:bg-accent p-4">
              <div>
                <CircleAlertIcon />
              </div>
              <div>
                <p className="text-sm">Uno de sus contactos  a reportado un incidente</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>

              </div>
            </div>
            <div className="flex items-center gap-4 hover:bg-accent p-4">
              <div>
                <CircleAlertIcon />
              </div>
              <div>
                <p className="text-sm">Se a reportado un robo muy aproximadamente a 100 metros de su ubicacion</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>

              </div>
            </div>
            <div className="flex items-center gap-4 hover:bg-accent p-4">
              <div>
                <CircleAlertIcon />
              </div>
              <div>
                <p className="text-sm">Alerta de reportes</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>

              </div>
            </div>
            <div className="flex items-center gap-4 hover:bg-accent p-4">
              <div>
                <CircleAlertIcon />
              </div>
              <div>
                <p className="text-sm">Alerta de contactos</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>

              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
