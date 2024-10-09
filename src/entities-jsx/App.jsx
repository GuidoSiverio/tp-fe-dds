import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../entities-css/App.css";
import Home from "./Home";
import Login from "./Login";
import Vianda from "./Vianda";
import Colaborador from "./Colaborador";
import Heladera from "./Heladera";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />     
      <Route path="/home" element={<Home />} />
      <Route path="/viandas" element={<Vianda />} />
      <Route path="/colaboradores" element={<Colaborador />} />
      <Route path="/heladeras" element={<Heladera />} />
    </Routes>
  );
}

export default App;
