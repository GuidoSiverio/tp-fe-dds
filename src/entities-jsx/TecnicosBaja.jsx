import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function BajaTecnico() {
  const [tecnicos, setTecnicos] = useState([]); // Lista de técnicos
  const [tecnicoId, setTecnicoId] = useState(""); // Técnico seleccionado
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const localhost = "http://localhost:8080";

  // Cargar lista de técnicos al montar el componente
  useEffect(() => {
    async function fetchTecnicos() {
      try {
        const response = await fetch(`${localhost}/tecnicos`);
        if (response.ok) {
          const data = await response.json();
          setTecnicos(data);
        } else {
          console.error("Error al cargar la lista de técnicos");
        }
      } catch (error) {
        console.error("Error durante la carga de técnicos:", error);
      }
    }

    fetchTecnicos();
  }, []);

  const handleBajaTecnico = async () => {
    if (!tecnicoId) {
      alert("Por favor, seleccione un técnico para dar de baja.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${localhost}/tecnicos/${tecnicoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Técnico dado de baja con éxito");
        setTecnicos(tecnicos.filter((tec) => tec.id !== tecnicoId)); // Remover técnico eliminado de la lista
        setTecnicoId(""); // Reiniciar la selección
      } else {
        alert("Error al dar de baja al técnico");
      }
    } catch (error) {
      console.error("Error durante la baja:", error);
      alert("Error al dar de baja al técnico");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="BajaTecnico">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Dar de Baja Técnico</h1>
        <br />

        {loading ? (
          <div>Cargando...</div>
        ) : (
          <div>
            <div className="mb-3">
              <label htmlFor="tecnicoSelect" className="form-label">
                Seleccione un Técnico
              </label>
              <select
                id="tecnicoSelect"
                className="form-select"
                value={tecnicoId}
                onChange={(e) => setTecnicoId(e.target.value)}
              >
                <option value="">Seleccione...</option>
                {tecnicos.map((tec) => (
                  <option key={tec.id} value={tec.id}>
                    {tec.nombre} {tec.apellido}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-danger w-100"
              onClick={handleBajaTecnico}
            >
              Dar de Baja
            </button>
          </div>
        )}

        {error && <div className="text-danger mt-3">Error: {error}</div>}
      </div>
    </div>
  );
}

export default BajaTecnico;
