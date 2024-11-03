import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reinicia el estado de error en cada intento

    try {
      const response = await api.post("/register", {
        username,
        email,
        password,
      });

      // Si el registro es exitoso, guarda el usuario y redirige
      dispatch(login(response.data));
      navigate("/home");
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error al crear la cuenta. Intenta nuevamente.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Registro de Usuario</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border border-gray-300 rounded p-2"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded p-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;
