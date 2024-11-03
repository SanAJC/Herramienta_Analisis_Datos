// src/components/dashboard/sections/VisualizationSection/index.jsx
import { useState } from "react";
import FilterExportCard from "./FilterExportCard";
import ChartCards from "./ChartCards";

export default function VisualizationSection({ showNotification }) {
  const [selectedColumns, setSelectedColumns] = useState([
    "valor",
    "tendencia",
    "porcentaje",
  ]);

  const data = [
    { name: "Grupo A", valor: 400, tendencia: 240, porcentaje: 40 },
    { name: "Grupo B", valor: 300, tendencia: 139, porcentaje: 30 },
    { name: "Grupo C", valor: 200, tendencia: 980, porcentaje: 20 },
    { name: "Grupo D", valor: 278, tendencia: 390, porcentaje: 27.8 },
    { name: "Grupo E", valor: 189, tendencia: 480, porcentaje: 18.9 },
  ];

  const toggleColumn = (column) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const exportToPDF = () => {
    showNotification("Exportando a PDF...");
  };

  return (
    <>
      <FilterExportCard
        selectedColumns={selectedColumns}
        toggleColumn={toggleColumn}
        exportToPDF={exportToPDF}
      />
      <ChartCards data={data} selectedColumns={selectedColumns} />
    </>
  );
}