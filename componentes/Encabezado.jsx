'use client'

import { Leaf, Zap, UserCircle, LogOut, Shield, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext.tsx";

export default function Encabezado() {
  const { isAuthenticated, user, logout, loading } = useAuth();

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
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:underline">
                Calculadora
              </Link>
              <Link href="/productos" className="text-sm font-medium hover:underline">
                Productos
              </Link>
              {isAuthenticated && (
                <Link href="/admin/productos" className="text-sm font-medium hover:underline flex items-center gap-1">
                  <Shield size={16} />
                  Admin
                </Link>
              )}
            </nav>
            <div className="w-px h-6 bg-primary-foreground/50" />
            <div className="flex items-center gap-2">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-6 w-6" />
                    <span className="text-sm font-medium">{user?.nombre || 'Usuario'}</span>
                  </div>
                  <Button onClick={logout} variant="ghost" size="sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/sign-in">Iniciar Sesión</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/sign-up">Regístrate</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
