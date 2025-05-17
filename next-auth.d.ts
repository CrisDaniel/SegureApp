import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Extiende el tipo User que usa next-auth
declare module "next-auth" {
  interface User extends DefaultUser {
    // Estas son las propiedades que retornas desde tu función `authorize`
    id: string;
    accessToken?: string; // Hazlo opcional si no siempre está
    // Añade otras propiedades personalizadas del usuario si las tienes
    // name?: string | null;
    // email?: string | null;
  }

  interface Session extends DefaultSession {
    // Estas son las propiedades que añades al objeto session en el callback `session`
    accessToken?: string; // Hazlo opcional si no siempre está
    user?: User; // Sobrescribe el tipo user para que incluya tus campos personalizados
  }
}

// Extiende el tipo JWT que usa next-auth
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // Estas son las propiedades que añades al token en el callback `jwt`
    id?: string; // Hazlo opcional si no siempre está o usa `string | undefined`
    accessToken?: string; // Hazlo opcional si no siempre está
  }
}
