import React, { useState } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Contribuciones() {
  return (
    <div className="Contribuciones">
      <Sidebar />

      <h2 class="pb-2 border-bottom">Contribuciones</h2>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-4">
        <div class="col d-flex align-items-start">
          <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
          <div>
            <h3 class="fs-2 text-body-emphasis">Donacion de Dinero</h3>
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>
            <a href="/contribuciones/donacion-dinero" class="btn btn-primary">
              Realizar contribucion
            </a>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
          <div>
            <h3 class="fs-2 text-body-emphasis">Donacion de Vianda</h3>
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>
            <a href="/contribuciones/donacion-vianda" class="btn btn-primary">
              Realizar contribucion
            </a>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
          <div>
            <h3 class="fs-2 text-body-emphasis">Distribucion de viandas</h3>
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>
            <a href="/contribuciones/distribucion" class="btn btn-primary">
              Realizar contribucion
            </a>
          </div>
        </div>
        <div class="col d-flex align-items-start">
          <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3"></div>
          <div>
            <h3 class="fs-2 text-body-emphasis">
              Hacerse cargo de una heladera
            </h3>
            <p>
              Paragraph of text beneath the heading to explain the heading.
              We'll add onto it with another sentence and probably just keep
              going until we run out of words.
            </p>
            <a
              href="/contribuciones/responsable-heladera"
              class="btn btn-primary"
            >
              Realizar contribucion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contribuciones;
