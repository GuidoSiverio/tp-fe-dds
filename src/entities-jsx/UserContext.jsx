import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [collaborator, setCollaborator] = useState(null);
  const [isCollaboratorLinked, setIsCollaboratorLinked] = useState(false);
  const localhost = "http://localhost:8080";
  // Cargar los datos del usuario desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Función para actualizar el estado del usuario y guardarlo en localStorage
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Función para cerrar sesión y eliminar los datos de localStorage
  const logoutUser = () => {
    setUser(null);
    setCollaborator(null);
    setIsCollaboratorLinked(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    async function loadCollaborator() {
      try {
        const response = await fetch(localhost + "/check-collaborator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.ok && data) {
          setCollaborator(data);
          setIsCollaboratorLinked(true);
        } else {
          setIsCollaboratorLinked(false);
        }
      } catch (error) {
        console.error("Error fetching colaborador vinculado:", error);
      }
    }
    loadCollaborator();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        collaborator,
        isCollaboratorLinked,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
