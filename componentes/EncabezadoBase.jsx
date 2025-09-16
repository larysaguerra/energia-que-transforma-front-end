import { Leaf, Zap } from "lucide-react"

export default function EncabezadoBase() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-balance">Energía que transforma</h1>
              <p className="text-primary-foreground/80 text-sm">De lo convencional a lo sostenible</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
