// src/pages/Actividades.jsx
import { useState } from 'react'
import CrearPrograma from '../components/CrearProgramas'
import AsignarActividad from '../components/AsignarActividades'

export default function Actividades() {
  const [programas, setProgramas] = useState([])
  const [actividades, setActividades] = useState([])

  const agregarPrograma = (nuevo) => setProgramas([...programas, nuevo])
  const asignarActividad = (nueva) => setActividades([...actividades, nueva])

  return (
    <div className="min-h-screen bg-blue-50 p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-800">Gestión de Actividades</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CrearPrograma onAgregar={agregarPrograma} />
        <AsignarActividad programas={programas} onAsignar={asignarActividad} />
      </div>

      <div className="bg-white p-6 mt-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Actividades Programadas</h2>
        {actividades.length === 0 ? (
          <p className="text-gray-500">No hay actividades registradas aún.</p>
        ) : (
          <ul className="space-y-2">
            {actividades.map((a) => (
              <li key={a.id} className="border p-4 rounded bg-blue-50">
                📍 <strong>{a.comisaria}</strong><br />
                📅 {a.fecha} 🕘 {a.hora}<br />
                🧩 Programa: <strong>{a.programaNombre}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
