'use client'

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Switch } from "../components/ui/switch"
import { Textarea } from "../components/ui/textarea"
import { Loader2, Upload } from "lucide-react"

export default function FormularioProducto({ onGuardar, cargando, tiposEnergia = [] }) {
  const [datosProducto, setDatosProducto] = useState({
    nombre: "",
    especificaciones: "",
    costo_unitario: "",
    capacidad_kw: "",
    complejidad_instalacion: "Baja",
    costo_mantenimiento_anual: "",
    eficiencia: "",
    fabricante: "",
    incentivos_disponibles: false,
    nivel_mantenimiento: "Bajo",
    reduccion_co2por_kwh: "",
    tipos_edificacion_recomendados: "",
    viabilidad_regional: "",
    vida_util_anhos: "",
    tipo_id: "",
  })

  const manejarCambio = (campo, valor) => {
    setDatosProducto((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    // Validación básica para asegurar que los campos no estén vacíos
    for (const key in datosProducto) {
      if (datosProducto[key] === "" && key !== "incentivos_disponibles") {
        alert(`Por favor completa el campo: ${key.replace(/_/g, ' ')}`)
        return
      }
    }

    // Convertir valores a los tipos correctos para la API
    const datosParaApi = {
      nombre: datosProducto.nombre,
      especificaciones: datosProducto.especificaciones,
      costo_unitario: parseFloat(datosProducto.costo_unitario),
      capacidad_kw: parseFloat(datosProducto.capacidad_kw),
      complejidad_instalacion: datosProducto.complejidad_instalacion,
      costo_mantenimiento_anual: parseFloat(datosProducto.costo_mantenimiento_anual),
      eficiencia: parseFloat(datosProducto.eficiencia),
      fabricante: datosProducto.fabricante,
      incentivos_disponibles: datosProducto.incentivos_disponibles,
      nivel_mantenimiento: datosProducto.nivel_mantenimiento,
      reduccion_co2por_kwh: parseFloat(datosProducto.reduccion_co2por_kwh),
      tipos_edificacion_recomendados: datosProducto.tipos_edificacion_recomendados,
      viabilidad_regional: datosProducto.viabilidad_regional,
      vida_util_anhos: parseInt(datosProducto.vida_util_anhos, 10),
      tipo_id: parseInt(datosProducto.tipo_id, 10),
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <Label htmlFor="fabricante">Fabricante</Label>
              <Input
                id="fabricante"
                value={datosProducto.fabricante}
                onChange={(e) => manejarCambio("fabricante", e.target.value)}
                placeholder="Ej: SolarTech"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="especificaciones">Especificaciones</Label>
            <Textarea
              id="especificaciones"
              value={datosProducto.especificaciones}
              onChange={(e) => manejarCambio("especificaciones", e.target.value)}
              placeholder="Describe las características técnicas y beneficios del producto."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="costo_unitario">Costo Unitario</Label>
              <Input
                id="costo_unitario"
                type="number"
                value={datosProducto.costo_unitario}
                onChange={(e) => manejarCambio("costo_unitario", e.target.value)}
                placeholder="Ej: 299.99"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacidad_kw">Capacidad (kW)</Label>
              <Input
                id="capacidad_kw"
                type="number"
                value={datosProducto.capacidad_kw}
                onChange={(e) => manejarCambio("capacidad_kw", e.target.value)}
                placeholder="Ej: 0.3"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eficiencia">Eficiencia (%)</Label>
              <Input
                id="eficiencia"
                type="number"
                value={datosProducto.eficiencia}
                onChange={(e) => manejarCambio("eficiencia", e.target.value)}
                placeholder="Ej: 21.5"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vida_util_anhos">Vida Útil (años)</Label>
              <Input
                id="vida_util_anhos"
                type="number"
                value={datosProducto.vida_util_anhos}
                onChange={(e) => manejarCambio("vida_util_anhos", e.target.value)}
                placeholder="Ej: 25"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costo_mantenimiento_anual">Costo Mantenimiento Anual</Label>
              <Input
                id="costo_mantenimiento_anual"
                type="number"
                value={datosProducto.costo_mantenimiento_anual}
                onChange={(e) => manejarCambio("costo_mantenimiento_anual", e.target.value)}
                placeholder="Ej: 50.00"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reduccion_co2por_kwh">Reducción CO2/kWh (kg)</Label>
              <Input
                id="reduccion_co2por_kwh"
                type="number"
                value={datosProducto.reduccion_co2por_kwh}
                onChange={(e) => manejarCambio("reduccion_co2por_kwh", e.target.value)}
                placeholder="Ej: 0.5"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tipos_edificacion_recomendados">Edificaciones Recomendadas</Label>
              <Input
                id="tipos_edificacion_recomendados"
                value={datosProducto.tipos_edificacion_recomendados}
                onChange={(e) => manejarCambio("tipos_edificacion_recomendados", e.target.value)}
                placeholder="Ej: Residencial, Comercial"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="viabilidad_regional">Viabilidad Regional</Label>
              <Input
                id="viabilidad_regional"
                value={datosProducto.viabilidad_regional}
                onChange={(e) => manejarCambio("viabilidad_regional", e.target.value)}
                placeholder="Ej: Norte, Centro"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <Label>Complejidad de Instalación</Label>
              <Select onValueChange={(valor) => manejarCambio("complejidad_instalacion", valor)} value={datosProducto.complejidad_instalacion}>
                <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baja">Baja</SelectItem>
                  <SelectItem value="Media">Media</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nivel de Mantenimiento</Label>
              <Select onValueChange={(valor) => manejarCambio("nivel_mantenimiento", valor)} value={datosProducto.nivel_mantenimiento}>
                <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bajo">Bajo</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch id="incentivos_disponibles" checked={datosProducto.incentivos_disponibles} onCheckedChange={(valor) => manejarCambio("incentivos_disponibles", valor)} />
              <Label htmlFor="incentivos_disponibles">Incentivos Disponibles</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Energía</Label>
            <Select onValueChange={(valor) => manejarCambio("tipo_id", valor)} value={datosProducto.tipo_id}>
              <SelectTrigger><SelectValue placeholder="Selecciona un tipo de energía" /></SelectTrigger>
              <SelectContent>
                {tiposEnergia.map((tipo) => (
                  <SelectItem key={tipo.id} value={String(tipo.id)}>{tipo.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
