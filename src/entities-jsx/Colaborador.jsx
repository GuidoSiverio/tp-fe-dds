import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../entities-css/Colaborador.css";

function Colaborador() {
  const [tipoColaborador, setTipoColaborador] = useState("");
  const {
    user,
    colaboradorContext,
    isColaboradorLinked,
    setColaboradorContext,
    setIsColaboradorLinked,
  } = useContext(UserContext);
  
  const [colaborador, setColaborador] = useState({
    direccion: "",
    medioDeContacto: "",
    numero: "",
    email: "",
    nombre: "",
    apellido: "",
    fechaDeNacimiento: "",
    razonSocial: "",
    tipo: "",
    rubro: "",
    username: user != null ? user.username : "",
    password: user != null ? user.password : "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirige si no hay usuario
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isColaboradorLinked) {
      console.log("El colaborador está vinculado.");
    } else {
      console.log("No hay colaborador vinculado.");
    }
  }, [isColaboradorLinked, colaboradorContext]);

  const localhost = "http://localhost:8080";

  async function addColaborador(e) {
    e.preventDefault();
    try {
      const response = await fetch(localhost + "/colaboradores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(colaborador),
      });

      if (response.ok) {
        const newColaborador = await response.json();
        setColaboradorContext(newColaborador);
        setIsColaboradorLinked(true);
        localStorage.setItem("colaboradorContext", JSON.stringify(newColaborador));
        navigate("/home");
      } else {
        console.error("Error durante el registro:", response);
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  }

  const handleInputChange = (e) => {
    setColaborador({
      ...colaborador,
      [e.target.name]: e.target.value,
    });
  };

  const inputRef = React.useRef(null);

  return (
    <div className="Colaborador container-fluid custom-background">
      <Sidebar />
      <h2 className="pb-2 animated-slideIn">Alta Colaborador</h2>
      <div className="content-colaboradores ">
        
        <br />
        {isColaboradorLinked ? (
          <h1 className="text-success">Ya eres colaborador.</h1>
        ) : (
          <form className="needs-validation" noValidate>
            <div className="row g-3 justify-content-center">
              <div className="col-md-12">
                <label htmlFor="colaborador" className="form-label custom-label">
                  Tipo de colaborador
                </label>
                <select
                  id="colaborador"
                  required
                  value={tipoColaborador}
                  onChange={(e) => setTipoColaborador(e.target.value)}
                >
                  <option value="">Seleccione una opción...</option>
                  <option value="humana">Persona humana</option>
                  <option value="juridica">Persona jurídica</option>
                </select>
                <div className="invalid-feedback">
                  Tipo de colaborador requerido.
                </div>
              </div>

              {/* Campos adicionales según el tipo de colaborador */}
              {tipoColaborador === "humana" && (
                <>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={colaborador.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Apellido</label>
                    <input
                      type="text"
                      
                      name="apellido"
                      value={colaborador.apellido}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Dirección</label>
                    <input
                      type="text"
                      
                      name="direccion"
                      value={colaborador.direccion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Medio de Contacto</label>
                    <input
                      type="text"
                     
                      name="medioDeContacto"
                      value={colaborador.medioDeContacto}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label custom-label">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      name="fechaDeNacimiento"
                      value={colaborador.fechaDeNacimiento}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}

              {tipoColaborador === "juridica" && (
                <>
                  <div className="col-md-12">
                    <label className="form-label custom-label">Razón Social</label>
                    <input
                      type="text"
                    
                      name="razonSocial"
                      value={colaborador.razonSocial}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={colaborador.direccion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Medio de Contacto</label>
                    <input
                      type="text"
                      name="medioDeContacto"
                      value={colaborador.medioDeContacto}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Tipo</label>
                    <input
                      type="text"
                      name="tipo"
                      value={colaborador.tipo}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-label">Rubro</label>
                    <input
                      type="text"
                      name="rubro"
                      value={colaborador.rubro}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </>
              )}
            </div>

            <hr className="my-4 text-light" />
            <div className="col-12 ">
            <button
              className="button-save col-12"
              type="submit"
              onClick={addColaborador}
              disabled={!colaborador.direccion || !colaborador.medioDeContacto}
            >
              Save
            </button>
          </div>


          </form>
        )}

        <hr className="my-4" />
        {user.rol === "ADMIN" && (
          <div>
            <button
              className="w-25 btn btn-warning mt-3 shadow-lg"
              onClick={() => inputRef.current.click()}
            >
              Importar carga masiva
            </button>
            <input ref={inputRef} type="file" accept=".csv" hidden />
          </div>
        )}
      </div>
    </div>
  );
}

export default Colaborador;
