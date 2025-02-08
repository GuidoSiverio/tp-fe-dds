import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";

function RegistroEmpresa() {
  const { colaboradorContext, isColaboradorLinked } = useContext(UserContext);
  const [producto, setProducto] = useState({
    nombre: "",
    rubro: "",
    puntosNecesarios: 0,
    imagen: "",
    colaboradorId: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const localhost = "http://localhost:8080";

  useEffect(() => {
    if (isColaboradorLinked && colaboradorContext?.id) {
      setProducto((prev) => ({
        ...prev,
        colaboradorId: colaboradorContext.id,
      }));
    }
  }, [isColaboradorLinked, colaboradorContext]);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (field, value) => {
    setProducto({
      ...producto,
      [field]: value,
    });
  };

  // Función para manejar el envío del formulario
  async function addProducto(e) {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    try {
      const response = await fetch(localhost + "/contribuciones/ofertas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (response.ok) {
        setMessage("Oferta registrada exitósamente.");
        setMessageType("success");
      } else {
        setMessage("Error al registrar la oferta.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error durante la solicitud: " + error.message);
      setMessageType("error");
    }
  }

  return (
    <div className="RegistroEmpresa">
      <Sidebar />
      <div className="content">
        <h1 className="display-4 fw-normal">
          Registrar Empresa para Ofrecer Beneficios
        </h1>
        <br />
        {!isColaboradorLinked ? (
          <h1>Debes ser colaborador para realizar una donacion de vianda.</h1>
        ) : (
          <form className="needs-validation" noValidate onSubmit={addProducto}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="nombre" className="form-label">
                  Nombre de la oferta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre de la oferta"
                  required
                  onChange={(e) => handleChange("nombre", e.target.value)}
                />
                <div className="invalid-feedback">
                  Nombre de la oferta requerido.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="rubro" className="form-label">
                  Rubro
                </label>
                <select
                  className="form-select"
                  id="rubro"
                  required
                  onChange={(e) => handleChange("rubro", e.target.value)}
                >
                  <option value="">Seleccione...</option>
                  <option value="gastronomia">Gastronomía</option>
                  <option value="electronica">Electrónica</option>
                  <option value="articulosHogar">
                    Artículos para el hogar
                  </option>
                  <option value="ropa">Ropa</option>
                  <option value="otros">Otros</option>
                </select>
                <div className="invalid-feedback">Rubro requerido.</div>
              </div>

              <div className="col-12">
                <label htmlFor="puntosNecesarios" className="form-label">
                  Puntos necesarios
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="puntosNecesarios"
                  placeholder="Cantidad de puntos"
                  required
                  onChange={(e) =>
                    handleChange("puntosNecesarios", e.target.value)
                  }
                />
                <div className="invalid-feedback">
                  Cantidad de puntos requerida.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="imagen" className="form-label">
                  Imagen ilustrativa
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="imagen"
                  placeholder="URL de la imagen"
                  onChange={(e) => handleChange("imagen", e.target.value)}
                />
                <div className="invalid-feedback">
                  Debe ingresar una URL válida si desea agregar una imagen.
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Registrar Oferta
            </button>
          </form>
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
    </div>
  );
}

export default RegistroEmpresa;
