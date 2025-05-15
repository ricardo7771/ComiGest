import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Iconos personalizados
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

const comisarias = [
  { id: 1, nombre: 'Comisaría A', lat: 20.967370, lng: -89.592586, estado: 'normal', registros: ['Deshierbe programado', 'Limpieza terminada'] },
  { id: 2, nombre: 'Comisaría B', lat: 20.974121, lng: -89.610478, estado: 'pendiente', registros: ['Parque sin luz', 'Solicitan brigada'] },
  { id: 3, nombre: 'Comisaría C', lat: 20.955631, lng: -89.602013, estado: 'urgente', registros: ['Protesta vecinal activa'] },
];

export default function MapaComisarias() {
  return (
    <div className="h-screen w-full">
      <MapContainer center={[20.967370, -89.592586]} zoom={13} className="h-full w-full" style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {comisarias.map(c => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={icons[c.estado]}>
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
