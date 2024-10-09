import React, { useState } from "react";
import Sidebar from "./Sidebar";

function Colaboador() {
  const [tipoColaborador, setTipoColaborador] = useState("");
  const [humana, setHumano] = useState({
    direccion: "",
    medioDeContacto: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
  });
  const [juridica, setJuridica] = useState({
    direccion: "",
    medioDeContacto: "",
    razonSocial: "",
    tipo: "",
    rubro: "",
  });
  const localhost = "http://localhost:8080";

  async function addColaborador() {
    //e.preventDefault();
    console.log(humana);
    console.log(juridica);
    const persona =
      tipoColaborador === "humana" ? "/persona-humana" : "/persona-juridica";

    const json = tipoColaborador === "humana" ? humana : juridica;
    try {
      const response = await fetch(localhost + "/colaboradores" + persona, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      });

      console.log(humana);
      console.log(juridica);

      console.log("Register response:", response);
    } catch (error) {
      console.error("Error during register:", error);
      setError(error);
    }
  }

  const handleChangeColaboradorType = (tipo) => {
    setTipoColaborador(tipo);
  };

  const handleChange = (field, value) => {
    if (tipoColaborador === "humana") {
      setHumano({
        ...humana,
        [field]: value,
      });
    } else if (tipoColaborador === "juridica") {
      setJuridica({
        ...juridica,
        [field]: value,
      });
    }
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().slice(0, -1);
    handleChange(field, formattedDate);
  };

  return (
    <div className="Colaborador">
      <Sidebar />
      <div className="content">
        <h1 class="display-4 fw-normal">Alta Colaborador</h1>
        <br />
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="colaborador" className="form-label">
                Tipo de colaborador
              </label>
              <select
                className="form-select"
                id="country"
                required
                onChange={(e) => handleChangeColaboradorType(e.target.value)}
              >
                <option value="">Choose...</option>
                <option value="humana">Persona humana</option>
                <option value="juridica">Persona juridica</option>
              </select>
              <div className="invalid-feedback">
                Tipo de colaborador requerido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="direccion" className="form-label">
                Direccion
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                placeholder="Direccion"
                required
                onChange={(e) => handleChange("direccion", e.target.value)}
              />
              <div className="invalid-feedback">Direccion requerida.</div>
            </div>

            <div className="col-12">
              <label htmlFor="medioDeContacto" className="form-label">
                Medio de contacto
              </label>
              <select
                type="medioDeContacto"
                className="form-control"
                id="medioDeContacto"
                placeholder="Medio de contacto"
                required
                onChange={(e) =>
                  handleChange("medioDeContacto", e.target.value)
                }
              >
                <option value="">Choose...</option>
                <option>Whatsapp</option>
                <option>Email</option>
              </select>
              <div className="invalid-feedback">
                Medio de contacto requerido.
              </div>
            </div>

            {tipoColaborador === "humana" && (
              <>
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
                  <label htmlFor="fechaNacimiento" className="form-label">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaNacimiento"
                    required
                    onChange={(e) =>
                      handleDateChange("fechaNacimiento", e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Fecha de nacimiento requerida.
                  </div>
                </div>
              </>
            )}
            {tipoColaborador === "juridica" && (
              <>
                <div className="col-12">
                  <label htmlFor="razonSocial" className="form-label">
                    Razón Social
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="razonSocial"
                    placeholder="Razón Social"
                    required
                    onChange={(e) =>
                      handleChange("razonSocial", e.target.value)
                    }
                  />
                  <div className="invalid-feedback">
                    Razón Social requerida.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="tipo" className="form-label">
                    Tipo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tipo"
                    placeholder="Tipo"
                    required
                    onChange={(e) => handleChange("tipo", e.target.value)}
                  />
                  <div className="invalid-feedback">Tipo requerido.</div>
                </div>

                <div className="col-12">
                  <label htmlFor="rubro" className="form-label">
                    Rubro
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rubro"
                    placeholder="Rubro"
                    required
                    onChange={(e) => handleChange("rubro", e.target.value)}
                  />
                  <div className="invalid-feedback">Rubro requerido.</div>
                </div>
              </>
            )}
          </div>

          <hr className="my-4" />

          <button
            className="w-100 btn btn-primary btn-lg"
            type="button"
            onClick={addColaborador}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Colaboador;
