export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:3001";
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                password,
                role
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            // Si el backend devuelve un error (ej. 401 Unauthorized)
            // Puedes obtener más detalles del error si tu API los envía en el JSON
            // const errorData = await res.json(); 
            // console.error("Error from backend:", errorData);
            return Response.json({ error: "Error from backend" }, { status: 500 });
        }

        const data = await res.json();

        // Asegúrate de que 'data' contiene lo que esperas de tu backend NestJS,
        // especialmente el token (ej. data.accessToken) y los datos del usuario.
        // El objeto que retornas aquí estará disponible en el callback 'jwt' como el parámetro 'user'.
        return Response.json(data, { status: 200 });
    } catch (error) {
        console.error("Error in authorize function:", error);
        return Response.json({ error: "Error in authorize function" }, { status: 500 });
    }
    
}
