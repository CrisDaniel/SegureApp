// app/api/emergency-contacts/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
    const authHeader = req.headers.get("Authorization")
    console.log("headers de la peticion",authHeader);
    const BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:3001";
    const response = await fetch(`${BACKEND_URL}/api/v1/emergency-contacts`, {
      method: 'GET',
      headers: { 
        "Authorization": authHeader || "",
        "Content-Type": "application/json",
      },
      cache: 'no-store' // Para evitar el caché y obtener datos frescos
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Error al obtener los contactos de emergencia' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en la petición de contactos de emergencia:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}