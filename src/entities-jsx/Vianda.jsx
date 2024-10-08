import React from "react";
import Sidebar from "./Sidebar";

function Vianda() {
  return (
    <div className="Vianda">
      <Sidebar />
      <div className="content">
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <form className="needs-validation" noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="comida" className="form-label">
                Comida
              </label>
              <input
                type="text"
                className="form-control"
                id="comida"
                placeholder="Comida"
                required
              />
              <div className="invalid-feedback">
                Nombre de la comida requerida.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="date" className="form-label">
                Fecha de caducidad
              </label>
              <input type="date" className="form-control" id="date" required />
              <div className="invalid-feedback">
                Fecha de caducidad requerida.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="calorias" className="form-label">
                Calorias
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  className="form-control"
                  id="calorias"
                  placeholder="Calorias"
                  required
                />
                <div className="invalid-feedback">Calorias requeridas.</div>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="peso" className="form-label">
                Peso
              </label>
              <input
                type="peso"
                className="form-control"
                id="peso"
                placeholder="Peso"
                required
              />
              <div className="invalid-feedback">Peso requerido</div>
            </div>

            <div className="col-12">
              <label htmlFor="colaborador" className="form-label">
                Colaboador
              </label>
              <select className="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>Guido</option>
              </select>
              <div className="invalid-feedback">Colaborador requerido.</div>
            </div>

            <div className="col-12">
              <label htmlFor="heladera" className="form-label">
                Heladera
              </label>
              <select className="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>Heladera1</option>
              </select>
              <div className="invalid-feedback">Heladera requerido.</div>
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Vianda;
