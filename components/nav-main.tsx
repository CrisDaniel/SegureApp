"use client"

import { MailIcon, PlusCircleIcon, type LucideIcon } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              onClick={async () => {
                console.log("Boton de panico aquiiiiiii")
                try {
                  const response = await fetch('/api/panic-alert', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      timestamp: new Date().toISOString(),
                      // Puedes agregar más datos relevantes aquí
                    }),
                  });

                  if (!response.ok) {
                    throw new Error('Error al enviar la alerta');
                  }

                  const data = await response.json();
                  console.log('Alerta enviada:', data);
                  // Aquí podrías mostrar una notificación al usuario
                } catch (error) {
                  console.error('Error:', error);
                  // Aquí podrías mostrar un mensaje de error al usuario
                }
              }}
            >
              <PlusCircleIcon />
              <span>Boton de panico</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <MailIcon />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <SidebarMenuButton tooltip={item.title} >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
