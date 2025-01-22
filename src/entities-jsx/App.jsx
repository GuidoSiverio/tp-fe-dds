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
import TecnicosAlta from "./TecnicosAlta";
import ModificarTecnico from "./ModificarTecnico";
import BajaTecnico from "./TecnicosBaja";
import Ofertas from "./Ofertas";
import { UserProvider } from "./UserContext";

function App() {
  const tecnicoId = 1;
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
      <Route path="/tecnicos/tecnicos-alta" element={<TecnicosAlta />} />
      <Route
        path="/tecnicos/tecnicos-modificacion"
        element={<ModificarTecnico />}
      />
      <Route path="/tecnicos/tecnicos-baja" element={<BajaTecnico />} />
    </Routes>
        <Route path="/ofertas" element={<Ofertas />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
