import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../entities-css/Sidebar.css";
import { UserContext } from "./UserContext";

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { logoutUser, user } = useContext(UserContext);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 bg-dark sidebar"
      style={{ width: "4.5rem", overflowX: "visible" }}
    >
      <Link
        to="/"
        className="d-block p-3 link-light text-decoration-none "
        title=""
        onClick={logoutUser}
      >
        <i
          className="bi bi-person-raised-hand"
          style={{ fontSize: "2rem" }}
        ></i>
      </Link>
      <ul
        className="nav nav-pills link-light nav-flush flex-column mb-auto text-center"
        style={{ zIndex: 1001 }}
      >
        <li className="nav-item">
          <Link
            to="/home"
            className={`nav-link py-3 link-light ${
              activeLink === "/home" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/home")}
            title="Home"
          >
            <i className="bi bi-house-fill"></i>
          </Link>
        </li>
        {user && user.rol !== "TECNICO" && (
          <li>
            <Link
              to="/colaboradores"
              className={`nav-link py-3 link-light ${
                activeLink === "/colaboradores" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/colaboradores")}
              title="Colaboradores"
            >
              <i className="bi bi-people-fill"></i>
            </Link>
          </li>
        )}
        {user && user.rol !== "TECNICO" && (
          <li>
            <Link
              to="/heladeras"
              className={`nav-link py-3 link-light  ${
                activeLink === "/heladeras" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/heladeras")}
              title="Heladeras"
            >
              <i className="bi bi-h-square-fill"></i>
            </Link>
          </li>
        )}
        {user && user.rol !== "TECNICO" && (
          <li>
            <Link
              to="/infoHeladera"
              className={`nav-link py-3 link-light  ${
                activeLink === "/infoHeladera" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/infoHeladera")}
              title="Informacion Heladeras"
            >
              <i className="bi bi-info-square-fill"></i>
            </Link>
          </li>
        )}
        {user && user.rol !== "TECNICO" && (
          <li>
            <Link
              to="/contribuciones"
              className={`nav-link py-3 link-light ${
                activeLink === "/contribuciones" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/contribuciones")}
              title="Contribuciones"
            >
              <i className="bi bi-bag-check-fill"></i>
            </Link>
          </li>
        )}
        {((user && user.rol === "ADMIN") ||
          (user && user.rol === "TECNICO")) && (
          <li>
            <Link
              to="/tecnicos"
              className={`nav-link py-3 link-light  ${
                activeLink === "/tecnicos" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/tecnicos")}
              title="Tecnicos"
            >
              <i className="bi bi-hammer"></i>
            </Link>
          </li>
        )}
        {user && user.rol !== "TECNICO" && (
          <li>
            <Link
              to="/ofertas"
              className={`nav-link py-3 link-light  ${
                activeLink === "/ofertas" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/ofertas")}
              title="Ofertas"
            >
              <i className="bi bi-bag-fill"></i>
            </Link>
          </li>
        )}
      </ul>
      <div className="dropdown " style={{ borderTop: "2px solid white" }}>
        <a
          href="#"
          className="d-flex align-items-center justify-content-center p-3 link-light text-decoration-none dropdown-toggle"
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
          className="dropdown-menu dropdown-menu-end text-small shadow"
          aria-labelledby="dropdownUser3"
          style={{ maxWidth: "auto", marginLeft: " 15px " }}
        >
          <li>
            <a className="dropdown-item" href="/" onClick={logoutUser}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
