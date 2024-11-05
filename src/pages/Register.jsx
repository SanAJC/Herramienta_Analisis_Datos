import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import api from '../services/api';
import "../Styles/style.css";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.post('/login', {
        username,
        email, 
        password,
        role, // Añadir el rol a la solicitud de inicio de sesión
      });
      dispatch(login(response.data));
      // Redirigir al usuario a la página de inicio
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setError('Error al iniciar sesión. Intenta nuevamente.');
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

    inputs.forEach(input => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });

    return () => {
      inputs.forEach(input => {
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
          <img src="../../public/img/vieja.svg" alt="Background" />
        </div>
        <div className="login-content">
          <form onSubmit={handleLogin} action="index.html">
            <img src="../../public/img/usuario.svg" alt="Logo" className='imagen__persona'/>
            <h2 className="title">Registro</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <h5>Nombre y Apellido</h5>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user-tag"></i>
              </div>
              <div className="div">
                <h5></h5>
                <select
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>Selecciona tu Rol</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="profesor">Profesor</option>
                </select>
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-id-card"></i>
              </div>
              <div className="div">
                <h5>Email</h5>
                <input
                  type="text"
                  className="input"
                  value={email} // Cambiar a email
                  onChange={(e) => setEmail(e.target.value)} // Cambiar manejador a setEmail
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
            <a href="#" className="text-gray-500 hover:text-indigo-600 text-sm">
              Tienes Problema con el Registro?
            </a>
            <input type="submit" className="btn" value="Registrar" />
            <Link
              to="/register"
              className="text-gray-500 hover:text-indigo-600 text-sm"
            >
            
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
