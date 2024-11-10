// import { useState, useEffect } from "react";
// import { Download, FileDown, Loader2 } from "lucide-react";
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
// import ChartCards from "./ChartCards"; // Importamos el componente de gráficos
// import api from "@/services/api";

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

import { useState, useEffect } from "react";
import { Download, FileDown, Loader2, Filter } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ChartCards from "./ChartCards";
import api from "@/services/api";

const DataFilterDialog = ({ columns, filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (column, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtrar Datos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Filtrar Datos</DialogTitle>
          <DialogDescription>
            Establece filtros para cada columna
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {columns.map((column) => (
            <div key={column} className="space-y-2">
              <label className="text-sm font-medium">{column}</label>
              <Input
                placeholder={`Filtrar por ${column}...`}
                value={localFilters[column] || ""}
                onChange={(e) => handleFilterChange(column, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={() => setLocalFilters({})}>Limpiar</Button>
          <Button onClick={applyFilters}>Aplicar Filtros</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FilterExportCard = ({
  selectedColumns,
  toggleColumn,
  exportToPDF,
  isExporting,
  availableColumns,
  filters,
  setFilters,
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
            <DataFilterDialog
              columns={availableColumns}
              filters={filters}
              setFilters={setFilters}
            />
            <ExportDialog onExport={exportToPDF} isExporting={isExporting} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {availableColumns.map((column) => (
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
  const [fileData, setFileData] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [availableColumns, setAvailableColumns] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/file/send/");
        const { file_data } = response.data;
        setFileData(file_data);

        // Get unique columns from the data
        if (file_data) {
          const columns = Object.keys(file_data);
          setAvailableColumns(columns);
          setSelectedColumns(columns);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification("Error al cargar los datos", "error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!fileData) return;

    //Procesar datos con filtros y columnas seleccionadas
    const processData = () => {
      //Obtener la longitud de la matriz de datos de cualquier columna
      const dataLength = fileData[Object.keys(fileData)[0]]?.length || 0;
      let processedRows = [];

      //Creación de una matriz de objetos de fila
      for (let i = 0; i < dataLength; i++) {
        let row = {};
        for (const column of availableColumns) {
          row[column] = fileData[column][i];
        }
        processedRows.push(row);
      }

      // Apply filters
      let filteredData = processedRows.filter((row) => {
        return Object.entries(filters).every(([column, filterValue]) => {
          if (!filterValue) return true;
          const value = String(row[column]).toLowerCase();
          return value.includes(filterValue.toLowerCase());
        });
      });

      setProcessedData(filteredData);
    };

    processData();
  }, [fileData, filters, selectedColumns]);

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

  // return (
  //   <>
  //     <FilterExportCard
  //       selectedColumns={selectedColumns}
  //       toggleColumn={toggleColumn}
  //       exportToPDF={exportToPDF}
  //       isExporting={isExporting}
  //     />
  //     {isExporting && (
  //       <Card className="mb-4">
  //         <CardContent className="py-4">
  //           <div className="space-y-2">
  //             <div className="flex justify-between text-sm">
  //               <span>Exportando PDF...</span>
  //               <span>{exportProgress}%</span>
  //             </div>
  //             <Progress value={exportProgress} className="h-2" />
  //           </div>
  //         </CardContent>
  //       </Card>
  //     )}
  //     {fileData && (
  //       <ChartCards data={fileData} selectedColumns={selectedColumns} />
  //     )}
  //   </>
  // );

  return (
    <>
      <FilterExportCard
        selectedColumns={selectedColumns}
        toggleColumn={toggleColumn}
        exportToPDF={exportToPDF}
        isExporting={isExporting}
        availableColumns={availableColumns}
        filters={filters}
        setFilters={setFilters}
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
      <ChartCards data={processedData} selectedColumns={selectedColumns} />
    </>
  );
}
