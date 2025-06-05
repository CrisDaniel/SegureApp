// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // El nombre para mostrar en el formulario de inicio de sesión (opcional)
      name: "Credentials",
      // `credentials` se usa para generar un formulario en la página de inicio de sesión predeterminada.
      // Puedes especificar los campos que esperas que se envíen.
      // Pero como ya tienes tu propia página de login, esto es más para la configuración interna.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        try {
          const BACKEND_URL = process.env.EXPRESS_BACKEND_URL || "http://localhost:3001";
          const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" }
          });

          if (!res.ok) {
            // Si el backend devuelve un error (ej. 401 Unauthorized)
            // Puedes obtener más detalles del error si tu API los envía en el JSON
            // const errorData = await res.json(); 
            // console.error("Error from backend:", errorData);
            return null;
          }

          const data = await res.json();

          // Asegúrate de que 'data' contiene lo que esperas de tu backend NestJS,
          // especialmente el token (ej. data.accessToken) y los datos del usuario.
          // El objeto que retornas aquí estará disponible en el callback 'jwt' como el parámetro 'user'.
          if (data && data.accessToken) { // Asumiendo que tu backend devuelve 'accessToken'
            return {
              id: data.user?.id || data.id, // Ajusta según la estructura de tu respuesta
              email: data.user?.email || data.email,
              name: data.user?.name || data.name,
              // ...otros campos del usuario que quieras guardar en el token de next-auth
              accessToken: data.accessToken, // MUY IMPORTANTE: el token de tu API NestJS
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // 'user' solo está presente en el primer login/signup.
      // Aquí estamos añadiendo el accessToken (de NestJS) y el id del usuario al token de NextAuth.
      if (account && user) {
        token.accessToken = user.accessToken; // 'user' es el objeto que retornaste de 'authorize'
        token.id = user.id; // Asumiendo que 'id' está en el objeto retornado por 'authorize'
      }
      return token;
    },
    async session({ session, token }) {
      // 'token' es el token JWT de NextAuth (que ahora incluye accessToken y id de NestJS).
      // Aquí pasamos esas propiedades a la sesión del cliente.
      if (session.user) {
        session.user.id = token.id as string; // castear a string si es necesario
      }
      session.accessToken = token.accessToken as string; // castear a string si es necesario
      return session;
    }
  },
  pages: {
    signIn: '/login', // Asegúrate que esta es la ruta a tu página de login
    // signOut: '/auth/signout', // Puedes definir una página de cierre de sesión personalizada
    // error: '/auth/error', // Página para mostrar errores (ej. credenciales incorrectas)
  },
  session:{
    strategy: 'jwt',
    maxAge: 60 * 60
  },
  jwt:{
    maxAge: 60 * 60
  },
  // Es MUY IMPORTANTE añadir un NEXTAUTH_SECRET en tus variables de entorno
  // Idealmente, esto debería ser una cadena larga y aleatoria.
  // NO LO HARDCODEES DIRECTAMENTE AQUÍ EN PRODUCCIÓN.
  secret: process.env.NEXTAUTH_SECRET, // Carga desde variables de entorno
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };