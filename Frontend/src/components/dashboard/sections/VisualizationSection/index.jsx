// // src/components/dashboard/sections/VisualizationSection/index.jsx
// import { useState } from "react";
// import FilterExportCard from "./FilterExportCard";
// import ChartCards from "./ChartCards";

// export default function VisualizationSection({ showNotification }) {
//   const [selectedColumns, setSelectedColumns] = useState([
//     "valor",
//     "tendencia",
//     "porcentaje",
//   ]);

//   const data = [
//     { name: "Grupo A", valor: 400, tendencia: 240, porcentaje: 40 },
//     { name: "Grupo B", valor: 300, tendencia: 139, porcentaje: 30 },
//     { name: "Grupo C", valor: 200, tendencia: 980, porcentaje: 20 },
//     { name: "Grupo D", valor: 278, tendencia: 390, porcentaje: 27.8 },
//     { name: "Grupo E", valor: 189, tendencia: 480, porcentaje: 18.9 },
//   ];

//   const toggleColumn = (column) => {
//     setSelectedColumns((prev) =>
//       prev.includes(column)
//         ? prev.filter((col) => col !== column)
//         : [...prev, column]
//     );
//   };

//   const exportToPDF = () => {
//     showNotification("Exportando a PDF...");
//   };

//   return (
//     <>
//       <FilterExportCard
//         selectedColumns={selectedColumns}
//         toggleColumn={toggleColumn}
//         exportToPDF={exportToPDF}
//       />
//       <ChartCards data={data} selectedColumns={selectedColumns} />
//     </>
//   );
// }

// import { useState } from "react";
// import { Download, FileDown, Loader2, Settings2, Filter } from "lucide-react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Progress } from "@/components/ui/progress";

// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
//   ComposedChart,
// } from "recharts";

// const FilterExportCard = ({
//   selectedColumns,
//   toggleColumn,
//   exportToPDF,
//   isExporting,
// }) => {
//   return (
//     <Card className="mb-6">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <div>
//             <CardTitle>Visualización de Datos</CardTitle>
//             <CardDescription>
//               Personaliza y exporta tus visualizaciones
//             </CardDescription>
//           </div>
//           <div className="space-x-2">
//             <ExportDialog onExport={exportToPDF} isExporting={isExporting} />
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="flex flex-wrap gap-2">
//           {["valor", "tendencia", "porcentaje"].map((column) => (
//             <Button
//               key={column}
//               variant={selectedColumns.includes(column) ? "default" : "outline"}
//               size="sm"
//               onClick={() => toggleColumn(column)}
//               className="capitalize"
//             >
//               {column}
//             </Button>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const ExportDialog = ({ onExport, isExporting }) => {
//   const [exportConfig, setExportConfig] = useState({
//     format: "A4",
//     orientation: "portrait",
//     quality: "high",
//   });

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">
//           <FileDown className="mr-2 h-4 w-4" />
//           Exportar
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Configuración de Exportación</DialogTitle>
//           <DialogDescription>
//             Personaliza las opciones de exportación del PDF
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">
//           <div className="space-y-2">
//             <label className="text-sm font-medium">Formato del papel</label>
//             <Select
//               value={exportConfig.format}
//               onValueChange={(value) =>
//                 setExportConfig((prev) => ({ ...prev, format: value }))
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="A4">A4</SelectItem>
//                 <SelectItem value="letter">Carta</SelectItem>
//                 <SelectItem value="legal">Legal</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Orientación</label>
//             <Select
//               value={exportConfig.orientation}
//               onValueChange={(value) =>
//                 setExportConfig((prev) => ({ ...prev, orientation: value }))
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="portrait">Vertical</SelectItem>
//                 <SelectItem value="landscape">Horizontal</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium">Calidad</label>
//             <Select
//               value={exportConfig.quality}
//               onValueChange={(value) =>
//                 setExportConfig((prev) => ({ ...prev, quality: value }))
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="low">Baja (más rápido)</SelectItem>
//                 <SelectItem value="medium">Media</SelectItem>
//                 <SelectItem value="high">Alta (más lento)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4">
//           <Button onClick={() => onExport(exportConfig)} disabled={isExporting}>
//             {isExporting ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Exportando...
//               </>
//             ) : (
//               <>
//                 <Download className="mr-2 h-4 w-4" />
//                 Exportar PDF
//               </>
//             )}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const ChartCards = ({ data, selectedColumns }) => {
//   return (
//     <div id="charts-container" className="grid gap-6 md:grid-cols-2">
//       {/* Gráfico de Barras */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Gráfico de Barras</CardTitle>
//           <CardDescription>Comparación de valores por grupo</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {selectedColumns.includes("valor") && (
//                 <Bar dataKey="valor" fill="#8884d8" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Bar dataKey="tendencia" fill="#82ca9d" />
//               )}
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Gráfico de Líneas */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Gráfico de Líneas</CardTitle>
//           <CardDescription>Tendencias a lo largo del tiempo</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {selectedColumns.includes("valor") && (
//                 <Line type="monotone" dataKey="valor" stroke="#8884d8" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Line type="monotone" dataKey="tendencia" stroke="#82ca9d" />
//               )}
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Gráfico Combinado */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Gráfico Combinado</CardTitle>
//           <CardDescription>Comparación de valores y tendencias</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {selectedColumns.includes("valor") && (
//                 <Bar dataKey="valor" barSize={20} fill="#8884d8" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Bar dataKey="tendencia" barSize={20} fill="#82ca9d" />
//               )}
//               {selectedColumns.includes("valor") && (
//                 <Line type="monotone" dataKey="valor" stroke="#413ea0" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Line type="monotone" dataKey="tendencia" stroke="#ff7300" />
//               )}
//             </ComposedChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Panel de Interpretación Automática */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Interpretación Automática</CardTitle>
//           <CardDescription>Resumen de hallazgos clave</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
//             <li>
//               El Grupo A muestra el valor más alto con 400 unidades y representa
//               el 40% del total.
//             </li>
//             <li>
//               Existe una tendencia decreciente en los valores desde el Grupo A
//               hasta el Grupo C.
//             </li>
//             <li>
//               El Grupo C presenta la tendencia más alta con 980 unidades, a
//               pesar de tener un valor bajo.
//             </li>
//             <li>
//               El Grupo E tiene el valor y porcentaje más bajo, indicando una
//               posible área de mejora.
//             </li>
//             <li>
//               La distribución de porcentajes muestra una concentración en los
//               Grupos A, B y D, que suman el 97.8% del total.
//             </li>
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default function VisualizationSection({ showNotification }) {
//   const [selectedColumns, setSelectedColumns] = useState([
//     "valor",
//     "tendencia",
//     "porcentaje",
//   ]);
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportProgress, setExportProgress] = useState(0);

//   const data = [
//     { name: "Grupo A", valor: 400, tendencia: 240, porcentaje: 40 },
//     { name: "Grupo B", valor: 300, tendencia: 139, porcentaje: 30 },
//     { name: "Grupo C", valor: 200, tendencia: 980, porcentaje: 20 },
//     { name: "Grupo D", valor: 278, tendencia: 390, porcentaje: 27.8 },
//     { name: "Grupo E", valor: 189, tendencia: 480, porcentaje: 18.9 },
//   ];

//   const toggleColumn = (column) => {
//     setSelectedColumns((prev) =>
//       prev.includes(column)
//         ? prev.filter((col) => col !== column)
//         : [...prev, column]
//     );
//   };

//   const exportToPDF = async (config) => {
//     if (isExporting) return;

//     try {
//       setIsExporting(true);
//       showNotification("Iniciando exportación...");
//       setExportProgress(10);

//       // Capturar los gráficos
//       const chartsContainer = document.getElementById("charts-container");

//       setExportProgress(30);
//       const canvas = await html2canvas(chartsContainer, {
//         scale:
//           config.quality === "high" ? 2 : config.quality === "medium" ? 1.5 : 1,
//         logging: false,
//         useCORS: true,
//       });

//       setExportProgress(60);

//       // Crear el PDF
//       const pdf = new jsPDF({
//         format: config.format.toLowerCase(),
//         orientation: config.orientation,
//       });

//       // Añadir título y metadata
//       const title = "Reporte de Visualización de Datos";
//       pdf.setFont("helvetica", "bold");
//       pdf.setFontSize(16);
//       pdf.text(title, 20, 20);

//       // Añadir fecha y hora
//       pdf.setFont("helvetica", "normal");
//       pdf.setFontSize(10);
//       pdf.text(`Generado el: ${new Date().toLocaleString()}`, 20, 30);

//       // Añadir filtros aplicados
//       pdf.setFontSize(12);
//       pdf.text("Filtros aplicados:", 20, 40);
//       pdf.setFontSize(10);
//       selectedColumns.forEach((column, index) => {
//         pdf.text(`• ${column}`, 30, 50 + index * 7);
//       });

//       setExportProgress(80);

//       // Añadir la imagen de los gráficos
//       const imgData = canvas.toDataURL("image/png");
//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
//       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       pdf.addImage(imgData, "PNG", 20, 80, pdfWidth, pdfHeight);

//       setExportProgress(90);

//       // Guardar el PDF
//       pdf.save(
//         `visualizacion_datos_${new Date().toISOString().split("T")[0]}.pdf`
//       );

//       setExportProgress(100);
//       showNotification("PDF exportado con éxito", "success");
//     } catch (error) {
//       console.error("Error al exportar:", error);
//       showNotification("Error al exportar el PDF", "error");
//     } finally {
//       setIsExporting(false);
//       setExportProgress(0);
//     }
//   };

