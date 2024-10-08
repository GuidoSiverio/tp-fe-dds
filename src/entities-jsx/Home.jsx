import React from "react";
import Sidebar from "./Sidebar";
import "../entities-css/Home.css";

function Home() {
  return (
    <div className="Home">
      <Sidebar />
      <div className="content">
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <h1>Home</h1>
      </div>
    </div>
  );
}

export default Home;
