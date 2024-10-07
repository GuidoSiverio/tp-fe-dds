import React from "react";

function Login({ user, handleChange, login, register }) {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="button" onClick={login}>
          Login
        </button>
        <button type="button" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
