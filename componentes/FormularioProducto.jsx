'use client'

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Switch } from "../components/ui/switch"
import { Textarea } from "../components/ui/textarea"
import { Loader2, Upload } from "lucide-react"

export default function FormularioProducto({ producto, onGuardar, cargando, tiposEnergia = [] }) {
  const [datosProducto, setDatosProducto] = useState({
    nombre: "",
    especificaciones: "",
    costoUnitario: "",
    capacidadKw: "",
    complejidadInstalacion: "Baja",
    costoMantenimientoAnual: "",
    eficiencia: "",
    fabricante: "",
    incentivosDisponibles: false,
    nivelMantenimiento: "Bajo",
    reduccionCo2PorKwh: "",
    tiposEdificacionRecomendados: "",
    viabilidadRegional: "",
    vidaUtilAnhos: "",
    urlImagen: "", // Campo para la URL de la imagen
    tipo: { id: "" },
  })

  useEffect(() => {
    if (producto) {
      setDatosProducto({
        nombre: producto.nombre || "",
        especificaciones: producto.especificaciones || "",
        costoUnitario: producto.costoUnitario || "",
        capacidadKw: producto.capacidadKw || "",
        complejidadInstalacion: producto.complejidadInstalacion || "Baja",
        costoMantenimientoAnual: producto.costoMantenimientoAnual || "",
        eficiencia: producto.eficiencia || "",
        fabricante: producto.fabricante || "",
        incentivosDisponibles: producto.incentivosDisponibles || false,
        nivelMantenimiento: producto.nivelMantenimiento || "Bajo",
        reduccionCo2PorKwh: producto.reduccionCo2PorKwh || "",
        tiposEdificacionRecomendados: producto.tiposEdificacionRecomendados || "",
        viabilidadRegional: producto.viabilidadRegional || "",
        vidaUtilAnhos: producto.vidaUtilAnhos || "",
        urlImagen: producto.urlImagen || "",
        tipo: { id: producto.tipo?.id || "" },
      })
    }
  }, [producto])

  const manejarCambio = (campo, valor) => {
    if (campo === "tipo") {
      setDatosProducto((prev) => ({ ...prev, tipo: { id: valor } }))
    } else {
      setDatosProducto((prev) => ({ ...prev, [campo]: valor }))
    }
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    for (const key in datosProducto) {
      if (key === "tipo") {
        if (datosProducto.tipo.id === "") {
          alert("Por favor selecciona un tipo de energía")
          return
        }
      } else if (key !== 'urlImagen' && datosProducto[key] === "" && key !== "incentivosDisponibles") {
        alert(`Por favor completa el campo: ${key}`)
        return
      }
    }

    const datosParaApi = {
      ...datosProducto,
      costoUnitario: parseFloat(datosProducto.costoUnitario),
      capacidadKw: parseFloat(datosProducto.capacidadKw),
      costoMantenimientoAnual: parseFloat(datosProducto.costoMantenimientoAnual),
      eficiencia: parseFloat(datosProducto.eficiencia),
      reduccionCo2PorKwh: parseFloat(datosProducto.reduccionCo2PorKwh),
      vidaUtilAnhos: parseInt(datosProducto.vidaUtilAnhos, 10),
      tipo: { id: parseInt(datosProducto.tipo.id, 10) },
    }
    
    onGuardar(datosParaApi)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{producto ? "Editar" : "Subir Nuevo"} Producto</CardTitle>
        <CardDescription>Completa la información para {producto ? "actualizar" : "agregar"} un producto de energía.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarGuardar} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Producto</Label>
              <Input id="nombre" value={datosProducto.nombre} onChange={(e) => manejarCambio("nombre", e.target.value)} placeholder="Ej: Paneles Solares Avanzados" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fabricante">Fabricante</Label>
              <Input id="fabricante" value={datosProducto.fabricante} onChange={(e) => manejarCambio("fabricante", e.target.value)} placeholder="Ej: SolarTech" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="especificaciones">Especificaciones</Label>
            <Textarea id="especificaciones" value={datosProducto.especificaciones} onChange={(e) => manejarCambio("especificaciones", e.target.value)} placeholder="Describe las características técnicas y beneficios del producto." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urlImagen">URL de la Imagen</Label>
            <Input id="urlImagen" value={datosProducto.urlImagen} onChange={(e) => manejarCambio("urlImagen", e.target.value)} placeholder="https://ejemplo.com/imagen.jpg" />
            {datosProducto.urlImagen && (
              <div className="mt-2">
                <img src={datosProducto.urlImagen} alt="Vista previa" className="w-full h-auto max-w-xs rounded-md object-cover mx-auto" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="costoUnitario">Costo Unitario</Label>
              <Input id="costoUnitario" type="number" value={datosProducto.costoUnitario} onChange={(e) => manejarCambio("costoUnitario", e.target.value)} placeholder="Ej: 299.99" min="0" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacidadKw">Capacidad (kW)</Label>
              <Input id="capacidadKw" type="number" value={datosProducto.capacidadKw} onChange={(e) => manejarCambio("capacidadKw", e.target.value)} placeholder="Ej: 0.3" min="0" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eficiencia">Eficiencia (%)</Label>
              <Input id="eficiencia" type="number" value={datosProducto.eficiencia} onChange={(e) => manejarCambio("eficiencia", e.target.value)} placeholder="Ej: 21.5" min="0" max="100" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vidaUtilAnhos">Vida Útil (años)</Label>
              <Input id="vidaUtilAnhos" type="number" value={datosProducto.vidaUtilAnhos} onChange={(e) => manejarCambio("vidaUtilAnhos", e.target.value)} placeholder="Ej: 25" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costoMantenimientoAnual">Costo Mantenimiento Anual</Label>
              <Input id="costoMantenimientoAnual" type="number" value={datosProducto.costoMantenimientoAnual} onChange={(e) => manejarCambio("costoMantenimientoAnual", e.target.value)} placeholder="Ej: 50.00" min="0" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reduccionCo2PorKwh">Reducción CO2/kWh (kg)</Label>
              <Input id="reduccionCo2PorKwh" type="number" value={datosProducto.reduccionCo2PorKwh} onChange={(e) => manejarCambio("reduccionCo2PorKwh", e.target.value)} placeholder="Ej: 0.5" min="0" step="0.01" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="tiposEdificacionRecomendados">Edificaciones Recomendadas</Label>
              <Input id="tiposEdificacionRecomendados" value={datosProducto.tiposEdificacionRecomendados} onChange={(e) => manejarCambio("tiposEdificacionRecomendados", e.target.value)} placeholder="Ej: Residencial, Comercial" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="viabilidadRegional">Viabilidad Regional</Label>
              <Input id="viabilidadRegional" value={datosProducto.viabilidadRegional} onChange={(e) => manejarCambio("viabilidadRegional", e.target.value)} placeholder="Ej: Norte, Centro" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            <div className="space-y-2">
              <Label>Complejidad de Instalación</Label>
              <Select onValueChange={(valor) => manejarCambio("complejidadInstalacion", valor)} value={datosProducto.complejidadInstalacion}>
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
              <Select onValueChange={(valor) => manejarCambio("nivelMantenimiento", valor)} value={datosProducto.nivelMantenimiento}>
                <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bajo">Bajo</SelectItem>
                  <SelectItem value="Medio">Medio</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch id="incentivosDisponibles" checked={datosProducto.incentivosDisponibles} onCheckedChange={(valor) => manejarCambio("incentivosDisponibles", valor)} />
              <Label htmlFor="incentivosDisponibles">Incentivos Disponibles</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tipo de Energía</Label>
            <Select onValueChange={(valor) => manejarCambio("tipo", valor)} value={datosProducto.tipo.id}>
              <SelectTrigger><SelectValue placeholder="Selecciona un tipo de energía" /></SelectTrigger>
              <SelectContent>
                {tiposEnergia.map((tipo) => (
                  <SelectItem key={tipo.id} value={String(tipo.id)}>{tipo.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={cargando}>
            {cargando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            {cargando ? "Guardando..." : "Guardar Producto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}