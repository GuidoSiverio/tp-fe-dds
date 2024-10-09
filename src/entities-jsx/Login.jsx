import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const localhost = "http://localhost:8080";
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

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

  return (
    <div>
      <h1>Welcome</h1>
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingUsername"
            name="username"
            placeholder="Username"
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <label htmlFor="floatingUsername">Username</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={login}
        >
          Sign in
        </button>

        <button
          className="w-100 btn btn-lg btn-secondary mt-2"
          type="button"
          onClick={register}
        >
          Register
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
