import type { Metadata } from 'next'
import './globals.css';
import { NextAuthProvider } from "./providers"; // Ajusta la ruta si es necesario
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "SegureApp", // O tu título preferido
  description: 'Aplicación de seguridad ciudadana',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
