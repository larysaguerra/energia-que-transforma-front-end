"use client";

import Encabezado from "../componentes/Encabezado";
import FormularioEnergia from "../componentes/FormularioEnergia";
import Resultados from "../componentes/Resultados";
import PiePagina from "../componentes/PiePagina";
import { useState } from "react";

export default function App() {
  const [datosCalculados, setDatosCalculados] = useState(null);
  const [cargando, setCargando] = useState(false);

  const manejarCalcular = async (datosFormulario) => {
    setCargando(true);
    try {
      // Simular llamada a API - reemplazar con endpoint real cuando esté disponible
      const { calcularAhorroEnergetico } = await import(
        "../servicios/apiEnergia"
      );
      const resultados = await calcularAhorroEnergetico(datosFormulario);
      setDatosCalculados(resultados);
    } catch (error) {
      console.error("Error al calcular:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Encabezado />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <FormularioEnergia onCalcular={manejarCalcular} cargando={cargando} />
        </div>
        <div>{datosCalculados && <Resultados datos={datosCalculados} />}</div>
      </main>
      <PiePagina />
    </div>
  );
}
