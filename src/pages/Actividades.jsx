import React, { useState } from 'react';

const Actividades = () => {
  const [seccionActiva, setSeccionActiva] = useState('crearPrograma');
  const [programa, setPrograma] = useState('');
  const [actividad, setActividad] = useState('');
  const [programas, setProgramas] = useState(['Programa A', 'Programa B', 'Programa C']);
  const [programaSeleccionado, setProgramaSeleccionado] = useState('');
  const [actividadesAsignadas, setActividadesAsignadas] = useState([]);
  const [comisaria, setComisaria] = useState({
    nombre: '',
    telefono: '',
    filiacion: '',
    folio: '',
  });

  const handleGuardarPrograma = () => {
    if (programa.trim() === '') return alert('Ingresa un nombre para el Reporte');
    console.log('Programa guardado:', programa);
    setProgramas([...programas, programa]);
    setPrograma('');
  };

  const handleGuardarComisaria = () => {
    console.log('Datos de comisaría guardados:', comisaria);
  };

  const handleAsignarActividad = () => {
    if (!actividad || !programaSeleccionado) {
      alert('Completa nombre de actividad y programa');
      return;
    }
    const nuevaActividad = {
      nombre: actividad,
      programa: programaSeleccionado,
    };
    setActividadesAsignadas([...actividadesAsignadas, nuevaActividad]);
    console.log(`Actividad "${actividad}" asignada a "${programaSeleccionado}"`);
    setActividad('');
    setProgramaSeleccionado('');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Menú lateral */}
      <aside className="w-full md:w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Menú</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setSeccionActiva('crearPrograma')}
            className={`flex items-center w-full px-4 py-2 rounded ${
              seccionActiva === 'crearPrograma'
                ? 'bg-white text-blue-900 font-semibold'
                : 'bg-blue-800 hover:bg-blue-700'
            }`}
          >
            <span className="mr-2">➕</span> Crear Reporte
          </button>

          <button
            onClick={() => setSeccionActiva('asignarActividad')}
            className={`flex items-center w-full px-4 py-2 rounded ${
              seccionActiva === 'asignarActividad'
                ? 'bg-white text-blue-900 font-semibold'
                : 'bg-blue-800 hover:bg-blue-700'
            }`}
          >
            <span className="mr-2">🧩</span> Asignar Actividad
          </button>

          <button
            onClick={() => setSeccionActiva('verActividades')}
            className={`flex items-center w-full px-4 py-2 rounded ${
              seccionActiva === 'verActividades'
                ? 'bg-white text-blue-900 font-semibold'
                : 'bg-blue-800 hover:bg-blue-700'
            }`}
          >
            <span className="mr-2">📋</span> Ver Actividades
          </button>

          <button
            onClick={() => setSeccionActiva('editarComisaria')}
            className={`flex items-center w-full px-4 py-2 rounded ${
              seccionActiva === 'editarComisaria'
                ? 'bg-white text-blue-900 font-semibold'
                : 'bg-blue-800 hover:bg-blue-700'
            }`}
          >
            <span className="mr-2">⚙️</span> Editar Comisaría
          </button>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-blue-50 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Gestión de Actividades</h1>

        {seccionActiva === 'crearPrograma' && (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Crear Programa</h2>
            <input
              type="text"
              placeholder="Nombre del Programa"
              value={programa}
              onChange={(e) => setPrograma(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <button
              onClick={handleGuardarPrograma}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Guardar Programa
            </button>
          </div>
        )}

        {seccionActiva === 'asignarActividad' && (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Asignar Actividad</h2>
            <input
              type="text"
              placeholder="Nombre de la Actividad"
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <select
              value={programaSeleccionado}
              onChange={(e) => setProgramaSeleccionado(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            >
              <option value="">Selecciona un programa</option>
              {programas.map((prog, i) => (
                <option key={i} value={prog}>{prog}</option>
              ))}
            </select>
            <button
              onClick={handleAsignarActividad}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Asignar Actividad
            </button>
          </div>
        )}

        {seccionActiva === 'verActividades' && (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Actividades Asignadas</h2>
            {actividadesAsignadas.length === 0 ? (
              <p className="text-gray-600">No hay actividades asignadas aún.</p>
            ) : (
              <ul className="list-disc pl-6">
                {actividadesAsignadas.map((act, index) => (
                  <li key={index} className="mb-2">
                    <strong>{act.nombre}</strong> asignada al <em>{act.programa}</em>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {seccionActiva === 'editarComisaria' && (
          <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-900">Editar Datos de Comisaría</h2>
            <input
              type="text"
              placeholder="Nombre del Comisario"
              value={comisaria.nombre}
              onChange={(e) => setComisaria({ ...comisaria, nombre: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={comisaria.telefono}
              onChange={(e) => setComisaria({ ...comisaria, telefono: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <input
              type="text"
              placeholder="Filiación"
              value={comisaria.filiacion}
              onChange={(e) => setComisaria({ ...comisaria, filiacion: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <input
              type="text"
              placeholder="Folio"
              value={comisaria.folio}
              onChange={(e) => setComisaria({ ...comisaria, folio: e.target.value })}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <button
              onClick={handleGuardarComisaria}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Guardar Comisaría
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Actividades;
