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
    
<div
  className=""
  style={{
    backgroundColor: 'white',
    borderRadius: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    maxHeight: '600px',
    margin: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
    border:'1px solid black',
  }}
>
<div className="d-flex justify-content-center">
  <i className="bi-person-fill align-middle"
    style={{
      color: 'white',
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: 'darkslategray',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '70px' 
    }}
  />
</div>


  

  <form style={{ width: '100%' }}>
    <h1 className="h3 mb-3 fw-normal" style={{ textAlign: 'center', marginTop:'10px' }}>
      Sign In
    </h1>

    <div className="form-floating" style={{ marginBottom: '15px' }}>
      <input
        type="text"
        className="form-control"
        id="floatingUsername"
        name="username"
        placeholder="Username"
        style={{
          backgroundColor: 'white',
          marginBottom: '5px',
          borderBottom: '1px solid darkslategray',
          width: '100%',
          borderRadius:'0px'
        }}
        onChange={(e) => handleChange('username', e.target.value)}
      />
      <label htmlFor="floatingUsername" style={{ color: 'grey' }}>
        Username
      </label>
    </div>

    <div className="form-floating" style={{ marginBottom: '15px' }}>
      <input
        type="password"
        className="form-control"
        id="floatingPassword"
        name="password"
        placeholder="Password"
        style={{ backgroundColor: 'white',
          marginBottom: '5px',
          borderBottom: '1px solid darkslategray',
          width: '100%',
          borderRadius:'0px' }}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <label htmlFor="floatingPassword" style={{ color: 'grey' }} >Password</label>
    </div>

    <div className="checkbox mb-3" style={{ textAlign: 'center' }}>
      <label>
        <input type="checkbox" value="remember-me" /> Remember me
      </label>
    </div>


    <button
      className="w-25 btn btn-lg"
      type="button"
      onClick={login}
      style={{
        
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        backgroundColor:'#2f4f4f',
        transition: 'backgroundColor 0.3s ease',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#264141')}
      onMouseOut={(e) => (e.target.style.backgroundColor = 'darkslategrey')}
    >
      Log In
    </button>

    <button
      className="w-25 btn btn-lg"
      
      type="button"
      onClick={register}
      style={{
        backgroundColor: '#6c757d',
        marginLeft:'10px',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#5a6268')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#6c757d')}
    >
      Register
    </button>

    {error && <p style={{ color: 'red', textAlign: 'center', marginTop:'15px' }}>{error}</p>}
  </form>
</div>


  );
}

export default Login;
