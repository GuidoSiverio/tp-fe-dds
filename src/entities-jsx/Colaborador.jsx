import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "../entities-css/Colaborador.css";

function Colaboador() {
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
      navigate("/"); // Redirige si no hay un usuario logueado
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
        localStorage.setItem(
          "colaboradorContext",
          JSON.stringify(newColaborador)
        );
        navigate("/home");
      } else {
        console.error("Error during register:", response);
      }
    } catch (error) {
      console.error("Error during register:", error);
      //setError(error);
    }
  }

  const handleChangeColaboradorType = (tipo) => {
    setTipoColaborador(tipo);
    if (tipo === "humana") {
      setColaborador({
        ...colaborador,
        razonSocial: null,
        tipo: null,
        rubro: null,
      });
    } else if (tipo === "juridica") {
      setColaborador({
        ...colaborador,
        nombre: null,
        apellido: null,
        fechaDeNacimiento: null,
      });
    }
  };

  const inputRef = React.useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          console.log("Parsed CSV data:", results.data);
          try {
            const response = await fetch(localhost + "/colaboradores/masive", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(results.data),
            });

            if (response.ok) {
              alert("Carga masiva exitosa");
            } else {
              console.error("Error during bulk upload:", response);
            }
          } catch (error) {
            console.error("Error during bulk upload:", error);
          }
        },
      });
    } else {
      alert("Por favor, selecciona un archivo .csv válido");
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (field, value) => {
    setColaborador({
      ...colaborador,
      [field]: value,
    });
  };

  const handleDateChange = (field, value) => {
    const formattedDate = new Date(value).toISOString().split(".")[0];
    handleChange(field, formattedDate);
  };

  return (
    <div className="Colaborador">
      <Sidebar />
      <h2 className="pb-2 animated-slideIn">Alta Colaborador</h2>
      <div className="content-colaboradores">
        
        <br />
        {isColaboradorLinked ? (
          <h1>Ya eres colaborador.</h1>
        ) : (
          <form className="needs-validation" noValidate>
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="colaborador" >
                  Tipo de colaborador
                </label>
                <select
                  
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

              <div className="col-md-6">
                <label htmlFor="direccion" >
                  Direccion
                </label>
                <input
                  type="text"
                 
                  id="direccion"
                  placeholder="Direccion"
                  required
                  onChange={(e) => handleChange("direccion", e.target.value)}
                />
                <div className="invalid-feedback">Direccion requerida.</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="medioDeContacto">
                  Medio de contacto
                </label>
                <select
                  type="medioDeContacto"
                  className="select-formulario"
                  placeholder="Medio de contacto"
                  required
                  onChange={(e) =>
                    handleChange("medioDeContacto", e.target.value)
                  }
                >
                  <option value="">Choose...</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                </select>
                <div className="invalid-feedback">
                  Medio de contacto requerido.
                </div>
              </div>

              {colaborador.medioDeContacto === "WhatsApp" && (
                <>
                  <div className="col-md-12">
                    <label htmlFor="numero" >
                      Numero
                    </label>
                    <input
                      type="text"
                      
                      id="numero"
                      placeholder="Numero"
                      required
                      onChange={(e) => handleChange("numero", e.target.value)}
                    />
                    <div className="invalid-feedback">Numero requerido.</div>
                  </div>
                </>
              )}

              {colaborador.medioDeContacto === "Email" && (
                <>
                  <div className="col-md-12">
                    <label htmlFor="email" >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Email"
                      required
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <div className="invalid-feedback">Email requerido.</div>
                  </div>
                </>
              )}

              {tipoColaborador === "humana" && (
                <>
                  <div className="col-md-6">
                    <label htmlFor="nombre" >
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="select-formulario"
                      id="nombre"
                      placeholder="Nombre"
                      required
                      onChange={(e) => handleChange("nombre", e.target.value)}
                    />
                    <div className="invalid-feedback">Nombre requerido.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellido" >
                      Apellido
                    </label>
                    <input
                      type="text"
                    
                      id="apellido"
                      placeholder="Apellido"
                      required
                      onChange={(e) => handleChange("apellido", e.target.value)}
                    />
                    <div className="invalid-feedback">Apellido requerido.</div>
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="fechaDeNacimiento" >
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      
                      id="date"
                      required
                      onChange={(e) =>
                        handleDateChange("fechaDeNacimiento", e.target.value)
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
                  <div className="col-md-6">
                    <label htmlFor="razonSocial" >
                      Razón Social
                    </label>
                    <input
                      type="text"
                    
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

                  <div className="col-md-6">
                    <label htmlFor="tipo" >
                      Tipo
                    </label>
                    <input
                      type="text"
                     
                      id="tipo"
                      placeholder="Tipo"
                      required
                      onChange={(e) => handleChange("tipo", e.target.value)}
                    />
                    <div className="invalid-feedback">Tipo requerido.</div>
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="rubro" >
                      Rubro
                    </label>
                    <input
                      type="text"
                      
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
              className="button-save"
              type="submit"
              onClick={addColaborador}
              disabled={!colaborador.direccion || (!colaborador.email && !colaborador.numero)}
            >
              Guardar
            </button>
          </form>
        )}

        <hr className="my-4" />
        {user.rol === "ADMIN" && (
          <div>
            <button
              className="w-25 btn btn-primary mt-3"
              style={{
                backgroundColor: "#2f4f4f",
                transition: "backgroundColor 0.3s ease",
                border: "none",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#264141")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2f4f4f")}
              onClick={handleButtonClick}
            >
              Importar carga masiva de colaboradores
              <input
                ref={inputRef}
                id="csvFile"
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Colaboador;
