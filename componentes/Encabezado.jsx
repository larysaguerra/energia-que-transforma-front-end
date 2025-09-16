"use client"

import { Leaf, Zap, UserCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import FormularioLogin from "./LoginUsuario";

export default function Encabezado() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "Usuario" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogin = (loginData) => {
    console.log("Login data:", loginData);
    // Simulate login
    setLoggedIn(true);
    setUser({ name: loginData.correo.split('@')[0] });
    setIsDialogOpen(false); // Close dialog on login
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <Zap className="h-8 w-8" />
            </Link>
            <div>
              <h1 className="text-xl font-bold">
                <Link href="/">Energía que Transforma</Link>
              </h1>
              <p className="text-primary-foreground/80 text-xs">
                Calculadora de Ahorro Energético
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:underline">
                Calculadora
              </Link>
              <Link href="/productos" className="text-sm font-medium hover:underline">
                Productos
              </Link>
            </nav>
            <div className="w-px h-6 bg-primary-foreground/50 hidden md:block" />
            {loggedIn ? (
              <div className="flex items-center gap-2">
                <UserCircle className="h-6 w-6" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            ) : (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium">
                    Iniciar Sesión
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Accede a tu cuenta</DialogTitle>
                  </DialogHeader>
                  <FormularioLogin onLogin={handleLogin} cargando={false} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
