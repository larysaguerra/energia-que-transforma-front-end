'use client'

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Loader2 } from "lucide-react"

export default function FormularioLogin({ onLogin, cargando }) {
  const [datosFormulario, setDatosFormulario] = useState({
    correo: "",
    contrasena: ""
  })

  const manejarCambio = (campo, valor) => {
    setDatosFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const manejarLogin = (e) => {
    e.preventDefault()

    // Validar que todos los campos estén completos
    if (
      !datosFormulario.correo ||
      !datosFormulario.contrasena
    ) {
      alert("Por favor completa todos los campos")
      return
    }

    onLogin(datosFormulario)
  }

  return (

    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Inicio de Sesión</CardTitle>
        <CardDescription>Ingresa tu correo electrónico y contraseña</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarLogin} className="space-y-4">
          <div className="grid md:grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <Input
                id="correo"
                type="email"
                placeholder="user@email.com"
                value={datosFormulario.correo}
                onChange={(e) => manejarCambio("correo", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contrasena">Contraseña</Label>
              <Input
                id="contrasena"
                type="password"
                placeholder="Contraseña"
                value={datosFormulario.contrasena}
                onChange={(e) => manejarCambio("contrasena", e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={cargando}>
            {cargando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                Ingresar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
