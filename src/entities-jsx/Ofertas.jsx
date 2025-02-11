import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

function Ofertas() {
  const { user, colaboradorContext, isColaboradorLinked } =
    useContext(UserContext);
  const [puntosDisponibles, setPuntosDisponibles] = useState(0);
  const [ofertas, setOfertas] = useState([]);
  const localhost = "http://localhost:8080";
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const fetchOfertasYPuntos = () => {
    if (!user || !isColaboradorLinked) {
      return;
    }

    // Obtener puntos disponibles desde el backend
    fetch(localhost + `/colaboradores/${colaboradorContext.id}/puntos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setPuntosDisponibles(data))
      .catch((error) => console.error("Error al obtener puntos:", error));

    // Obtener ofertas desde el backend
    fetch(localhost + `/contribuciones/ofertas/${colaboradorContext.id}`, {
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
  };

  useEffect(() => {
    fetchOfertasYPuntos();
  }, [user, isColaboradorLinked]);

  async function handleObtenerOferta(ofertaId) {
    // Lógica para obtener una oferta
    try {
      const response = await fetch(
        localhost + `/contribuciones/ofertas/${ofertaId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(colaboradorContext.id),
        }
      );

      if (response.ok) {
        setMessage("Oferta obtenida exitósamente.");
        setMessageType("success");
        fetchOfertasYPuntos();
      } else {
        setMessage("Error al obtener la oferta.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  if (!user) {
    return <p>Por favor, inicia sesión.</p>;
  }

  return (
    <div className="Ofertas">
      <Sidebar />
      {!isColaboradorLinked ? (
        <h1>Debes ser colaborador para acceder a las ofertas disponibles.</h1>
      ) : (
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
      )}
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          } mt-4`}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Ofertas;
