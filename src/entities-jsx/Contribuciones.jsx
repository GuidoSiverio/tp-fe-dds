import React, { useState, useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Contribuciones() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

  return (
    <div className="Contribuciones" style={{}}>
      <Sidebar />

      <h2 className="pb-2 border-bottom">Contribuciones</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-4">
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Donación de Dinero</h3>
              <p className="card-text">
                Contribuye con tu donación económica para ayudar a quienes más
                lo necesitan.
              </p>
              <a
                href="/contribuciones/donacion-dinero"
                className="btn btn-primary"
              >
                Realizar contribución
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Donación de Vianda</h3>
              <p className="card-text">
                Ofrece viandas para aquellos que lo necesiten.
              </p>
              <a
                href="/contribuciones/donacion-vianda"
                className="btn btn-primary"
              >
                Realizar contribución
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Distribución de Viandas</h3>
              <p className="card-text">
                Ayuda en la distribución de viandas a personas vulnerables.
              </p>
              <a
                href="/contribuciones/distribucion"
                className="btn btn-primary"
              >
                Realizar contribución
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Hacerse Cargo de una Heladera</h3>
              <p className="card-text">
                Conviértete en responsable de una heladera comunitaria.
              </p>
              <a
                href="/contribuciones/responsable-heladera"
                className="btn btn-primary"
              >
                Realizar contribución
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Donación de Productos</h3>
              <p className="card-text">
                Dona nuevos productos para que sean una recompensa para nuestros
                colaboradores.
              </p>
              <a
                href="/contribuciones/donacion-producto"
                className="btn btn-primary"
              >
                Realizar contribución
              </a>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">
                Registrar Nueva Personas Vulnerables
              </h3>
              <p className="card-text">
                Ingresar una nueva persona vulnerable al sistema.
              </p>
              <a
                href="/contribuciones/incorporacion-persona"
                className="btn btn-primary"
              >
                Realizar contribución
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contribuciones;
