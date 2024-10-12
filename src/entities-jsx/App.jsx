import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../entities-css/App.css";
import Home from "./Home";
import Login from "./Login";
import Vianda from "./DonacionVianda";
import Colaborador from "./Colaborador";
import Heladera from "./Heladera";
import Contribuciones from "./Contribuciones";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/colaboradores" element={<Colaborador />} />
      <Route path="/heladeras" element={<Heladera />} />
      <Route path="/contribuciones" element={<Contribuciones />} />
      <Route path="/contribuciones/donacion-vianda" element={<Vianda />} />
    </Routes>
  );
}

export default App;
