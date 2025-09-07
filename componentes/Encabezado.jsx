import { Leaf, Zap } from "lucide-react"

export default function Encabezado() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">Calculadora de Ahorro Energético</h1>
              <p className="text-primary-foreground/80 text-sm">
                Descubre los beneficios de migrar a energías renovables
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-primary-foreground/80">Calcula tu impacto</p>
              <p className="font-semibold">Ambiental y Económico</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
