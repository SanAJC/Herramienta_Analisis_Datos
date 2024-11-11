// src/components/dashboard/Sidebar.jsx
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  Home,
  Upload,
  PlayCircle,
  PieChart,
  User,
  Menu,
  ClockIcon,
  LogOut,
  Table,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { logout } from '@/redux/slices/authSlice';
import { Button } from "@/components/ui/button";

export default function Sidebar({ activeSection, setActiveSection }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const navItems = [
    { icon: <Home />, label: "Inicio", id: "home" },
    { icon: <Upload />, label: "Carga de Datos", id: "upload" },
    { icon: <Table />, label: "Tabla de Datos", id: "table" },
    { icon: <PieChart />, label: "Visualización", id: "visualization" },
    { icon: <ClockIcon />, label: "Historial", id: "history" }, 
    { icon: <User />, label: "Perfil", id: "profile" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <nav className="w-16 md:w-64 bg-white shadow-md h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 hidden md:block">
          HCIR
        </h1>
        <Menu className="md:hidden" />
      </div>
      <ul className="mt-6 flex-grow">
        {navItems.map((item) => (
          <li key={item.id} className="mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full p-3 flex items-center ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3 hidden md:inline">{item.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        ))}
      </ul>

      <div className="p-4 border-t">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="w-full p-3 flex items-center text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut size={20} />
                <span className="ml-3 hidden md:inline font-medium">Cerrar Sesión</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Cerrar Sesión</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
}
