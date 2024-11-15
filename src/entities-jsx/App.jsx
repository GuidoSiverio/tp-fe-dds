import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../entities-css/App.css";
import Home from "./Home";
import Login from "./Login";
import Vianda from "./DonacionVianda";
import Dinero from "./DonacionDinero";
import Distribucion from "./DistribucionVianda";
import Colaborador from "./Colaborador";
import Heladera from "./Heladera";
import Contribuciones from "./Contribuciones";
import Tecnicos from "./Tecnicos";
import PersonaVulnerable from "./PersonaVulnerable";
import Producto from "./DonacionProducto";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/colaboradores" element={<Colaborador />} />
      <Route path="/heladeras" element={<Heladera />} />
      <Route path="/tecnicos" element={<Tecnicos />} />
      <Route path="/contribuciones" element={<Contribuciones />} />
      <Route path="/contribuciones/donacion-vianda" element={<Vianda />} />
      <Route path="/contribuciones/donacion-dinero" element={<Dinero />} />
      <Route path="/contribuciones/distribucion" element={<Distribucion />} />
      <Route
        path="/contribuciones/incorporacion-persona"
        element={<PersonaVulnerable />}
      />
      <Route
        path="/contribuciones/responsable-heladera"
        element={<Heladera />}
      />
      <Route path="/contribuciones/donacion-producto" element={<Producto />} />
    </Routes>
  );
}

export default App;
