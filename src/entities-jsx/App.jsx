import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../entities-css/App.css";
import Home from "./Home";
import Login from "./Login";
import Vianda from "./Vianda";

function App() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const localhost = "http://localhost:8080";
  const navigate = useNavigate();

  async function login() {
    //e.preventDefault();
    try {
      const response = await fetch(localhost + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login response:", data);
        navigate("/home");
      } else {
        const errorData = await response.json();
        console.error("Error during login:", errorData);
        setError(errorData.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error);
    }
  }

  async function register() {
    //e.preventDefault();
    try {
      const response = fetch(localhost + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("Register response:", response);
    } catch (error) {
      console.error("Error during register:", error);
      setError(error);
    }
  }

  function getUsers() {
    return fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => data.users);
  }

  useEffect(() => {
    setUser({
      username: "",
      password: "",
    });
  }, []);

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  return (
    <Routes>
      {/* Renderiza el componente de login en la ruta "/" */}
      <Route
        path="/"
        element={
          <Login
            user={user}
            handleChange={handleChange}
            login={login}
            register={register}
            error={error}
          />
        }
      />
      {/* Renderiza el componente Home en la ruta "/home" */}
      <Route path="/home" element={<Home />} />
      <Route path="/viandas" element={<Vianda />} />
    </Routes>
  );
}

export default App;
