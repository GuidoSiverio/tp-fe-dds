import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [colaboradorContext, setColaboradorContext] = useState(null);
  const [tecnicoContext, setTecnicoContext] = useState(null);
  const [isColaboradorLinked, setIsColaboradorLinked] = useState(false);
  const [isTecnicoLinked, setIsTecnicoLinked] = useState(false);
  const [loading, setLoading] = useState(true);
  const localhost = "http://localhost:8080";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Cargando usuario desde localStorage:", storedUser);
    const storedColaborador = JSON.parse(
      localStorage.getItem("colaboradorContext")
    );
    const storedTecnico = JSON.parse(localStorage.getItem("tecnicoContext"));

    if (storedUser) {
      setUser(storedUser);
      if (storedColaborador) {
        setColaboradorContext(storedColaborador);
        setIsColaboradorLinked(true);
        console.log("Colaborador cargado desde localStorage.");
      } else if (storedTecnico) {
        setTecnicoContext(storedTecnico);
        setIsTecnicoLinked(true);
        console.log("Tecnico cargado desde localStorage.");
      } else {
        console.log("No se encontró colaborador o técnico en localStorage.");
      }
    } else {
      console.log("No se encontró usuario en localStorage.");
    }
    setLoading(false);
  }, []);

  // Función para actualizar el estado del usuario y guardarlo en localStorage
  const loginUser = async (userData) => {
    try {
      const userResponse = await fetch(
        localhost + `/users?username=${userData.username}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!userResponse.ok) {
        throw new Error("Error en la autenticación");
      }

      const userWithRole = await userResponse.json();
      setUser(userWithRole);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      if (userWithRole.rol === "COLABORADOR" || userWithRole.rol === "ADMIN") {
        checkColaborador(userData);
      } else {
        checkTecnico(userData);
      }
    } catch (error) {
      console.error("Error al verificar:", error);
      setColaboradorContext(null);
      setIsColaboradorLinked(false);
      setTecnicoContext(null);
      setIsTecnicoLinked(false);
    }
  };

  const checkColaborador = async (userData) => {
    const response = await fetch(localhost + "/check-colaborador", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok && data) {
      setColaboradorContext(data);
      setIsColaboradorLinked(true);
      localStorage.setItem("colaboradorContext", JSON.stringify(data));
      console.log("Colaborador cargado y vinculado:", data);
    } else {
      setColaboradorContext(null);
      setIsColaboradorLinked(false);
      console.log("No se encontró colaborador en el servidor.");
    }
  };

  const checkTecnico = async (userData) => {
    const response = await fetch(localhost + "/check-tecnico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok && data) {
      setTecnicoContext(data);
      setIsTecnicoLinked(true);
      localStorage.setItem("tecnicoContext", JSON.stringify(data));
      console.log("Tecnico cargado y vinculado:", data);
    } else {
      setTecnicoContext(null);
      setIsTecnicoLinked(false);
      console.log("No se encontró tecnico en el servidor.");
    }
  };

  // Función para cerrar sesión y eliminar los datos de localStorage
  const logoutUser = () => {
    setUser(null);
    setColaboradorContext(null);
    setIsColaboradorLinked(false);
    setTecnicoContext(null);
    setIsTecnicoLinked(false);
    localStorage.removeItem("user");
    if (localStorage.getItem("colaboradorContext")) {
      localStorage.removeItem("colaboradorContext");
      localStorage.removeItem("isColaboradorLinked");
    } else if (localStorage.getItem("tecnicoContext")) {
      localStorage.removeItem("tecnicoContext");
      localStorage.removeItem("isTecnicoLinked");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        colaboradorContext,
        isColaboradorLinked,
        tecnicoContext,
        isTecnicoLinked,
        setColaboradorContext,
        setIsColaboradorLinked,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
