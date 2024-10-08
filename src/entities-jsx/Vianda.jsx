import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Vianda() {
  const [vianda, setVianda] = useState({
    comida: "",
    fechaCaducidad: "",
    fechaDonacion: "",
    calorias: "",
    peso: "",
    fechaEntrega: "",
    fueEntregada: "",
    colaborador: "",
  });
  const localhost = "http://localhost:8080";

  async function addVianda() {
    //e.preventDefault();
    try {
      const response = fetch(localhost + "/vianda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vianda),
      });

      console.log("Register response:", response);
    } catch (error) {
      console.error("Error during register:", error);
      setError(error);
    }
  }

  const handleChange = (key, value) => {
    setVianda({
      ...vianda,
      [key]: value,
    });
  };

  return (
    <div className="Vianda">
      <Sidebar />
      <div className="content">
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="comida" className="form-label">
                Comida
              </label>
              <input
                type="text"
                className="form-control"
                id="comida"
                placeholder="Comida"
                required
                onChange={(e) => handleChange("comida", e.target.value)}
              />
              <div className="invalid-feedback">
                Nombre de la comida requerida.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="date" className="form-label">
                Fecha de caducidad
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                required
                onChange={(e) => handleChange("fechaCaducidad", e.target.value)}
              />
              <div className="invalid-feedback">
                Fecha de caducidad requerida.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="calorias" className="form-label">
                Calorias
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="calorias"
                  placeholder="Calorias"
                  required
                  onChange={(e) => handleChange("calorias", e.target.value)}
                />
                <div className="invalid-feedback">Calorias requeridas.</div>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="peso" className="form-label">
                Peso
              </label>
              <input
                type="peso"
                className="form-control"
                id="peso"
                placeholder="Peso"
                required
                onChange={(e) => handleChange("peso", e.target.value)}
              />
              <div className="invalid-feedback">Peso requerido</div>
            </div>

            <div className="col-12">
              <label htmlFor="colaborador" className="form-label">
                Colaboador
              </label>
              <select
                className="form-select"
                id="country"
                required
                onChange={(e) => handleChange("colaborador", e.target.value)}
              >
                <option value="">Choose...</option>
                <option>Guido</option>
              </select>
              <div className="invalid-feedback">Colaborador requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="heladera" className="form-label">
                Heladera
              </label>
              <select
                className="form-select"
                id="country"
                required
                onChange={(e) => handleChange("heladera", e.target.value)}
              >
                <option value="">Choose...</option>
                <option>Heladera1</option>
              </select>
              <div className="invalid-feedback">Heladera requerido.</div>
            </div>
          </div>

          <hr className="my-4" />

          <button
            className="w-100 btn btn-primary btn-lg"
            type="submit"
            onClick={addVianda}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Vianda;
