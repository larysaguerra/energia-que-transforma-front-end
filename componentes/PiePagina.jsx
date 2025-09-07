import { Leaf, Mail, Phone, MapPin } from "lucide-react"

export default function PiePagina() {
  return (
    <footer className="bg-muted mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Información de la empresa */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">EcoCalculadora</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Ayudamos a empresas y hogares a tomar decisiones informadas sobre la migración a energías renovables,
              calculando beneficios económicos y ambientales.
            </p>
          </div>
          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@ecocalculadora.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+51 000 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Medellin - Colombia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 EcoCalculadora. Todos los derechos reservados. Contribuyendo a un futuro más sostenible.
          </p>
        </div>
      </div>
    </footer>
  )
}
