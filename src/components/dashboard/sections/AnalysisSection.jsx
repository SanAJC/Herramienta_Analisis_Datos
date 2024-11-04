// // src/components/dashboard/sections/AnalysisSection.jsx
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function AnalysisSection({ showNotification }) {
//   return (
//     <Card className="mb-6">
//       <CardHeader>
//         <CardTitle>Seleccionar Análisis</CardTitle>
//         <CardDescription>Elige el tipo de análisis a ejecutar</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Select
//           onValueChange={(value) =>
//             showNotification(`Análisis ${value} seleccionado`)
//           }
//         >
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder="Selecciona un tipo de análisis" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="descriptivo">Análisis Descriptivo</SelectItem>
//             <SelectItem value="inferencial">Análisis Inferencial</SelectItem>
//             <SelectItem value="regresion">Análisis de Regresión</SelectItem>
//             <SelectItem value="cluster">Análisis de Clústeres</SelectItem>
//           </SelectContent>
//         </Select>
//         <Button
//           className="mt-4 w-full"
//           onClick={() => showNotification("Análisis iniciado")}
//         >
//           Iniciar Análisis
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

import { useState } from "react";
import {
  ChevronRight,
  BarChart2,
  GitBranch,
  PieChart,
  TrendingUp,
  Settings2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const analysisTypes = {
  descriptivo: {
    icon: PieChart,
    description:
      "Resumen estadístico de los datos, incluyendo medidas de tendencia central y dispersión",
    estimatedTime: "2-3 minutos",
    complexity: "Baja",
  },
  inferencial: {
    icon: TrendingUp,
    description:
      "Pruebas de hipótesis y estimación de parámetros poblacionales",
    estimatedTime: "5-7 minutos",
    complexity: "Media",
  },
  regresion: {
    icon: BarChart2,
    description: "Modelado de relaciones entre variables y predicciones",
    estimatedTime: "8-10 minutos",
    complexity: "Alta",
  },
  cluster: {
    icon: GitBranch,
    description: "Agrupamiento de datos en clusters basados en similitud",
    estimatedTime: "6-8 minutos",
    complexity: "Media-Alta",
  },
};

export default function AnalysisSection({ showNotification }) {
  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleAnalysisSelect = (value) => {
    setSelectedAnalysis(value);
    showNotification(`Análisis ${value} seleccionado`);
  };

  const runAnalysis = async () => {
    if (!selectedAnalysis) {
      showNotification("Por favor selecciona un tipo de análisis", "error");
      return;
    }

    setIsRunning(true);
    setProgress(0);

    // Simulación del progreso
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProgress(i);
    }

    setIsRunning(false);
    showNotification("Análisis completado con éxito");
  };

  const AnalysisIcon = selectedAnalysis
    ? analysisTypes[selectedAnalysis].icon
    : null;

  return (
    <Card className="mb-6 shadow-lg transition-all duration-200">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Seleccionar Análisis
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Configuración avanzada</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-gray-500">
          Elige el tipo de análisis más adecuado para tus datos
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Select onValueChange={handleAnalysisSelect} value={selectedAnalysis}>
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Selecciona un tipo de análisis">
                {selectedAnalysis && (
                  <div className="flex items-center space-x-2">
                    {AnalysisIcon && <AnalysisIcon className="h-4 w-4" />}
                    <span>
                      {selectedAnalysis.charAt(0).toUpperCase() +
                        selectedAnalysis.slice(1)}
                    </span>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(analysisTypes).map(([key, value]) => (
                <SelectItem key={key} value={key} className="py-3">
                  <div className="flex items-center space-x-2">
                    <value.icon className="h-4 w-4" />
                    <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedAnalysis && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <span>Información del análisis</span>
              </h4>
              <p className="text-sm text-gray-600">
                {analysisTypes[selectedAnalysis].description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Tiempo estimado:</span>
                  <br />
                  <span className="font-medium">
                    {analysisTypes[selectedAnalysis].estimatedTime}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Complejidad:</span>
                  <br />
                  <span className="font-medium">
                    {analysisTypes[selectedAnalysis].complexity}
                  </span>
                </div>
              </div>
            </div>
          )}

          {showAdvanced && (
            <div className="space-y-3 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium">Configuración avanzada</h4>
              <div className="grid grid-cols-2 gap-4">
                <Select defaultValue="auto">
                  <SelectTrigger>
                    <SelectValue placeholder="Método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Automático</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue placeholder="Precisión" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <Button
          className="w-full h-12 text-lg relative overflow-hidden"
          onClick={runAnalysis}
          disabled={isRunning || !selectedAnalysis}
        >
          <span className="flex items-center justify-center space-x-2">
            {isRunning ? (
              <>
                <span>Procesando</span>
                <Progress value={progress} className="w-20" />
              </>
            ) : (
              <>
                <span>Iniciar Análisis</span>
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </span>
        </Button>
      </CardContent>

      {selectedAnalysis && !isRunning && (
        <CardFooter className="bg-gray-50 text-sm text-gray-500 rounded-b-lg">
          <p>
            Los resultados se mostrarán en el panel de visualización una vez
            completado el análisis
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
