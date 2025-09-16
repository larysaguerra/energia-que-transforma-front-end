'use client';

import { useState, useEffect } from "react";
import Encabezado from "../../componentes/Encabezado";
import PiePagina from "../../componentes/PiePagina";
import { obtenerProductos } from "../../servicios/apiEnergia";
import { Skeleton } from "../../components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

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
        <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos de Energía Renovable</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error al Cargar Productos</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border rounded-lg p-4 flex flex-col">
                <Skeleton className="w-full h-48 rounded-md mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex justify-between items-center mt-auto">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-10 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 flex flex-col bg-card text-card-foreground">
                <img 
                  src={product.imageUrl || "/placeholder.svg"} 
                  alt={product.nombre} 
                  className="w-full h-48 object-cover rounded-md mb-4" 
                />
                <h2 className="text-xl font-semibold mb-2">{product.nombre}</h2>
                <p className="text-muted-foreground flex-grow">{product.descripcion}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg">{`${product.precio}`}</span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <PiePagina />
    </div>
  );
}
