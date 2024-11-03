// src/components/dashboard/Sidebar.jsx
import { Home, Upload, PlayCircle, PieChart, User, Menu } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sidebar({ activeSection, setActiveSection }) {
  const navItems = [
    { icon: <Home />, label: "Inicio", id: "home" },
    { icon: <Upload />, label: "Carga de Datos", id: "upload" },
    { icon: <PlayCircle />, label: "Ejecución de Análisis", id: "analysis" },
    { icon: <PieChart />, label: "Visualización", id: "visualization" },
    { icon: <User />, label: "Perfil", id: "profile" },
  ];

  return (
    <nav className="w-16 md:w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800 hidden md:block">
          HCIR
        </h1>
        <Menu className="md:hidden" />
      </div>
      <ul className="mt-6">
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
    </nav>
  );
}