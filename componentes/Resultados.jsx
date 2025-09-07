import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import ComparacionCostos from "./graficas/ComparacionCostos"
import AhorroTiempo from "./graficas/AhorroTiempo"
import { TrendingUp, DollarSign, Wrench, Clock, Leaf, Receipt, Calendar, TrendingDown } from "lucide-react"

export default function Resultados({ datos }) {
  if (!datos || typeof datos !== "object") {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Cargando resultados...</p>
        </div>
      </div>
    )
  }

  const tarjetas = [
    {
      titulo: "Energía Renovable Viable",
      valor: `${datos.energiaRentable || 0} kW`,
      descripcion: "Capacidad recomendada de instalación",
      icono: TrendingUp,
      color: "bg-primary",
    },
    {
      titulo: "Costo de Instalación",
      valor: `$${(datos.costoInstalacion || 0).toLocaleString()}`, // Validación agregada
      descripcion: "Inversión inicial estimada",
      icono: DollarSign,
      color: "bg-secondary",
    },
    {
      titulo: "Mantenimiento Anual",
      valor: `$${(datos.costoMantenimiento || 0).toLocaleString()}`, // Validación agregada
      descripcion: "Costo de mantenimiento por año",
      icono: Wrench,
      color: "bg-muted",
    },
    {
      titulo: "Retorno de Inversión",
      valor: `${datos.retornoInversion || 0} años`,
      descripcion: "Tiempo para recuperar la inversión",
      icono: Clock,
      color: "bg-accent",
    },
    {
      titulo: "Reducción de CO₂",
      valor: `${datos.reduccionCo2 || 0} kg/año`,
      descripcion: "Impacto ambiental positivo",
      icono: Leaf,
      color: "bg-primary",
    },
    {
      titulo: "Beneficios Tributarios",
      valor: `$${(datos.beneficiosTributarios || 0).toLocaleString()}`, // Validación agregada
      descripcion: "Deducciones fiscales estimadas",
      icono: Receipt,
      color: "bg-secondary",
    },
  ]

  const tarjetasAdicionales = [
    {
      titulo: "Años de Ganancia",
      valor: `${datos.aniosGanancia || 0} años`,
      descripcion: "Período de ganancias después del ROI",
      icono: TrendingDown,
      color: "bg-green-600",
    },
    {
      titulo: "Vida Útil del Sistema",
      valor: `${datos.vidaUtilAnios || 0} años`,
      descripcion: "Duración estimada de los paneles",
      icono: Calendar,
      color: "bg-blue-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Resultados del Cálculo</h2>
        <p className="text-muted-foreground">Análisis completo de beneficios económicos y ambientales</p>
      </div>

      {/* Tarjetas de resultados principales */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tarjetas.map((tarjeta, index) => {
          const Icono = tarjeta.icono
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{tarjeta.titulo}</CardTitle>
                  <div className={`p-2 rounded-md ${tarjeta.color}`}>
                    <Icono className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{tarjeta.valor}</div>
                <p className="text-xs text-muted-foreground mt-1">{tarjeta.descripcion}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {tarjetasAdicionales.map((tarjeta, index) => {
          const Icono = tarjeta.icono
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{tarjeta.titulo}</CardTitle>
                  <div className={`p-2 rounded-md ${tarjeta.color}`}>
                    <Icono className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{tarjeta.valor}</div>
                <p className="text-xs text-muted-foreground mt-1">{tarjeta.descripcion}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Resumen de Ahorro e Inversión</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">${(datos.ahorroMensual || 0).toLocaleString()}/mes</p>{" "}
              {/* Validación agregada */}
              <p className="text-sm text-muted-foreground">Ahorro mensual estimado en tu factura eléctrica</p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              75% menos
            </Badge>
          </div>

          <div className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-green-600">
                  ${(datos.gananciaTotalVidaUtil || 0).toLocaleString()}
                </p>{" "}
                {/* Validación agregada */}
                <p className="text-xs text-muted-foreground">Ganancia total en {datos.vidaUtilAnios || 0} años</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-blue-600">
                  {datos.retornoInversion || 0} + {datos.aniosGanancia || 0} años
                </p>
                <p className="text-xs text-muted-foreground">Recuperación + Ganancia</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ComparacionCostos datos={datos.datosGraficas?.comparacionCostos || []} /> {/* Validación agregada */}
        <AhorroTiempo datos={datos.datosGraficas?.ahorroTiempo || []} /> {/* Validación agregada */}
      </div>
    </div>
  )
}
