import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const [distritos, setDistritos] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/comisarias.json')
      .then((res) => res.json())
      .then((data) => setComisarias(data))
      .catch((err) => console.error('Error al cargar comisarías:', err));

    fetch('/data/distritos.geojson')
      .then((res) => res.json())
      .then((data) => setDistritos(data))
      .catch((err) => console.error('Error al cargar distritos:', err));
  }, []);

  const centroMapa =
    comisarias.length > 0
      ? [comisarias[0].lat, comisarias[0].lng]
      : [20.967370, -89.592586];

  return (
    <div className="h-screen w-full">
      <Button
        onClick={() => navigate('/')}
        variant="outline"
        className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg rounded-lg"
      >
        Regresar
      </Button>

      <MapContainer
        center={centroMapa}
        zoom={13}
        className="h-full w-full"
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Mostrar distritos si están cargados */}
        {distritos && (
          <GeoJSON
            data={distritos}
            style={{
              color: '#0077cc',
              weight: 2,
              fillOpacity: 0.2,
            }}
            onEachFeature={(feature, layer) => {
              if (feature.properties?.nombre) {
                layer.bindTooltip(`Distrito: ${feature.properties.nombre}`, {
                  sticky: true,
                });
              }
            }}
          />
        )}

        {/* Marcadores de comisarías */}
        {comisarias.map((c) => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={icons[c.estado]}>
            <Tooltip direction="top" offset={[0, -20]} permanent>
              <span className="font-semibold">{c.nombre}</span>
            </Tooltip>
            <Popup>
              <strong>{c.nombre}</strong>
              <br />
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
