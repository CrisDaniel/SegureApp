"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bell, AlertTriangle, User, Shield } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navOptions = [
  {
    label: "Inicio",
    href: "/",
    icon: Home,
  },
  {
    label: "Alertas",
    href: "/#alerts",
    icon: Bell,
  },
  {
    label: "Reportar Incidente",
    href: "/#report",
    icon: AlertTriangle,
  },
  {
    label: "Reporte Anónimo",
    href: "/#anonymous",
    icon: User,
  },
  {
    label: "Super Admin",
    href: "/superadmin",
    icon: Shield,
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <nav className="h-full py-8 px-4 bg-gray-50 border-r w-60 flex flex-col space-y-2">
      <div className="font-bold text-lg mb-8 text-primary">SegureApp</div>
      <ul className="flex-1 space-y-2">
        {navOptions.map((option) => (
          <li key={option.href}>
            <Link
              href={option.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-200 transition",
                pathname === option.href && "bg-gray-200 font-semibold"
              )}
            >
              <option.icon className="w-5 h-5" />
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 border-t pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || undefined} />
                <AvatarFallback className="text-xs capitalize">{session?.user?.name?.[0] || 'PM'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-medium text-semibold text-left capitalize">{session?.user?.name}</span>
                <span className="text-xs text-muted-foreground text-left">{session?.user?.email}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="right">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem>Ayuda</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500" onClick={() => signOut()}>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
