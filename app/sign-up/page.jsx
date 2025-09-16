import React from "react";

import EncabezadoBase from "../../componentes/EncabezadoBase";
import FormularioRegistro from "../../componentes/FormularioRegistro";
import PiePagina from "../../componentes/PiePagina";

export default function SignupPage() {

  return (
    <div className="min-h-screen">
      <EncabezadoBase />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <FormularioRegistro />
        </div>
      </main>
      <PiePagina />
    </div>
  );

}