import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function RegistroEmpresa() {
  const { user, colaboradorContext, isColaboradorLinked, loading } =
    useContext(UserContext);
  const [producto, setProducto] = useState({
    nombre: "",
    rubro: "",
    puntosNecesarios: 0,
    imagen: "",
    colaboradorId: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const navigate = useNavigate();
  const localhost = "http://localhost:8080";

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

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
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("rubro", producto.rubro);
    formData.append("puntosNecesarios", producto.puntosNecesarios);
    formData.append("colaboradorId", producto.colaboradorId);
    formData.append("imagen", producto.imagen);
    try {
      const response = await fetch(localhost + "/contribuciones/ofertas", {
        method: "POST",
        body: formData,
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setProducto({
      ...producto,
      imagen: file, // Guardamos el archivo en lugar del URL blob
    });
  };

  return (
    <div className="RegistroEmpresa">
      <Sidebar />
      <h2 className="pb-2 animated-slideIn">
          Registrar Empresa para Ofrecer Beneficios
        </h2>
      <div className="content-heladera">

        {!isColaboradorLinked ? (
          <h1>Debes ser colaborador para realizar una donacion de vianda.</h1>
        ) : (
          <form className="needs-validation" noValidate onSubmit={addProducto}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">
                  Nombre de la oferta
                </label>
                <input
                  type="text"
                  
                  id="nombre"
                  placeholder="Nombre de la oferta"
                  required
                  onChange={(e) => handleChange("nombre", e.target.value)}
                />
                <div className="invalid-feedback">
                  Nombre de la oferta requerido.
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="rubro" className="form-label">
                  Rubro
                </label>
                <select
                  className="select-formulario"
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

              <div className="col-md-6">
                <label htmlFor="puntosNecesarios" className="form-label">
                  Puntos necesarios
                </label>
                <input
                  type="number"
                  
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

              {/* Carga de imágenes*/}
              <div className="col-md-6">
                <label htmlFor="imagen" className="form-label">
                  Imagen ilustrativa
                </label>
                <input
                  type="file"
                  
                  id="imagen"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div className="mt-2">
                  {producto.imagen && (
                    <img
                      src={producto.imagen}
                      alt="Incidente"
                      width="100"
                      className="me-2"
                    />
                  )}
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
