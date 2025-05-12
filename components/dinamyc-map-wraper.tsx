// components/DynamicMapWrapper.tsx
"use client"; // <-- ¡Este componente es un Cliente!

import dynamic from 'next/dynamic';
import React from 'react'; // Necesario para usar React.FC o simplemente JSX

// Define la interfaz para las props que este wrapper recibirá
// Debe coincidir con las props que RealIncidentsMap espera
interface DynamicMapWrapperProps {
  incidents: { // Define la estructura mínima que necesitas pasar
    id: string | number;
    lat: number;
    lng: number;
    type: string;
    description: string;
    time?: string;
  }[]; // incidents es un array de objetos con esta estructura
  initialPosition?: [number, number];
  zoom?: number;
}


// Importa el componente RealIncidentsMap dinámicamente y SÓLO en el cliente
// Ahora, el `dynamic` con `ssr: false` está DENTRO de un componente cliente.
const DynamicMap = dynamic(() =>
  import('@/components/map').then((mod) => mod.Map),
  {
    ssr: false, // <-- Esto ahora es válido porque está en un componente cliente
    // Opcional: Puedes añadir un componente de carga mientras el mapa se carga
    // loading: () => <p>Cargando mapa...</p>,
  }
);

// Define el componente wrapper
const DynamicMapWrapper: React.FC<DynamicMapWrapperProps> = ({
  incidents,
  initialPosition,
  zoom,
}) => {
  // Renderiza el componente de mapa dinámico, pasándole las props que recibió
  return (
    <DynamicMap
      incidents={incidents}
      initialPosition={initialPosition}
      zoom={zoom}
    />
  );
};

export default DynamicMapWrapper;