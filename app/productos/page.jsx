"use client";

import Encabezado from "../../componentes/Encabezado";
import PiePagina from "../../componentes/PiePagina";

const products = [
  {
    id: 1,
    name: "Paneles Solares de Alta Eficiencia",
    description: "Paneles solares monocristalinos para una máxima captación de energía. Ideales para residencias y comercios.",
    price: "Desde $250",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Turbina Eólica Residencial",
    description: "Genera tu propia energía con esta turbina eólica silenciosa y de fácil instalación. Perfecta para zonas con buen recurso eólico.",
    price: "Desde $1,500",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Baterías de Almacenamiento de Energía",
    description: "Almacena el excedente de energía generado para usarlo cuando más lo necesites. Compatible con sistemas solares y eólicos.",
    price: "Desde $800",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Calentador de Agua Solar",
    description: "Reduce tu consumo de gas o electricidad calentando agua con la energía del sol. Sistema eficiente y de bajo mantenimiento.",
    price: "Desde $400",
    imageUrl: "/placeholder.svg",
  },
];

export default function ProductosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Encabezado />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos de Energía Renovable</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-muted-foreground flex-grow">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">{product.price}</span>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Ver más</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <PiePagina />
    </div>
  );
}
