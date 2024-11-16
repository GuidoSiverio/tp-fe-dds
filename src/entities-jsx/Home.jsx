import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import "../entities-css/Home.css";
import { UserContext } from "./UserContext";

function Home() {
  const { user } = useContext(UserContext);
  if (!user) {
    return <p>Por favor, inicia sesión.</p>;
  }

  return (
    <div className="Home">
      <Sidebar />
      <div className="content">
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <h1 class="display-4 fw-normal">Home</h1>
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center ">
          <div class="col-md-5 p-lg-5 mx-auto my-5">
            <h1 class="display-4 fw-normal">AlimentAR</h1>
            <p class="lead fw-normal">
              Sistema para la Mejora del Acceso Alimentario en Contextos de
              Vulnerabilidad Socioeconómica
            </p>
            <a class="btn btn-outline-secondary" href="#">
              Coming soon
            </a>
          </div>
          <div class="product-device shadow-sm d-none d-md-block"></div>
          <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
