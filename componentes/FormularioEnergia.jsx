"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calculator, Loader2, Building, MapPin, Bolt, CircleDollarSign } from "lucide-react"

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

    if (
      !datosFormulario.consumoMensualKw ||
      !datosFormulario.costoMensualPesos ||
      !datosFormulario.ubicacion ||
      !datosFormulario.tipoEdificacion
    ) {
      alert("Por favor completa todos los campos")
      return
    }

    const datosNumericos = {
      ...datosFormulario,
      consumoMensualKw: Number.parseFloat(datosFormulario.consumoMensualKw),
      costoMensualPesos: Number.parseFloat(datosFormulario.costoMensualPesos),
    }

    onCalcular(datosNumericos)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Calculator className="h-6 w-6" />
          Calculadora de Ahorro Energético
        </CardTitle>
        <CardDescription>
          Estima los beneficios de cambiar a energías renovables.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="consumo">Consumo Mensual (kW)</Label>
              <div className="relative">
                <Bolt className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="consumo"
                  type="number"
                  placeholder="Ej: 350"
                  value={datosFormulario.consumoMensualKw}
                  onChange={(e) => manejarCambio("consumoMensualKw", e.target.value)}
                  min="0"
                  step="0.01"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="costo">Costo Mensual ($)</Label>
              <div className="relative">
                <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="costo"
                  type="number"
                  placeholder="Ej: 2500"
                  value={datosFormulario.costoMensualPesos}
                  onChange={(e) => manejarCambio("costoMensualPesos", e.target.value)}
                  min="0"
                  step="0.01"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Ubicación Geográfica</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Select onValueChange={(value) => manejarCambio("ubicacion", value)}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Selecciona tu región" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="norte">Norte (Mayor radiación solar)</SelectItem>
                    <SelectItem value="centro">Centro (Radiación moderada)</SelectItem>
                    <SelectItem value="sur">Sur (Menor radiación solar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Edificación</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Select onValueChange={(value) => manejarCambio("tipoEdificacion", value)}>
                  <SelectTrigger className="pl-10">
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
          </div>

          <Button type="submit" className="w-full text-lg py-6" disabled={cargando}>
            {cargando ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Calculando...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Ahorro
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
