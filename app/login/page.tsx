'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir a dashboard
    if (status === 'authenticated') {
      router.push('/superadmin'); // O tu ruta deseada post-login
    }
  }, [status, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false, // Manejaremos la redirección manualmente
        email,
        password,
      });

      if (result?.error) {
        setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        // Puedes loguear result.error para más detalles si tu `authorize` devuelve errores específicos
        console.error('SignIn Error:', result.error);
      } else if (result?.ok) {
        // El login fue exitoso, next-auth actualizará la sesión.
        // El useEffect se encargará de la redirección cuando status cambie a 'authenticated'
        // o puedes redirigir directamente aquí si lo prefieres:
        router.push('/superadmin'); // O tu ruta deseada post-login
      } else {
        // Caso inesperado donde no hay error pero tampoco ok
         setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      setError('Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // No renderizar nada o un loader mientras se verifica el estado de la sesión
  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p>Cargando...</p> {/* O un spinner/componente de carga */}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico y contraseña para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-center">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2" onClick={() => signIn('google', { callbackUrl: '/dashboard' })} disabled={isLoading}>
              {/* Asegúrate de tener configurado el Google Provider en tus authOptions si usas esto */}
              Continuar con Google
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="underline" prefetch={false}>
                Regístrate
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}