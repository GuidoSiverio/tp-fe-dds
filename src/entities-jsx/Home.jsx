import React from "react";
import Sidebar from "./Sidebar";
import "../entities-css/Home.css";

function Home() {
  return (
    <div className="Home">
      <Sidebar />
      <div className="content">
        {/* Aquí puedes agregar el contenido principal de tu aplicación */}
        <h1 class="display-4 fw-normal">Home</h1>
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center ">
          <div class="col-md-5 p-lg-5 mx-auto my-5">
            <h1 class="display-4 fw-normal">Punny headline</h1>
            <p class="lead fw-normal">
              And an even wittier subheading to boot. Jumpstart your marketing
              efforts with this example based on Apple’s marketing pages.
            </p>
            <a class="btn btn-outline-secondary" href="#">
              Coming soon
            </a>
          </div>
          <div class="product-device shadow-sm d-none d-md-block"></div>
          <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
