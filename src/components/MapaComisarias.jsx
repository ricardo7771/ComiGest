import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const icons = {
  normal: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
    iconSize: [32, 32],
  }),
  pendiente: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    iconSize: [32, 32],
  }),
  urgente: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
  }),
};

export default function MapaComisarias() {
  const [comisarias, setComisarias] = useState([]);

  useEffect(() => {
    fetch('/data/comisarias.json')
      .then((res) => res.json())
      .then((data) => setComisarias(data))
      .catch((err) => console.error('Error al cargar comisarías:', err));
  }, []);

  const centroMapa = comisarias.length > 0
    ? [comisarias[0].lat, comisarias[0].lng]
    : [20.967370, -89.592586]; // Fallback temporal

  return (
    <div className="h-screen w-full">
      <MapContainer center={centroMapa} zoom={11} className="h-full w-full" style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {comisarias.map(c => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={icons[c.estado]}>
            <Tooltip direction="top" offset={[0, -20]} permanent>
              <span className="font-semibold">{c.nombre}</span>
            </Tooltip>
            <Popup>
              <strong>{c.nombre}</strong><br />
              {c.registros.map((r, i) => (
                <div key={i}>• {r}</div>
              ))}
              <button className="mt-2 text-blue-600 underline">Ver Detalles</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
