import { Button } from "@/components/ui/button"
import { BellIcon, CircleAlertIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotificationStore } from "@/stores/notification-store"

function calculateTimeAgo(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) return `${days} días`
  if (hours > 0) return `${hours} horas`
  if (minutes > 0) return `${minutes} minutos`
  return `${seconds} segundos`
}

export function NotificationMenu() {
  const { notifications } = useNotificationStore()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={'icon'} className="h-9 w-9 shrink-0 ml-auto">
          <BellIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuGroup>

          {notifications.map((notification)=>{
            return (
              <DropdownMenuItem className="flex items-center gap-2">
                <CircleAlertIcon />
                <div className="flex gap-2 flex-col">
                  <p><span className="text-primary">{notification?.sender?.name}</span> {notification.message}</p>
                  <p className="text-xs text-muted-foreground">Hace {calculateTimeAgo(new Date(notification.createdAt))}</p>
                </div>
              </DropdownMenuItem>
            )
          })}
          {/* <DropdownMenuItem className="flex items-center gap-2">
            <CircleAlertIcon />
            <div className="flex gap-2 flex-col">
                <p><span className="text-primary">Romulo Cordova</span> a activado su alerta de panico pregunte si requiere ayuda.</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <CircleAlertIcon />
            <div className="flex gap-2 flex-col">
                <p>Se a reportado un <span className="text-primary">robo</span> muy aproximadamente a 100 metros de su ubicacion</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CircleAlertIcon />
            <div className="flex gap-2 flex-col">
                <p>Uno de sus contactos a reportado un incidente</p>
                <p className="text-xs text-muted-foreground">Hace 2 minutos</p>
            </div>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
