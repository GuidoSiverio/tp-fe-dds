import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
        <h2 className="pb-2 border-bottom">Técnicos de Heladeras</h2>

        <div className="row g-4 py-5 row-cols-1 row-cols-md-2 row-cols-lg-4">
          {/* Registrar Incidente (Visible para ADMIN y TECNICO) */}
          {(user?.rol === "ADMIN" || user?.rol === "TECNICO") && (
            <div className="col">
              <div className="card shadow-sm p-3 text-center">
                <h3 className="fs-4">Registrar visita</h3>
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
              <div className="col">
                <div className="card shadow-sm p-3 text-center">
                  <h3 className="fs-4">Nuevo Técnico</h3>
                  <p>Dar de alta a un nuevo técnico en el sistema</p>
                  <a href="/tecnicos/alta" className="btn btn-primary">
                    Alta
                  </a>
                </div>
              </div>

              {/* Modificar Técnico */}
              <div className="col">
                <div className="card shadow-sm p-3 text-center">
                  <h3 className="fs-4">Modificar Técnico</h3>
                  <p>Modificar a un técnico ya existente en el sistema</p>
                  <a href="/tecnicos/modificacion" className="btn btn-primary">
                    Modificar
                  </a>
                </div>
              </div>

              {/* Dar de Baja Técnico */}
              <div className="col">
                <div className="card shadow-sm p-3 text-center">
                  <h3 className="fs-4">Dar de Baja un Técnico</h3>
                  <p>Eliminar un técnico en el sistema</p>
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
