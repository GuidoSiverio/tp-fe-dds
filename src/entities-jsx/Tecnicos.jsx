import React from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Tecnicos() {
  return (
    <div className="Tecnicos">
      <Sidebar />

      <h2 className="pb-2 border-bottom">Tecnicos de Heladeras</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-4">
        <div className="col d-flex align-items-start">
          <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
          <div>
            <h3 className="fs-2 text-body-emphasis">Nuevo Tecnico</h3>
            <p>Dar de alta a un nuevo tecnico en el sistema</p>
            <a href="/tecnicos/tecnicos-alta" className="btn btn-primary">
              Alta
            </a>
          </div>
        </div>

        <div className="col d-flex align-items-start">
          <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
          <div>
            <h3 className="fs-2 text-body-emphasis">Modificar Tecnico</h3>
            <p>OModicar a un tecnico ya existente en el sistema</p>
            <a
              href="/tecnicos/tecnicos-modificacion"
              className="btn btn-primary"
            >
              Modificar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tecnicos;
