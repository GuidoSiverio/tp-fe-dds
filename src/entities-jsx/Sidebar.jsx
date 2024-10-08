import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../entities-css/Sidebar.css";

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-light sidebar"
      style={{ width: "4.5rem" }}
    >
      <Link
        to="/"
        className="d-block p-3 link-dark text-decoration-none"
        title=""
      >
        <i
          className="bi bi-person-raised-hand"
          style={{ fontSize: "2rem" }}
        ></i>
      </Link>
      <ul
        className="nav nav-pills nav-flush flex-column mb-auto text-center"
        style={{ zIndex: 1001 }}
      >
        <li className="nav-item">
          <Link
            to="/home"
            className={`nav-link py-3 border-bottom ${
              activeLink === "/home" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/home")}
            title="Home"
          >
            <i className="bi bi-house-fill"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/colaboradores"
            className={`nav-link py-3 border-bottom ${
              activeLink === "/colaboradores" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/colaboradores")}
            title="Colaboradores"
          >
            <i className="bi bi-people-fill"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/viandas"
            className={`nav-link py-3 border-bottom ${
              activeLink === "/viandas" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/viandas")}
            title="Viandas"
          >
            <i className="bi bi-bag-check-fill"></i>
          </Link>
        </li>
        <li>
          <Link
            to="/heladeras"
            className={`nav-link py-3 border-bottom ${
              activeLink === "/heladeras" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/heladeras")}
            title="Heladeras"
          >
            <i className="bi bi-h-square-fill"></i>
          </Link>
        </li>
        <li>
          <Link
            to="#"
            className={`nav-link py-3 border-bottom ${
              activeLink === "#" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("#")}
            title="Personas"
          >
            <i className="bi bi-people-circle"></i>
          </Link>
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
