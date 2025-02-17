import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../entities-css/Home.css";

function Home() {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const [fallasPorHeladera, setFallasPorHeladera] = useState([]);
  const [viandasPorHeladera, setViandasPorHeladera] = useState([]);
  const [viandasPorColaborador, setViandasPorColaborador] = useState([]);
  const localhost = "http://localhost:8080";

  useEffect(() => {
    if (loading) return;
    if (!user) {
      console.log("Usuario no encontrado, redirigiendo...");
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Función para obtener los reportes del backend
  useEffect(() => {
    async function fetchReportes() {
      try {
        const responseFallas = await fetch(
          `${localhost}/reportes/fallas-por-heladera`
        );
        const responseViandasHeladera = await fetch(
          `${localhost}/reportes/viandas-por-heladera`
        );
        const responseViandasColaborador = await fetch(
          `${localhost}/reportes/viandas-por-colaborador`
        );

        if (responseFallas.ok)
          setFallasPorHeladera(await responseFallas.json());
        if (responseViandasHeladera.ok)
          setViandasPorHeladera(await responseViandasHeladera.json());
        if (responseViandasColaborador.ok)
          setViandasPorColaborador(await responseViandasColaborador.json());
      } catch (error) {
        console.error("Error al obtener reportes:", error);
      }
    }

    fetchReportes();
  }, []);

  return (
    <div className="home">
      <Sidebar />

      <h2 className="pb-2 animated-slideIn">Bienvenido a AlimentAR</h2>
      <div className="content-colaboradores ">
        {/* Sección original de bienvenida y botones */}
        <div className="section-description">
          <div className="col-description">
            <h1 className="sub-title">AlimentAR</h1>
            <p className="lead">
              Sistema para la Mejora del Acceso Alimentario en Contextos de
              Vulnerabilidad Socioeconómica: Este sistema tiene como objetivo
              mejorar el acceso a alimentos saludables y nutritivos a las
              personas que se encuentran en situaciones de vulnerabilidad,
              enfrentando dificultades económicas y sociales. A través de la
              implementación de políticas de asistencia alimentaria, se busca
              reducir la inseguridad alimentaria y promover la inclusión social,
              asegurando que todos tengan acceso a una alimentación adecuada,
              contribuyendo así al bienestar general de las comunidades más
              necesitadas.
            </p>
          </div>
        </div>

        <div className="botones-contenedor">
          <div className="boton-secciones">
            <h1
              className={`secciones-boton ${
                user && user.rol === "TECNICO" ? "secciones-tecnico" : ""
              }`}
            >
              Secciones
            </h1>
          </div>
          <div className="botones-izquierda">
            {((user && user.rol === "COLABORADOR") ||
              (user && user.rol === "ADMIN")) && (
              <button className="btn-primary">
                <Link className="link" to="/colaboradores">
                  Colaboradores{" "}
                </Link>
              </button>
            )}
            {((user && user.rol === "COLABORADOR") ||
              (user && user.rol === "ADMIN")) && (
              <button className="btn-primary">
                <Link className="link" to="/heladeras">
                  Heladeras{" "}
                </Link>
              </button>
            )}
            {((user && user.rol === "COLABORADOR") ||
              (user && user.rol === "ADMIN")) && (
              <button className="btn-primary">
                <Link className="link" to="/infoHeladera">
                  Información de Heladeras{" "}
                </Link>
              </button>
            )}
          </div>

          <div
            className={`botones-derecha ${
              user && user.rol === "TECNICO" ? "rol-tecnico" : ""
            }`}
          >
            {((user && user.rol === "COLABORADOR") ||
              (user && user.rol === "ADMIN")) && (
              <button className="btn-primary">
                <Link className="link" to="/contribuciones">
                  Contribuciones
                </Link>
              </button>
            )}
            {((user && user.rol === "ADMIN") ||
              (user && user.rol === "TECNICO")) && (
              <button className="btn-primary">
                <Link className="link" to="/tecnicos">
                  Técnicos
                </Link>
              </button>
            )}
            {((user && user.rol === "COLABORADOR") ||
              (user && user.rol === "ADMIN")) && (
              <button className="btn-primary">
                <Link className="link" to="/ofertas">
                  Ofertas
                </Link>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 Nueva Sección: Reportes */}
      {user && user.rol === "ADMIN" && (
        <div className="reportes-section mt-5">
          <h2 className="pb-2">📊 Reportes de Fallas por Heladera</h2>
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark align-middle">
              <tr>
                <th>Heladera</th>
                <th>Cantidad de Fallas</th>
              </tr>
            </thead>
            <tbody>
              {fallasPorHeladera.length > 0 ? (
                fallasPorHeladera.map((reporte, index) => (
                  <tr key={index}>
                    <td>{reporte.heladera}</td>
                    <td>{reporte.cantidadFallas}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No hay información disponible.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h2 className="pb-2">🍽️ Reportes de Viandas por Heladera</h2>
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark align-middle">
              <tr>
                <th>Heladera</th>
                <th>Cantidad de Viandas</th>
              </tr>
            </thead>
            <tbody>
              {viandasPorHeladera.length > 0 ? (
                viandasPorHeladera.map((reporte, index) => (
                  <tr key={index}>
                    <td>{reporte.heladera}</td>
                    <td>{reporte.cantidadViandas}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No hay información disponible.</td>
                </tr>
              )}
            </tbody>
          </table>

          <h2 className="pb-2">👥 Reportes de Viandas por Colaborador</h2>
          <table className="table table-striped table-bordered text-center">
            <thead className="table-dark align-middle">
              <tr>
                <th>Colaborador</th>
                <th>Cantidad de Viandas</th>
              </tr>
            </thead>
            <tbody>
              {viandasPorColaborador.length > 0 ? (
                viandasPorColaborador.map((reporte, index) => (
                  <tr key={index}>
                    <td>{reporte.colaborador}</td>
                    <td>{reporte.cantidadViandas}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No hay información disponible.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Home;
