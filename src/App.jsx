import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");
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
      const response = fetch(localhost + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("Login response:", response);
      navigate("/home");
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
          />
        }
      />
      {/* Renderiza el componente Home en la ruta "/home" */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
