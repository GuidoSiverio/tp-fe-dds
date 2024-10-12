import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Heladera() {
  const [heladera, setHeladera] = useState({
    longitud: "",
    latitud: "",
    direccion: "",
    nombre: "",
    capacidad: "",
    fechaFuncionamiento: "",
  });
  const localhost = "http://localhost:8080";

  async function addHeladera() {
    //e.preventDefault();
    try {
      const response = fetch(localhost + "/heladeras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(heladera),
      });

      console.log("Register response:", response);
    } catch (error) {
      console.error("Error during register:", error);
      setError(error);
    }
  }

  const handleChange = (key, value) => {
    setHeladera({
      ...heladera,
      [key]: value,
    });
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().slice(0, -1);
    handleChange(field, formattedDate);
  };

  return (
    <div className="Heladera">
      <Sidebar />
      <div className="content">
        <h1 class="display-4 fw-normal">Heladera</h1>
        <br />
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <form className="needs-validation" novalidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="nombre"
                className="form-control"
                id="nombre"
                placeholder="Nombre"
                required
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
              <div className="invalid-feedback">Nombre requerido</div>
            </div>

            <div className="col-12">
              <label htmlFor="longitud" className="form-label">
                Longitud
              </label>
              <input
                type="text"
                className="form-control"
                id="longitud"
                placeholder="Longitud"
                required
                onChange={(e) => handleChange("longitud", e.target.value)}
              />
              <div className="invalid-feedback">Longitud requerida.</div>
            </div>

            <div className="col-12">
              <label htmlFor="latitud" className="form-label">
                Latitud
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="latitud"
                  placeholder="Latitud"
                  required
                  onChange={(e) => handleChange("latitud", e.target.value)}
                />
                <div className="invalid-feedback">Latitud requerida.</div>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="direccion" className="form-label">
                Direccion
              </label>
              <input
                type="direccion"
                className="form-control"
                id="direccion"
                placeholder="Direccion"
                required
                onChange={(e) => handleChange("direccion", e.target.value)}
              />
              <div className="invalid-feedback">Direccion requerida</div>
            </div>

            <div className="col-12">
              <label htmlFor="capacidad" className="form-label">
                Capacidad
              </label>
              <input
                type="capacidad"
                className="form-control"
                id="capacidad"
                placeholder="Capacidad"
                required
                onChange={(e) => handleChange("capacidad", e.target.value)}
              />
              <div className="invalid-feedback">Capacidad requerida</div>
            </div>

            <div className="col-12">
              <label htmlFor="date" className="form-label">
                Fecha de funcionamiento
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                onChange={(e) =>
                  handleDateChange("fechaFuncionamiento", e.target.value)
                }
              />
              <div className="invalid-feedback">
                Fecha de funcionamiento requerida.
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <button
            className="w-100 btn btn-primary btn-lg"
            type="submit"
            onClick={addHeladera}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Heladera;
