import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../entities-css/Sidebar.css";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light sidebar"
      style={{ width: "4.5rem" }}
    >
      <a
        href="/"
        className="d-block p-3 link-dark text-decoration-none"
        title=""
      >
        {/* Icono principal */}
        <i className="bi bi-bootstrap" style={{ fontSize: "2rem" }}></i>
        <span className="visually-hidden">Icon-only</span>
      </a>
      <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li className="nav-item">
          <a
            href="/home"
            className="nav-link active py-3 border-bottom"
            aria-current="page"
            title="Home"
          >
            <i className="bi bi-house"></i>
          </a>
        </li>
        <li>
          <a
            href="/colaboradores"
            className="nav-link py-3 border-bottom"
            title="Colaborador"
          >
            <i className="bi bi-people-fill"></i>
          </a>
        </li>
        <li>
          <a href="/viandas" className="nav-link py-3 border-bottom" title="">
            <i className="bi bi-bag-check-fill"></i>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link py-3 border-bottom" title="">
            <i className="bi bi-grid"></i>
          </a>
        </li>
        <li>
          <a href="#" className="nav-link py-3 border-bottom" title="">
            <i className="bi bi-people-circle"></i>
          </a>
        </li>
      </ul>
      <div className="dropdown border-top">
        <a
          href="#"
          className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser3"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="mdo"
            width="24"
            height="24"
            className="rounded-circle"
          />
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser3"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider"></hr>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
