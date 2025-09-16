'use client'

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Loader2, Upload } from "lucide-react"

export default function FormularioProducto({ onGuardar, cargando }) {
  const [datosProducto, setDatosProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  })

  const manejarCambio = (campo, valor) => {
    setDatosProducto((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    if (!datosProducto.nombre || !datosProducto.descripcion || !datosProducto.precio) {
      alert("Por favor completa todos los campos.")
      return
    }
    // The price needs to be a number
    const datosParaApi = {
      ...datosProducto,
      precio: parseFloat(datosProducto.precio),
    }
    onGuardar(datosParaApi)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Subir Nuevo Producto</CardTitle>
        <CardDescription>Completa la información para agregar un nuevo producto de energía.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarGuardar} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Producto</Label>
            <Input
              id="nombre"
              value={datosProducto.nombre}
              onChange={(e) => manejarCambio("nombre", e.target.value)}
              placeholder="Ej: Paneles Solares Avanzados"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={datosProducto.descripcion}
              onChange={(e) => manejarCambio("descripcion", e.target.value)}
              placeholder="Describe las características y beneficios del producto."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="precio">Precio</Label>
            <Input
              id="precio"
              type="number"
              value={datosProducto.precio}
              onChange={(e) => manejarCambio("precio", e.target.value)}
              placeholder="Ej: 299.99"
              min="0"
              step="0.01"
            />
          </div>

          <Button type="submit" className="w-full" disabled={cargando}>
            {cargando ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Guardar Producto
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
