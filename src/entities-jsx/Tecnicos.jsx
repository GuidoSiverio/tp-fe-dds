import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Tecnico() {
  const [tecnico, setTecnico] = useState({
    nombre: "",
    apellido: "",
    tipoDocumento: "",
    documento: "",
    cuit: "",
    medioContacto: "",
    areaCobertura: "",
  });
  const { user } = useContext(UserContext);

  const localhost = "http://localhost:8080";

  const navigate = useNavigate();

  useEffect(() => {
    if (user.rol !== "ADMIN") {
      navigate("/home");
    }
  }, [user, navigate]);

  async function addTecnico() {
    //e.preventDefault();
    try {
      const response = await fetch(localhost + "/tecnicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tecnico),
      });

      console.log("Register response:", response);
    } catch (error) {
      console.error("Error during register:", error);
      //setError(error);
    }
  }

  const handleChange = (field, value) => {
    setTecnico({
      ...tecnico,
      [field]: value,
    });
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().split(".")[0];
    handleChange(field, formattedDate);
  };

  return (
    <div className="Tecnico">
      <Sidebar />
      <div className="content">
        <h1 class="display-4 fw-normal">Alta Tecnico</h1>
        <br />
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-12"></div>

            <div className="col-12">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
                required
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
              <div className="invalid-feedback">Nombre requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
                required
                onChange={(e) => handleChange("apellido", e.target.value)}
              />
              <div className="invalid-feedback">Apellido requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="tipoDocumento" className="form-label">
                Tipo de Documento
              </label>
              <select
                type="text"
                className="form-control"
                id="tipoDocumento"
                placeholder="TipoDocumento"
                required
                onChange={(e) => handleChange("tipoDocumento", e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="CI">CI</option>
              </select>
              <div className="invalid-feedback">
                Tipo de Documento requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="documento" className="form-label">
                Documento
              </label>
              <input
                type="text"
                className="form-control"
                id="documento"
                placeholder="Documento"
                required
                onChange={(e) => handleChange("documento", e.target.value)}
              />
              <div className="invalid-feedback">Documento requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="cuil" className="form-label">
                CUIL
              </label>
              <input
                type="text"
                className="form-control"
                id="cuil"
                placeholder="Cuil"
                required
                onChange={(e) => handleChange("cuil", e.target.value)}
              />
              <div className="invalid-feedback">CUIL requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="medioContacto" className="form-label">
                Medio de Contacto
              </label>
              <select
                type="text"
                className="form-control"
                id="medioContacto"
                placeholder="MedioContacto"
                required
                onChange={(e) => handleChange("medioContacto", e.target.value)}
              >
                <option value="">Choose...</option>
                <option>Whatsapp</option>
                <option>Email</option>
              </select>
              <div className="invalid-feedback">
                Medio de Contacto requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="areaCobertura" className="form-label">
                Area de Cobertura
              </label>
              <input
                type="text"
                className="form-control"
                id="areaCobertura"
                placeholder="AreaCobertura"
                required
                onChange={(e) => handleChange("areaCobertura", e.target.value)}
              />
              <div className="invalid-feedback">
                Area de Cobertura requerido.
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <button
            className="w-100 btn btn-primary btn-lg"
            type="button"
            onClick={addTecnico}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Tecnico;
