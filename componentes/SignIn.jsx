'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormularioLogin from "./LoginUsuario";
import { iniciarSesion } from "../servicios/apiEnergia";
import { useAuth } from "../context/AuthContext.tsx";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function SignIn() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [showRegisteredMessage, setShowRegisteredMessage] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    if (searchParams.get("registered")) {
      setShowRegisteredMessage(true);
    }
  }, [searchParams]);

  const handleLogin = async (datosFormulario) => {
    setCargando(true);
    setError(null);
    try {
      const datosParaApi = {
        email: datosFormulario.correo,
        password: datosFormulario.contrasena,
      };
      const data = await iniciarSesion(datosParaApi);
      if (data.token) {
        login(data);
        router.push("/");
      } else {
        setError("Respuesta de inicio de sesión inválida.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {showRegisteredMessage && (
        <Alert className="mb-4">
          <AlertTitle>¡Registro Exitoso!</AlertTitle>
          <AlertDescription>
            Ahora puedes iniciar sesión con tu nueva cuenta.
          </AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error de Inicio de Sesión</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <FormularioLogin onLogin={handleLogin} cargando={cargando} />
    </div>
  );
}
