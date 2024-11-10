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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

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
  selectedYColumns,
  selectedXColumns,
  toggleYColumn,
  toggleXColumn,
  exportToPDF,
  isExporting,
  availableColumns,
  filters,
  setFilters,
}) => {
  return (
    <Card className="mb-6 bg-white shadow-md">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Visualización de Datos
            </CardTitle>
            <CardDescription className="text-gray-500">
              Personaliza y exporta tus visualizaciones de manera sencilla
            </CardDescription>
          </div>
          <div className="flex items-center space-x-3">
            <DataFilterDialog
              columns={availableColumns}
              filters={filters}
              setFilters={setFilters}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-lg transition-colors"
            />
            <ExportDialog
              onExport={exportToPDF}
              isExporting={isExporting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Eje X</h3>
              <Badge variant="secondary" className="text-sm">
                {selectedXColumns.length} seleccionados
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableColumns.map((column) => (
                <label
                  key={column}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-black	 transition-colors cursor-pointer group"
                >
                  <span className="capitalize text-gray-700 group-hover:text-black">
                    {column}
                  </span>
                  <Switch
                    checked={selectedXColumns.includes(column)}
                    onCheckedChange={() => toggleXColumn(column)}
                    className="data-[state=checked]:bg-black	"
                  />
                </label>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Eje Y</h3>
              <Badge variant="secondary" className="text-sm">
                {selectedYColumns.length} seleccionados
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableColumns.map((column) => (
                <label
                  key={column}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer group"
                >
                  <span className="capitalize text-gray-700 group-hover:text-blue-600">
                    {column}
                  </span>
                  <Switch
                    checked={selectedYColumns.includes(column)}
                    onCheckedChange={() => toggleYColumn(column)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>
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
  const [selectedXColumns, setSelectedXColumns] = useState([]);
  const [selectedYColumns, setSelectedYColumns] = useState([]);
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification("Error al cargar los datos", "error");
      }
    };
    fetchData();
  }, []);

  const toggleXColumn = (column) => {
    setSelectedXColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const toggleYColumn = (column) => {
    setSelectedYColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  // Procesar datos
  useEffect(() => {
    if (!fileData) return;
    const processData = () => {
      const dataLength = fileData[Object.keys(fileData)[0]]?.length || 0;
      let processedRows = [];
      for (let i = 0; i < dataLength; i++) {
        let row = {};
        for (const column of availableColumns) {
          row[column] = fileData[column][i];
        }
        processedRows.push(row);
      }

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
  }, [fileData, filters, selectedXColumns, selectedYColumns]);

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

      // Añadir columnas seleccionadas
      pdf.setFontSize(12);
      pdf.text("Columnas seleccionadas:", 20, 40);
      pdf.setFontSize(10);
      let currentY = 50;

      if (selectedXColumns.length > 0) {
        pdf.text("Eje X:", 30, currentY);
        currentY += 7;
        selectedXColumns.forEach((column) => {
          pdf.text(`• ${column}`, 40, currentY);
          currentY += 7;
        });
      }

      if (selectedYColumns.length > 0) {
        pdf.text("Eje Y:", 30, currentY);
        currentY += 7;
        selectedYColumns.forEach((column) => {
          pdf.text(`• ${column}`, 40, currentY);
          currentY += 7;
        });
      }

      // Añadir filtros aplicados
      if (Object.keys(filters).length > 0) {
        pdf.text("Filtros aplicados:", 20, currentY);
        currentY += 7;
        Object.entries(filters).forEach(([column, value]) => {
          if (value) {
            pdf.text(`• ${column}: ${value}`, 30, currentY);
            currentY += 7;
          }
        });
      }

      setExportProgress(80);

      // Añadir la imagen de los gráficos
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 20, currentY + 10, pdfWidth, pdfHeight);

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
        selectedXColumns={selectedXColumns}
        toggleXColumn={toggleXColumn}
        selectedYColumns={selectedYColumns}
        toggleYColumn={toggleYColumn}
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
      <ChartCards
        data={processedData}
        selectedColumns={{ x: selectedXColumns, y: selectedYColumns }}
      />
    </>
  );
}
