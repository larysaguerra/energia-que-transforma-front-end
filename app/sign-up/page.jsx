'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Encabezado from "../../componentes/Encabezado";
import FormularioRegistro from "../../componentes/FormularioRegistro";
import PiePagina from "../../componentes/PiePagina";
import { registrarUsuario } from "../../servicios/apiEnergia";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

export default function SignupPage() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegistro = async (datosFormulario) => {
    setCargando(true);
    setError(null);
    try {
      // The backend endpoint is expecting "password", not "contrasena"
      const datosParaApi = {
        nombre: datosFormulario.nombre,
        apellido: datosFormulario.apellido,
        email: datosFormulario.correo,
        password: datosFormulario.contrasena,
        rol: datosFormulario.rol,
      };
      await registrarUsuario(datosParaApi);
      // Redirect to login page after successful registration
      router.push("/sign-in?registered=true");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Encabezado />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error de Registro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormularioRegistro onRegistrar={handleRegistro} cargando={cargando} />
        </div>
      </main>
      <PiePagina />
    </div>
  );
}
