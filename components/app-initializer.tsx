'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useNotificationStore } from '@/stores/notification-store'

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const { setNotifications } = useNotificationStore()

  useEffect(() => {
    const fetchNotifications = async () => {
      if(status === "loading") return
      if (!session?.user?.id) {
        console.log("No hay usuario")
        return
      }

      try {

        const response = await fetch('/api/notification', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        
        if (!response.ok) throw new Error('Error al cargar notificaciones')
        
        const data = await response.json()
        console.log("Notificaciones del api en el front", data)
        setNotifications(data)
      } catch (error) {
        console.error('Error al cargar notificaciones:', error)
      }
    }

    // Cargar notificaciones al montar
    fetchNotifications()
    
    // Configurar polling para actualizaciones periódicas
    const interval = setInterval(fetchNotifications, 60000) // Actualizar cada minuto
    
    return () => clearInterval(interval)
  }, [status])

  return <>{children}</>
}