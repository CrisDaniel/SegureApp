// components/IncidentsMap.tsx
"use client"; 
import React , { useRef, useState } from 'react'; // Aunque no siempre es necesario importar React explícitamente en React 17+ JSX, es buena práctica en archivos TSX
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa los estilos CSS de Leaflet

// Importa L desde leaflet para poder usar sus funcionalidades, como el fix del ícono
import L from 'leaflet';

// --- Definición de Tipos ---

// Define la estructura esperada para un objeto de Incidencia
interface Incident {
  id: string | number; // El ID puede ser string o número, elige el que uses en tu API
  lat: number; // Latitud
  lng: number; // Longitud
  type: string; // Tipo de incidencia (ej: "Robo", "Vandalismo")
  description: string; // Descripción de la incidencia
  // Añade aquí cualquier otra propiedad que tu objeto de incidencia tenga y uses
  // timestamp?: string; // Ejemplo: si tienes un timestamp opcional
}

// Define las props que espera el componente IncidentsMap
interface IncidentsMapProps {
  incidents?: Incident[]; // Array de objetos Incident, opcional con valor por defecto
  initialPosition?: [number, number]; // Tupla de [lat, lng] para la posición inicial, opcional con valor por defecto
  zoom?: number; // Nivel de zoom inicial, opcional con valor por defecto
  setLocation?: any;
}

// --- FIX para el ícono predeterminado de Leaflet en Webpack/Next.js ---
// Esto es necesario para que el ícono del marcador se muestre correctamente.
// Asegúrate de que estas URLs sean accesibles.
delete (L.Icon.Default.prototype as any)._getIconUrl; // Necesitamos 'as any' porque _getIconUrl puede no estar en los tipos originales de L.Icon.Default
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
// --- FIN del FIX ---

const MapEvents = ({setLocation}: {setLocation: any}) => {
  const map = useMapEvents({
    click: (e) => {
      // i need when i click on the map this event capture the position of the click
      setLocation({lat: e.latlng.lat, lng: e.latlng.lng})
    },
    zoomend: () => {
      console.log("zoomend de prueba")
    },
    // Add more event listeners as needed (e.g., dragend, moveend)
  });
  return null; // No renderiza nada, solo maneja eventos
};


// Define el componente funcional, tipando sus props
export const Map: React.FC<IncidentsMapProps> = ({
  incidents = [], // Valor por defecto para si no se pasa incidents
  initialPosition = [-12.046374, -77.042793], // Valor por defecto para la posición
  zoom = 13,
  setLocation // Valor por defecto para el zoom
}) => {

  console.log("Los inicidetes son", incidents)
  
  return (
    // MapContainer es el componente que inicializa el mapa
    <MapContainer
      center={initialPosition} // Centro inicial del mapa [lat, lng]
      zoom={zoom}             // Nivel de zoom inicial
      scrollWheelZoom={false} // Deshabilita zoom con scroll si prefieres
      style={{ width: '100%', height: '100%',zIndex: 1 ,borderRadius: '.5rem'}}
      className="map-container"
      // className="map-container" // Aplica la clase CSS definida globalmente para el tamaño

    >
      {/* TileLayer agrega la capa base del mapa (los "tiles" o imágenes del mapa) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL de OpenStreetMap
      />

      {/* Mapeamos sobre el array de incidencias para crear un marcador por cada una */}
      {incidents.map(incident => (
        // TypeScript ahora sabe que 'incident' es del tipo 'Incident',
        // y autocompletará 'incident.lat', 'incident.lng', etc.
        <Marker
          key={incident.id} // Usar una key única es importante para React
          position={[incident.lat, incident.lng]} // Posición del marcador [lat, lng]
        >
          {/* Popup es lo que aparece al hacer clic en el marcador */}
          <Popup>
            {/* Accedemos a las propiedades tipadas */}
            <strong>Tipo de Incidencia:</strong> {incident.type}<br/>
            {incident.description}<br/>
            {/* Puedes añadir aquí más detalles de la incidencia si los tienes */}
          </Popup>
        </Marker>
      ))}
      {setLocation && (
      <MapEvents setLocation={setLocation}/>
      )}
    </MapContainer>
  );
};
