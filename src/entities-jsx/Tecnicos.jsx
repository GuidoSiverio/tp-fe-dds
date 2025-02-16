import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../entities-css/Contribuciones.css";

function Tecnicos() {
  const { user, loading } = useContext(UserContext);

  const localhost = "http://localhost:8080";

  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.rol !== "ADMIN" && user.rol !== "TECNICO") {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="Tecnicos d-flex">
      <Sidebar />

      <div className="container mt-4">
        <h2 className="pb-2 animated-slideIn">Técnicos de Heladeras</h2>

        <div className="row-contribuciones animated-slideIn g-4 py-5 row-cols-1 row-cols-lg-3 ">
          {/* Registrar Incidente (Visible para ADMIN y TECNICO) */}
          {(user?.rol === "ADMIN" || user?.rol === "TECNICO") && (
            <div className="col-12 col-md-6">
              <div className="col-contribuciones">
                <h3 className="fs-2">Registrar visita</h3>
                <p>
                  Registra las visitas de los incidentes en los que trabajaste
                </p>
                <a href="/tecnicos/visitas" className="btn btn-primary">
                  Registrar
                </a>
              </div>
            </div>
          )}

          {/* Solo visible para administradores */}
          {user?.rol === "ADMIN" && (
            <>
              {/* Nuevo Técnico */}
              <div className="col-12 col-md-6">
                <div className="col-contribuciones ">
                  <h3 className="fs-2">Nuevo Técnico</h3>
                  <p>Dar de alta a un nuevo técnico en el sistema de heladeras</p>
                  <a href="/tecnicos/alta" className="btn btn-primary">
                    Alta
                  </a>
                </div>
              </div>

              {/* Modificar Técnico */}
              <div className="col-12 col-md-6">
                <div className="col-contribuciones">
                  <h3 className="fs-2">Modificar Técnico</h3>
                  <p>Modificar a un técnico ya existente en el sistema</p>
                  <a href="/tecnicos/modificacion" className="btn btn-primary">
                    Modificar
                  </a>
                </div>
              </div>

              {/* Dar de Baja Técnico */}
              <div className="col-12 col-md-6">
                <div className="col-contribuciones">
                  <h3 className="fs-2">Dar de Baja Técnico</h3>
                  <p>Eliminar un técnico dentro del sistema de heladeras</p>
                  <a href="/tecnicos/baja" className="btn btn-primary">
                    Dar de Baja
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tecnicos;
