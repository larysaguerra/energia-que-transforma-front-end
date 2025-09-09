"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { CircleUserRound, Loader2 } from "lucide-react"

export default function FormularioRegistro({onRegistrar, cargando }) {
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    contrasena1: ""
  })

  const manejarCambio = (campo, valor) => {
    setDatosFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const manejarRegistro = (e) => {
    e.preventDefault()

    // Validar que todos los campos estén completos
    if (
      !datosFormulario.nombre ||
      !datosFormulario.apellido ||
      !datosFormulario.correo ||
      !datosFormulario.contrasena ||
      !datosFormulario.contrasena1
    ) {
      alert("Por favor completa todos los campos")
      return
    }

    if (datosFormulario.contrasena != datosFormulario.contrasena1) {
      alert("Las contraseñas no coinciden")
      return
    }

    onRegistrar(datosFormulario)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Datos de usuario
        </CardTitle>
        <CardDescription>
          Ingresa la información de tu empresa, comenzar a ofrecer tus productos y servicios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarRegistro} className="space-y-6">
          <div className="grid md:grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Nombre"
                value={datosFormulario.nombre}
                onChange={(e) => manejarCambio("nombre", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                type="text"
                placeholder="Apellido"
                value={datosFormulario.apellido}
                onChange={(e) => manejarCambio("apellido", e.target.value)}
              />
            </div>
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
            <div className="space-y-2">
              <Label htmlFor="contrasena1">Repite tu contraseña</Label>
              <Input
                id="contrasena1"
                type="password"
                placeholder="Repite tu contraseña"
                value={datosFormulario.contrasena1}
                onChange={(e) => manejarCambio("contrasena1", e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={cargando}>
            {cargando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              <>
                <CircleUserRound className="mr-2 h-4 w-4" />
                Enviar
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
