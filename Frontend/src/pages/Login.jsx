import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import api from "../services/api";
import "../Styles/style.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password       
        })
      });

      if (!response.ok) {
        throw new Error("Error en el registro. Verifica tus datos.");
      }

      const data = await response.json();
      dispatch(login(data));
      // Aquí podrías redirigir al usuario a otra página si el registro es exitoso

    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error al ingresar. Intenta nuevamente.");
    }
    console.log(JSON.stringify({ username, password }));
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", addcl);
        input.removeEventListener("blur", remcl);
      });
    };
  }, []);

  return (
    <>
      <img className="wave" src="../../public/img/Wavee.png" alt="Wave" />
      <div className="container">
        <div className="img">
          <img src="../../public/img/bg.svg" alt="Background" />
        </div>
        <div className="login-content">
          <form onSubmit={handleLogin} action="index.html">
            <img
              src="../../public/img/AVA.svg"
              alt="Logo"
              className="imagen__persona"
            />
            <h2 className="title">LOGIN</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <h5>Contraseña</h5>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input type="submit" className="btn" value="Ingresar" />
            <Link
              to="/register"
              className="text-gray-500 hover:text-indigo-600 text-sm"
            >
              ¿No tienes cuenta? UNETE
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
