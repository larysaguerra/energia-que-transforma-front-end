'use client'

import { useState } from "react";
import Encabezado from "../../../componentes/Encabezado";
import PiePagina from "../../../componentes/PiePagina";
import FormularioProducto from "../../../componentes/FormularioProducto";
import { crearProducto } from "../../../servicios/apiEnergia";
import { useAuth } from "../../../context/AuthContext.tsx";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";
import { useRouter } from "next/navigation";

export default function AdminProductosPage() {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const handleGuardarProducto = async (datosProducto) => {
    setCargando(true);
    setError(null);
    setSuccess(false);
    try {
      await crearProducto(datosProducto, token);
      setSuccess(true);
      // Optionally, redirect or clear the form
      setTimeout(() => router.push('/productos'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Or redirect to login page
    return (
        <div className="min-h-screen bg-background">
            <Encabezado />
            <main className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Acceso Denegado</h1>
                <p>Debes iniciar sesión para acceder a esta página.</p>
            </main>
            <PiePagina />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Encabezado />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Gestión de Productos</h1>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error al Guardar</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4">
              <AlertTitle>¡Éxito!</AlertTitle>
              <AlertDescription>Producto guardado correctamente. Redirigiendo a la lista de productos...</AlertDescription>
            </Alert>
          )}
          <FormularioProducto onGuardar={handleGuardarProducto} cargando={cargando} />
        </div>
      </main>
      <PiePagina />
    </div>
  );
}
