import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Sender = {
  id: number
  name: string
}

type Notification = {
  id: number
  recipientId: number
  sender: Sender
  type: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

type NotificationStore = {
  notifications: Notification[]
  unreadCount: number
  setNotifications: (notifications: Notification[]) => void
  addNotification: (notification: Notification) => void
  markAsRead: (id: number) => void
  markAllAsRead: () => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      
      setNotifications: (notifications) => {
        const unreadCount = notifications.filter(n => !n.isRead).length
        set({ notifications, unreadCount })
      },
      
      addNotification: (notification) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + (notification.isRead ? 0 : 1)
        }))
      },
      
      markAsRead: (id) => {
        set((state) => {
          const updatedNotifications = state.notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
          )
          return {
            notifications: updatedNotifications,
            unreadCount: updatedNotifications.filter(n => !n.isRead).length
          }
        })
      },
      
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, isRead: true })),
          unreadCount: 0
        }))
      },
      
      clearAll: () => {
        set({ notifications: [], unreadCount: 0 })
      }
    }),
    {
      name: 'notification-storage', 
    }
  )
)