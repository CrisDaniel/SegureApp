'use client'
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NotificationMenu } from "./notification-menu"
import { NotificationPopover } from "./notification-popover"

const routeTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard', // Título para la ruta Home (el mapa)
  '/dashboard/incidents-map': 'Mapa de Incidentes',
  '/dashboard/incident-report': 'Reportar Incidente',
  '/dashboard/emergency-contacts': 'Contactos de Emergencia',
  '/dashboard/my-reports': 'Mis Reportes',
  '/dashboard/configuracion': 'Configuración',
  '/dashboard/ayuda': 'Ayuda / Información',
  // Agrega aquí otras rutas si las tienes, por ejemplo, si creaste /dashboard/user
  '/dashboard/user': 'Perfil de Usuario',
};
export function SiteHeader() {
  const pathname = usePathname()
  const title = routeTitles[pathname] || 'Dashboard';
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <NotificationMenu />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
      </div>
    </header>
  )
}
