"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calculator, Loader2 } from "lucide-react"

export default function FormularioEnergia({ onCalcular, cargando }) {
  const [datosFormulario, setDatosFormulario] = useState({
    consumoMensualKw: "",
    costoMensualPesos: "",
    ubicacion: "",
    tipoEdificacion: "",
  })

  const manejarCambio = (campo, valor) => {
    setDatosFormulario((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    // Validar que todos los campos estén completos
    if (
      !datosFormulario.consumoMensualKw ||
      !datosFormulario.costoMensualPesos ||
      !datosFormulario.ubicacion ||
      !datosFormulario.tipoEdificacion
    ) {
      alert("Por favor completa todos los campos")
      return
    }

    // Convertir valores numéricos
    const datosNumericos = {
      ...datosFormulario,
      consumoMensualKw: Number.parseFloat(datosFormulario.consumoMensualKw),
      costoMensualPesos: Number.parseFloat(datosFormulario.costoMensualPesos),
    }

    onCalcular(datosNumericos)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Datos de Consumo Energético
        </CardTitle>
        <CardDescription>
          Ingresa la información de tu consumo actual para calcular los beneficios de migrar a energías renovables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="consumo">Consumo Mensual (kW)</Label>
              <Input
                id="consumo"
                type="number"
                placeholder="Ej: 350"
                value={datosFormulario.consumoMensualKw}
                onChange={(e) => manejarCambio("consumoMensualKw", e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="costo">Costo Mensual ($)</Label>
              <Input
                id="costo"
                type="number"
                placeholder="Ej: 2500"
                value={datosFormulario.costoMensualPesos}
                onChange={(e) => manejarCambio("costoMensualPesos", e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ubicación Geográfica</Label>
              <Select onValueChange={(value) => manejarCambio("ubicacion", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu región" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="norte">Norte (Mayor radiación solar)</SelectItem>
                  <SelectItem value="centro">Centro (Radiación moderada)</SelectItem>
                  <SelectItem value="sur">Sur (Menor radiación solar)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Edificación</Label>
              <Select onValueChange={(value) => manejarCambio("tipoEdificacion", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="residencial">Residencial</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={cargando}>
            {cargando ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculando...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-4 w-4" />
                Calcular Ahorro
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
