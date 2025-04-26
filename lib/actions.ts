"use server"

import { revalidatePath } from "next/cache"

// Tipos para los datos
type Incident = {
  id: string
  type: string
  description: string
  location: {
    lat: number
    lng: number
  }
  timestamp: number
  userId?: string
  status: "pending" | "verified" | "resolved"
}

type Alert = {
  id: string
  type: string
  title: string
  description: string
  zone: string
  timestamp: number
  priority: "low" | "medium" | "high"
}

type EmergencyContact = {
  id: string
  name: string
  phone: string
  relationship: string
  userId: string
}

// En una aplicación real, estas funciones interactuarían con una base de datos
// Aquí simulamos el comportamiento con datos en memoria

// Reportar un incidente
export async function reportIncident(formData: FormData) {
  try {
    // Extraer datos del formulario
    const type = formData.get("type") as string
    const description = formData.get("description") as string
    const lat = Number.parseFloat(formData.get("lat") as string)
    const lng = Number.parseFloat(formData.get("lng") as string)

    // Validar datos
    if (!type || !description || isNaN(lat) || isNaN(lng)) {
      return { success: false, error: "Datos incompletos o inválidos" }
    }

    // En una aplicación real, aquí guardaríamos en la base de datos
    console.log("Incidente reportado:", { type, description, location: { lat, lng } })

    // Revalidar la página para mostrar el nuevo incidente
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error al reportar incidente:", error)
    return { success: false, error: "Error al procesar la solicitud" }
  }
}

// Enviar alerta de pánico
export async function sendPanicAlert(formData: FormData) {
  try {
    // Extraer datos del formulario
    const lat = Number.parseFloat(formData.get("lat") as string)
    const lng = Number.parseFloat(formData.get("lng") as string)

    // Validar datos
    if (isNaN(lat) || isNaN(lng)) {
      return { success: false, error: "No se pudo obtener la ubicación" }
    }

    // En una aplicación real, aquí enviaríamos la alerta a servicios de emergencia
    // y contactos de emergencia del usuario
    console.log("Alerta de pánico enviada:", { location: { lat, lng } })

    // Revalidar la página
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error al enviar alerta de pánico:", error)
    return { success: false, error: "Error al procesar la solicitud" }
  }
}

// Enviar denuncia anónima
export async function submitAnonymousReport(formData: FormData) {
  try {
    // Extraer datos del formulario
    const type = formData.get("type") as string
    const description = formData.get("description") as string
    const location = formData.get("location") as string
    const includeUserLocation = formData.get("includeLocation") === "on"

    // Validar datos
    if (!type || !description || !location) {
      return { success: false, error: "Datos incompletos" }
    }

    // En una aplicación real, aquí guardaríamos en la base de datos
    // asegurando que no se almacene información que identifique al usuario
    console.log("Denuncia anónima recibida:", {
      type,
      description,
      location,
      includeUserLocation,
    })

    return { success: true }
  } catch (error) {
    console.error("Error al enviar denuncia anónima:", error)
    return { success: false, error: "Error al procesar la solicitud" }
  }
}

// Obtener alertas para una zona específica
export async function getAlertsByZone(zone: string) {
  try {
    // En una aplicación real, aquí consultaríamos la base de datos
    // Simulamos una respuesta con datos de ejemplo
    const alerts: Alert[] = [
      {
        id: "1",
        type: "emergencia",
        title: "Accidente de tránsito",
        description: "Accidente en Av. Principal. Tráfico congestionado.",
        zone: "Centro",
        timestamp: Date.now() - 600000, // 10 minutos atrás
        priority: "high",
      },
      {
        id: "2",
        type: "sospechoso",
        title: "Actividad sospechosa",
        description: "Personas desconocidas merodeando en la zona residencial.",
        zone: "Las Flores",
        timestamp: Date.now() - 1800000, // 30 minutos atrás
        priority: "medium",
      },
    ]

    // Filtrar por zona si se especifica
    const filteredAlerts = zone ? alerts.filter((alert) => alert.zone === zone) : alerts

    return { success: true, data: filteredAlerts }
  } catch (error) {
    console.error("Error al obtener alertas:", error)
    return { success: false, error: "Error al procesar la solicitud" }
  }
}

// Configurar contactos de emergencia
export async function saveEmergencyContact(formData: FormData) {
  try {
    // Extraer datos del formulario
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const relationship = formData.get("relationship") as string

    // Validar datos
    if (!name || !phone) {
      return { success: false, error: "Nombre y teléfono son obligatorios" }
    }

    // En una aplicación real, aquí guardaríamos en la base de datos
    console.log("Contacto de emergencia guardado:", { name, phone, relationship })

    // Revalidar la página
    revalidatePath("/contactos")

    return { success: true }
  } catch (error) {
    console.error("Error al guardar contacto de emergencia:", error)
    return { success: false, error: "Error al procesar la solicitud" }
  }
}
