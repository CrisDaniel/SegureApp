'use client';

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
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();
  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir a dashboard
    if (status === 'authenticated') {
      router.push('/superadmin'); // O tu ruta deseada post-login
    }
  }, [status, router]);
  // funcion para manejar la entrada de email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let actualEmail = e.target.value;
    setEmail(actualEmail);
    if(actualEmail.length >0 && !emailRegex.test(actualEmail)){
      return setEmailError("Email invalido");
    }else{
      setEmailError('');
    }
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    let actualConfirmPassword = e.target.value;
    setConfirmPassword(actualConfirmPassword);
    if(actualConfirmPassword.length >0 && !password.startsWith(actualConfirmPassword)){
      return setPasswordError("Las contraseñas no coinciden");
    }else{
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(emailError || passwordError){
      console.log("Error en el formulario");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'USER'
        }),
        headers: { "Content-Type": "application/json" }
      });

      if (!res.ok) {
        // Si el backend devuelve un error (ej. 401 Unauthorized)
        // Puedes obtener más detalles del error si tu API los envía en el JSON
        // const errorData = await res.json(); 
        // console.error("Error from backend:", errorData);
        return console.log("Error al registrar el usuario");
      }

      const {user} = await res.json();
      console.log(user);
      const result = await signIn('credentials', {
        redirect: false, // Manejaremos la redirección manualmente
        email: user.email,
        password: password,
      });
      if (result?.error) {

        // Puedes loguear result.error para más detalles si tu `authorize` devuelve errores específicos
        console.error('SignIn Error:', result.error);
      } else if (result?.ok) {
        // El login fue exitoso, next-auth actualizará la sesión.
        // El useEffect se encargará de la redirección cuando status cambie a 'authenticated'
        // o puedes redirigir directamente aquí si lo prefieres:
        // router.push('/superadmin'); 
        console.log("redirigiendo...")
        router.push('/superadmin');
      } else {
        // Caso inesperado donde no hay error pero tampoco ok
         console.log("Ocurrió un error inesperado. Por favor, inténtalo de nuevo.");
      }

    } catch (error) {
      console.error("Error in authorize function:", error);
      return console.log("Error al registrar el usuario");
    }
  };


  // No renderizar nada o un loader mientras se verifica el estado de la sesión
  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p>Cargando</p> {/* O un spinner/componente de carga */}
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para registrarte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Tu nombre completo" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" placeholder="tu@email.com" required value={email} onChange={handleEmailChange} />
            {emailError && <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-right">{emailError}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <Input id="confirm-password" type="password" required value={confirmPassword} onChange={handleConfirmPassword} />
            {passwordError && <p className="text-sm text-red-600 dark:text-red-400 mt-2 text-right">{passwordError}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleSubmit}>Registrarse</Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline" prefetch={false}>
              Inicia Sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
