import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MapComponent from "./MapComponent";

function Heladera() {
  const [heladera, setHeladera] = useState({
    longitud: "",
    latitud: "",
    direccion: "",
    nombre: "",
    capacidad: "",
    fechaFuncionamiento: "",
  });
  const [heladeras, setHeladeras] = useState([]);
  const [markers, setMarkers] = useState([]);
  const localhost = "http://localhost:8080";

  function getHeladeras() {
    return fetch(localhost + "/heladeras", {
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  }

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

  useEffect(() => {
    getHeladeras().then((data) => {
      setHeladeras(data);
    });
  }, []);

  useEffect(() => {
    // Solo se ejecuta cuando heladeras cambia y recalcula markers
    if (heladeras.length > 0) {
      const newMarkers = heladeras.map((heladera) => ({
        position: [parseFloat(heladera.latitud), parseFloat(heladera.longitud)],
        popupText: heladera.nombre,
      }));
      setMarkers(newMarkers); // Actualizamos el estado de markers
    }
  }, [heladeras]);

  return (
<div className="Heladera d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
  <Sidebar />
  <div className="content text-center" style={{ width: '80%', padding: '20px' }}>
    <div id="map" style={{width:'100%',  marginBottom: '30px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
      <MapComponent markers={markers} />
    </div>
    <h1 className="display-4 fw-normal mb-4 w-100">Heladera</h1>

    <form className="needs-validation" noValidate>
      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="nombre" className="form-label d-flex justify-content-start">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            style={{border:'1px solid black', boxShadow:'none'}}
            required
            onChange={(e) => handleChange("nombre", e.target.value)}
          />
          <div className="invalid-feedback">Nombre requerido</div>
        </div>

        <div className="col-12">
          <label htmlFor="longitud" className="form-label d-flex justify-content-start" style={{ textAlign: 'left' }}>Longitud</label>
          <input
            type="text"
            className="form-control"
            id="longitud"
            style={{border:'1px solid black', boxShadow:'none'}}
            required
            onChange={(e) => handleChange("longitud", e.target.value)}
          />
          <div className="invalid-feedback">Longitud requerida.</div>
        </div>

        <div className="col-12">
          <label htmlFor="latitud" className="form-label d-flex justify-content-start">Latitud</label>
          <input
            type="text"
            className="form-control"
            id="latitud"
            style={{border:'1px solid black', boxShadow:'none'}}
            required
            onChange={(e) => handleChange("latitud", e.target.value)}
          />
          <div className="invalid-feedback">Latitud requerida.</div>
        </div>

        <div className="col-12">
          <label htmlFor="direccion" className="form-label d-flex justify-content-start">Dirección</label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            style={{border:'1px solid black', boxShadow:'none'}}
            required
            onChange={(e) => handleChange("direccion", e.target.value)}
          />
          <div className="invalid-feedback">Dirección requerida</div>
        </div>

        <div className="col-12">
          <label htmlFor="capacidad" className="form-label d-flex justify-content-start">Capacidad</label>
          <input
            type="text"
            className="form-control"
            id="capacidad"
            style={{border:'1px solid black', boxShadow:'none'}}
            required
            onChange={(e) => handleChange("capacidad", e.target.value)}
          />
          <div className="invalid-feedback">Capacidad requerida</div>
        </div>

        <div className="col-12">
          <label htmlFor="date" className="form-label d-flex justify-content-start">Fecha de funcionamiento</label>
          <input
            type="date"
            className="form-control"
            id="date"
            style={{border:'1px solid black', boxShadow:'none'}}
            required
            onChange={(e) => handleDateChange("fechaFuncionamiento", e.target.value)}
          />
          <div className="invalid-feedback">Fecha de funcionamiento requerida.</div>
        </div>
      </div>

      <hr className="my-4" />

      <button className="w-50 btn btn-primary btn-lg"  type="submit" onClick={addHeladera}
      style={{backgroundColor:'#2f4f4f',
              transition: 'backgroundColor 0.3s ease',
              border:'none'}}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#264141')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#2f4f4f')}>
        Save
      </button>
    </form>
  </div>
</div>

  );
}

export default Heladera;
