import { Suspense } from 'react';
import Encabezado from "../../componentes/Encabezado";
import PiePagina from "../../componentes/PiePagina";
import SignIn from "../../componentes/SignIn";

function SignInFallback() {
    return <div>Cargando...</div>
}

export default function SigninPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Encabezado />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Suspense fallback={<SignInFallback />}>
          <SignIn />
        </Suspense>
      </main>
      <PiePagina />
    </div>
  );
}
