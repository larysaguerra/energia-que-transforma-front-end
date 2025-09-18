'use client';

import { useState, useEffect } from "react";
import Encabezado from "../../componentes/Encabezado";
import PiePagina from "../../componentes/PiePagina";
import { obtenerProductos } from "../../servicios/apiEnergia";
import { Skeleton } from "../../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Zap, DollarSign, Percent, Wrench, ShieldCheck, Settings } from 'lucide-react';

const ProductSkeleton = () => (
  <Card className="flex flex-col">
    <CardHeader className="p-0">
      <Skeleton className="w-full h-48 rounded-t-lg" />
    </CardHeader>
    <CardContent className="p-4 flex-grow">
      <Skeleton className="h-5 w-1/4 mb-2" />
      <Skeleton className="h-6 w-3/4 mb-1" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />
      </div>
    </CardContent>
    <CardFooter className="p-4 flex justify-between items-center">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-10 w-1/4" />
    </CardFooter>
  </Card>
);

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await obtenerProductos();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Encabezado />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Catálogo de Productos</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error al Cargar Productos</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)
          ) : (
            products.map((product) => (
              <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0 relative">
                  <img 
                    src={product.urlImagen || "/placeholder.svg"} 
                    alt={product.nombre} 
                    className="w-full h-48 object-cover rounded-t-lg" 
                  />
                  <Badge className="absolute top-2 right-2">{product.tipo?.nombre || 'General'}</Badge>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <h2 className="text-xl font-bold mb-1">{product.nombre}</h2>
                  <p className="text-sm text-muted-foreground mb-4">por {product.fabricante}</p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      <span><span className="font-semibold text-foreground">{product.capacidadKw} kW</span> de capacidad</span>
                    </div>
                    <div className="flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2 text-primary" />
                      <span><span className="font-semibold text-foreground">{product.vidaUtilAnhos} años</span> de vida útil</span>
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 mr-2 text-primary" />
                      <span>Instalación <span className="font-semibold text-foreground">{product.complejidadInstalacion}</span></span>
                    </div>
                     <div className="flex items-center">
                      <Wrench className="w-4 h-4 mr-2 text-primary" />
                      <span>Mantenimiento <span className="font-semibold text-foreground">{product.nivelMantenimiento}</span></span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 flex justify-between items-center bg-muted/40">
                  <div className="flex flex-col">
                     <span className="font-bold text-xl">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.costoUnitario)}</span>
                     <span className="text-xs text-muted-foreground">Costo unitario</span>
                  </div>
                  <Button>Ver más</Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
      <PiePagina />
    </div>
  );
}