import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function Vianda() {
  const [vianda, setVianda] = useState({
    comida: "",
    fechaCaducidad: "",
    calorias: "",
    peso: "",
    colaboradorId: "",
    heladeraId: "",
  });
  const localhost = "http://localhost:8080";

  const [heladeras, setHeladeras] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  function getHeladeras() {
    return fetch(localhost + "/heladeras", {
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }

  function getColaboradores() {
    return fetch(localhost + "/colaboradores", {
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }

  useEffect(() => {
    getHeladeras().then((data) => {
      setHeladeras(data);
    });

    getColaboradores().then((data) => {
      setColaboradores(data);
    });
  }, []);

  async function addVianda() {
    //e.preventDefault();
    try {
      const response = fetch(localhost + "/contribuciones/donacion-vianda", {
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

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().slice(0, -1);
    handleChange(field, formattedDate);
  };

  return (
    <div className="Vianda">
      <Sidebar />
      <div className="content">
        <h1 class="display-4 fw-normal">Donacion de Vianda</h1>
        <br />
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
                onChange={(e) =>
                  handleDateChange("fechaCaducidad", e.target.value)
                }
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
                onChange={(e) => {
                  const selectedId =
                    e.target.selectedOptions[0].getAttribute("data-id");
                  handleChange("colaboradorId", selectedId);
                }}
              >
                <option value="">Choose...</option>
                {colaboradores.length > 0 ? (
                  colaboradores.map((colaborador, index) => (
                    <option
                      key={index}
                      value={
                        colaborador.nombre && colaborador.razonSocial
                          ? `${colaborador.nombre} - ${colaborador.razonSocial}`
                          : colaborador.nombre || colaborador.razonSocial
                      }
                      data-id={colaborador.id}
                    >
                      {colaborador.nombre && colaborador.razonSocial
                        ? `${colaborador.nombre} - ${colaborador.razonSocial}`
                        : colaborador.nombre || colaborador.razonSocial}
                    </option>
                  ))
                ) : (
                  <option disabled>Cargando heladeras...</option>
                )}
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
                onChange={(e) => {
                  const selectedId =
                    e.target.selectedOptions[0].getAttribute("data-id");
                  handleChange("heladeraId", selectedId);
                }}
              >
                <option value="">Choose...</option>
                {heladeras.length > 0 ? (
                  heladeras.map((heladera, index) => (
                    <option
                      key={index}
                      value={heladera.nombre}
                      data-id={heladera.id}
                    >
                      {heladera.nombre}
                    </option>
                  ))
                ) : (
                  <option disabled>Cargando heladeras...</option>
                )}
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
