import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import "../entities-css/Home.css";

function Home() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <p>Por favor, inicia sesión.</p>;
  }

  return (
    <div className="home">
      <Sidebar />

      <h2 className="pb-2 animated-slideIn" >Bienvenido a AlimentAR</h2>
      <div className="content-colaboradores ">
        {/* Título principal */}
        

        <div className="section-description">
          {/* Sección con el título y la descripción */}
          <div className="col-description">
            <h1 className="sub-title">AlimentAR</h1>
            <p className="lead">
              Sistema para la Mejora del Acceso Alimentario en Contextos de Vulnerabilidad Socioeconómica: Este sistema tiene como objetivo mejorar el acceso a alimentos saludables y nutritivos a las personas que se encuentran en situaciones de vulnerabilidad, enfrentando dificultades económicas y sociales. A través de la implementación de políticas de asistencia alimentaria, se busca reducir la inseguridad alimentaria y promover la inclusión social, asegurando que todos tengan acceso a una alimentación adecuada, contribuyendo así al bienestar general de las comunidades más necesitadas.
            </p>

          </div>
        </div>
        
        {/* Botones a la izquierda */}
        <div className="botones-contenedor">
          <div  className="boton-secciones">
            <h1>Secciones</h1>
          </div>
          <div className="botones-izquierda">
            
            <button className="btn-primary">
              <Link className="link" to="/colaboradores">Colaboradores </Link>
              </button>
            <button className="btn-primary">
              <Link className="link" to="/heladeras">Heladeras </Link>
              </button>
            <button className="btn-primary">
              <Link className="link" to="/infoHeladera">Información de Heladeras </Link>
            </button>
          </div>

        {/* Botones a la derecha */}
          <div className="botones-derecha">
            <button className="btn-primary">
              <Link className="link" to="/contribuciones">Contribuciones </Link>
              </button>
            <button className="btn-primary">
              <Link className="link" to="/tecnicos">Tecnicos </Link>
            </button>
            <button className="btn-primary">
              <Link className="link" to="/ofertas">Ofertas </Link>
              </button>
          </div>
        </div>
      </div>
      <table className="table table-striped table-bordered text-center">
      <thead className="table-dark align-middle ">
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Capacidad</th>
          </tr>
        </thead>
        <tr>
          <td colSpan="6">No hay información disponible.</td>
        </tr>
      </table>
    </div>
  );
}

export default Home;
