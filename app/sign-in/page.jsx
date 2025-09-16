import React from "react";

import EncabezadoBase from "../../componentes/EncabezadoBase";
import LoginUsuario from "../../componentes/LoginUsuario";
import PiePagina from "../../componentes/PiePagina";

export default function SigninPage() {

  return (
    <div className="min-h-screen">
      <EncabezadoBase />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <LoginUsuario />
        </div>
      </main>
      <PiePagina />
    </div>
  );

}