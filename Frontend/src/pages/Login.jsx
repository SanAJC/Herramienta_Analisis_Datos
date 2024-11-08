import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import api from "../services/api";
import "../Styles/style.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      });

      // Verificamos que la respuesta tenga la estructura esperada
      const { data } = response;
      if (!data.token || !data.user) {
        throw new Error("Respuesta del servidor incompleta");
      }

      // Dispatch del login con los datos verificados
      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );

      // Navegamos al home
      navigate("/home");
    } catch (error) {
      console.error("Error en el login:", error);

      // Manejamos diferentes tipos de errores
      if (error.response) {
        // Error del servidor con respuesta
        setError(error.response.data?.message || "Credenciales inválidas");
      } else if (error.request) {
        // Error de red
        setError("Error de conexión. Por favor, verifica tu internet.");
      } else {
        // Otros errores
        setError("Error al iniciar sesión. Por favor, intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
    }
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
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
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