//   return (
//     <>
//       <FilterExportCard
//         selectedColumns={selectedColumns}
//         toggleColumn={toggleColumn}
//         exportToPDF={exportToPDF}
//         isExporting={isExporting}
//       />
//       {isExporting && (
//         <Card className="mb-4">
//           <CardContent className="py-4">
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span>Exportando PDF...</span>
//                 <span>{exportProgress}%</span>
//               </div>
//               <Progress value={exportProgress} className="h-2" />
//             </div>
//           </CardContent>
//         </Card>
//       )}
//       <ChartCards data={data} selectedColumns={selectedColumns} />
//     </>
//   );
// }


import { useState, useEffect } from "react";
import { Download, FileDown, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import ChartCards from "./ChartCards";
import UploadSection from "../UploadSection";
import { uploadFile } from "@/services/api";

const FilterExportCard = ({
  selectedColumns,
  toggleColumn,
  exportToPDF,
  isExporting,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Visualización de Datos</CardTitle>
            <CardDescription>
              Personaliza y exporta tus visualizaciones
            </CardDescription>
          </div>
          <div className="space-x-2">
            <ExportDialog onExport={exportToPDF} isExporting={isExporting} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {["valor", "tendencia", "porcentaje"].map((column) => (
            <Button
              key={column}
              variant={selectedColumns.includes(column) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleColumn(column)}
              className="capitalize"
            >
              {column}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ExportDialog = ({ onExport, isExporting }) => {
  const [exportConfig, setExportConfig] = useState({
    format: "A4",
    orientation: "portrait",
    quality: "high",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configuración de Exportación</DialogTitle>
          <DialogDescription>
            Personaliza las opciones de exportación del PDF
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Formato del papel</label>
            <Select
              value={exportConfig.format}
              onValueChange={(value) =>
                setExportConfig((prev) => ({ ...prev, format: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A4">A4</SelectItem>
                <SelectItem value="letter">Carta</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Orientación</label>
            <Select
              value={exportConfig.orientation}
              onValueChange={(value) =>
                setExportConfig((prev) => ({ ...prev, orientation: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Vertical</SelectItem>
                <SelectItem value="landscape">Horizontal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Calidad</label>
            <Select
              value={exportConfig.quality}
              onValueChange={(value) =>
                setExportConfig((prev) => ({ ...prev, quality: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baja (más rápido)</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="high">Alta (más lento)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={() => onExport(exportConfig)} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function VisualizationSection({ showNotification }) {
  const [selectedColumns, setSelectedColumns] = useState([
    "valor",
    "tendencia",
    "porcentaje",
  ]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

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

  const exportToPDF = async (config) => {
    if (isExporting) return;

    try {
      setIsExporting(true);
      showNotification("Iniciando exportación...");
      setExportProgress(10);

      // Capturar los gráficos
      const chartsContainer = document.getElementById("charts-container");

      setExportProgress(30);
      const canvas = await html2canvas(chartsContainer, {
        scale:
          config.quality === "high" ? 2 : config.quality === "medium" ? 1.5 : 1,
        logging: false,
        useCORS: true,
      });

      setExportProgress(60);

      // Crear el PDF
      const pdf = new jsPDF({
        format: config.format.toLowerCase(),
        orientation: config.orientation,
      });

      // Añadir título y metadata
      const title = "Reporte de Visualización de Datos";
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(title, 20, 20);

      // Añadir fecha y hora
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`Generado el: ${new Date().toLocaleString()}`, 20, 30);

      // Añadir filtros aplicados
      pdf.setFontSize(12);
      pdf.text("Filtros aplicados:", 20, 40);
      pdf.setFontSize(10);
      selectedColumns.forEach((column, index) => {
        pdf.text(`• ${column}`, 30, 50 + index * 7);
      });

      setExportProgress(80);

      // Añadir la imagen de los gráficos
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 20, 80, pdfWidth, pdfHeight);

      setExportProgress(90);

      // Guardar el PDF
      pdf.save(
        `visualizacion_datos_${new Date().toISOString().split("T")[0]}.pdf`
      );

      setExportProgress(100);
      showNotification("PDF exportado con éxito", "success");
    } catch (error) {
      console.error("Error al exportar:", error);
      showNotification("Error al exportar el PDF", "error");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <>
      <FilterExportCard
        selectedColumns={selectedColumns}
        toggleColumn={toggleColumn}
        exportToPDF={exportToPDF}
        isExporting={isExporting}
      />
      {isExporting && (
        <Card className="mb-4">
          <CardContent className="py-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exportando PDF...</span>
                <span>{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}
      <ChartCards data={data} selectedColumns={selectedColumns} />
    </>
  );
}