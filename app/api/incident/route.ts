export async function POST(request: Request) {
    console.log("Incident function called");
    const body = await request.json();
    const { tipoIncidencia, ubicacion, descripcion, userId } = body;

    if (!tipoIncidencia || !ubicacion || !descripcion || !userId) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:3001";
        const res = await fetch(`${BACKEND_URL}/api/v1/incidents`, {
            method: 'POST',
            body: JSON.stringify({
                tipoIncidencia,
                ubicacion,
                descripcion,
                userId,
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
        console.error("Error in incident function:", error);
        return Response.json({ error: "Error in incident function" }, { status: 500 });
    }
    
}

export async function GET() {

    console.log("Incident GET function called jajajajjajajjajajaja");
    try {
      const BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:3001";
      const response = await fetch(`${BACKEND_URL}/api/v1/incidents`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
        // Opcional: Agrega cache control si es necesario
        // cache: 'no-store' // Para deshabilitar caché
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching incidents:", errorData);
        return Response.json({ error: "Error fetching incidents" }, { status: 500 });
      }
  
      const data = await response.json();
      
      // Opcional: Transforma los datos para que coincidan con el formato que espera tu frontend
      const formattedIncidents = data.map((incident: any) => ({
        id: incident.id,
        type: incident.type, // Ajusta según tu modelo de datos
        lat: incident.latitude,
        lng: incident.longitude,
        description: incident.description,
        time: new Date(incident.createdAt).toLocaleTimeString(), // Formatea la fecha como prefieras
      }));
  
      return Response.json(formattedIncidents, { status: 200 });
    } catch (error) {
      console.error("Error fetching incidents:", error);
      return Response.json(
        { error: "Error fetching incidents" },
        { status: 500 }
      );
    }
}