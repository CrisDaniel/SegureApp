"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Bell, AlertTriangle, User, Shield } from "lucide-react";

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
    </nav>
  );
}
