import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    console.log("Panic alert function called");
    const session = await getServerSession(authOptions);
    if(!session){
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;
    const token = session.accessToken

    if (!userId) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:3001";
        const res = await fetch(`${BACKEND_URL}/api/v1/panic-alert`, {
            method: 'POST',
            body: JSON.stringify({
                userId,
            }),
            headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}`}
        });

        if (!res.ok) {
            return Response.json({ error: "Error from backend" }, { status: 500 });
        }

        const data = await res.json();
        return Response.json(data, { status: 200 });
    } catch (error) {
        console.error("Error in panic alert function:", error);
        return Response.json({ error: "Error in panic alert function" }, { status: 500 });
    }
    
}
