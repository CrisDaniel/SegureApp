// app/api/emergency-contacts/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
    // obtenemos el parametro email
    const {searchParams} = new URL(req.url);
    const email = searchParams.get("email");
    const BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:3001";
    const response = await fetch(`${BACKEND_URL}/api/v1/users?email=${email}`, {
      method: 'GET',
      headers: { 
        "Content-Type": "application/json",
      },
      cache: 'no-store' // Para evitar el caché y obtener datos frescos
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Error al obtener el usuario' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en la petición de usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}