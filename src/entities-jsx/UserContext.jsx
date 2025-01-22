import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [colaborador, setColaborador] = useState(null);
  const [isColaboradorLinked, setIsColaboradorLinked] = useState(false);
  const localhost = "http://localhost:8080";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedColaborador = JSON.parse(localStorage.getItem("colaborador"));

    if (storedUser) {
      setUser(storedUser);
      if (storedColaborador) {
        setColaborador(storedColaborador);
        setIsColaboradorLinked(true);
        console.log("Colaborador cargado desde localStorage.");
      } else {
        console.log("No se encontró colaborador en localStorage.");
      }
    } else {
      console.log("No se encontró usuario en localStorage.");
    }
  }, []);

  // Función para actualizar el estado del usuario y guardarlo en localStorage
  const loginUser = async (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    try {
      const response = await fetch(localhost + "/check-colaborador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok && data) {
        setColaborador(data);
        setIsColaboradorLinked(true);
        localStorage.setItem("colaborador", JSON.stringify(data));
        console.log("Colaborador cargado y vinculado:", data);
      } else {
        setColaborador(null);
        setIsColaboradorLinked(false);
        console.log("No se encontró colaborador en el servidor.");
      }
    } catch (error) {
      console.error("Error al verificar colaborador:", error);
      setColaborador(null);
      setIsColaboradorLinked(false);
    }
  };

  // Función para cerrar sesión y eliminar los datos de localStorage
  const logoutUser = () => {
    setUser(null);
    setColaborador(null);
    setIsColaboradorLinked(false);
    localStorage.removeItem("user");
    if (localStorage.getItem("colaborador")) {
      localStorage.removeItem("colaborador");
      localStorage.removeItem("isColaboradorLinked");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        collaborator: colaborador,
        isCollaboratorLinked: isColaboradorLinked,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
