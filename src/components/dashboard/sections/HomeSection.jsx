// src/components/dashboard/sections/HomeSection.jsx
import { useState, useEffect } from "react";
import { Upload, PlayCircle, PieChart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomeSection({ setActiveSection }) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Upload className="h-12 w-12" />,
      title: "Carga de Datos",
      description: "Importa tus datos fácilmente desde múltiples fuentes.",
    },
    {
      icon: <PlayCircle className="h-12 w-12" />,
      title: "Análisis Avanzado",
      description: "Ejecuta análisis estadísticos complejos con un solo clic.",
    },
    {
      icon: <PieChart className="h-12 w-12" />,
      title: "Visualización Interactiva",
      description:
        "Transforma tus datos en gráficos interactivos y reveladores.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col justify-center items-center p-6 -m-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Bienvenido a HCIR
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Herramientas Computacionales para Interpretación de Resultados:
          Simplificando el análisis de datos para investigadores y
          profesionales.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Feature Content */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              {features[activeFeature].icon}
              <h2 className="text-2xl font-semibold mt-4 mb-2">
                {features[activeFeature].title}
              </h2>
              <p className="text-gray-600">
                {features[activeFeature].description}
              </p>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src="https://cdn.dribbble.com/users/1564335/screenshots/4792356/media/9e2bb17d33abc8d29acfa2b404207caf.jpg" alt="" srcset="" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Feature Dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeFeature ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setActiveFeature(index)}
            />
          ))}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setActiveSection("upload")}
        >
          Comenzar ahora
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
}
