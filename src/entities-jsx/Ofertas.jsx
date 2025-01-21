import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

function Ofertas() {
  const {
    user,
    collaborator: colaborador,
    isCollaboratorLinked: isColaboradorLinked,
  } = useContext(UserContext);
  const [puntosDisponibles, setPuntosDisponibles] = useState(0);
  const [ofertas, setOfertas] = useState([]);

  const [colaboradorId, setColaboradorId] = useState("");

  const localhost = "http://localhost:8080";

  useEffect(() => {
    if (!user) {
      return;
    }

    // Obtener puntos disponibles desde el backend
    fetch(localhost + `/colaboradores/${colaborador.id}/puntos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPuntosDisponibles(data))
      .catch((error) => console.error("Error al obtener puntos:", error));

    // Obtener ofertas desde el backend
    fetch(localhost + "/contribuciones/ofertas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOfertas(data);
        console.log("Datos recibidos del backend:", data);
      })
      .catch((error) => console.error("Error al obtener ofertas:", error));
  }, [user]);

  const handleObtenerOferta = (ofertaId) => {
    // Lógica para obtener una oferta
    fetch(localhost + `/contribuciones/ofertas/${ofertaId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Oferta obtenida con éxito.");
          // Actualizar puntos después de obtener una oferta
          return response.json();
        } else {
          throw new Error("No se pudo obtener la oferta.");
        }
      })
      .then((data) => setPuntosDisponibles(data.puntosActualizados))
      .catch((error) => alert(error.message));
  };

  if (!user) {
    return <p>Por favor, inicia sesión.</p>;
  }

  return (
    <div className="Ofertas">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">Ofertas Disponibles</h1>
        <div className="puntos-disponibles">
          <h3>Puntos disponibles: {puntosDisponibles}</h3>
        </div>
        <div className="container">
          <div className="row">
            {ofertas.map((oferta) => (
              <div className="col-md-6 mb-4" key={oferta.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{oferta.nombre}</h5>
                    <img
                      src={oferta.imagen}
                      className="card-img-top"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                    <p className="card-text">{oferta.rubro}</p>
                    <p className="card-text">
                      Puntos Necesarios: {oferta.puntosNecesarios}
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleObtenerOferta(oferta.id)}
                      disabled={oferta.puntosNecesarios > puntosDisponibles}
                    >
                      Obtener
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ofertas;
