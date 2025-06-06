import type { Metadata } from 'next'
import './globals.css';
import { NextAuthProvider } from "./providers"; // Ajusta la ruta si es necesario
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"

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
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
