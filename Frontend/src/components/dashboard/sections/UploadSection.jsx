// // src/components/dashboard/sections/UploadSection.jsx
// import { Upload, Link } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// export default function UploadSection({ showNotification }) {
//   return (
//     <Card className="mb-6">
//       <CardHeader>
//         <CardTitle>Cargar Datos</CardTitle>
//         <CardDescription>
//           Sube tus archivos o proporciona una URL para importar datos
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Tabs defaultValue="file" className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="file">Archivo</TabsTrigger>
//             <TabsTrigger value="url">URL</TabsTrigger>
//           </TabsList>
//           <TabsContent value="file">
//             <div
//               className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
//               onClick={() => showNotification("Archivo cargado con éxito")}
//             >
//               <Upload className="mx-auto mb-4" />
//               <p className="text-sm text-gray-600">
//                 Haz clic o arrastra tu archivo aquí
//               </p>
//             </div>
//           </TabsContent>
//           <TabsContent value="url">
//             <div className="space-y-4">
//               <div className="flex items-center space-x-2">
//                 <Input type="url" placeholder="Ingresa la URL de tus datos" />
//                 <Button
//                   onClick={() => showNotification("Datos importados desde URL")}
//                 >
//                   <Link className="mr-2 h-4 w-4" />
//                   Importar
//                 </Button>
//               </div>
//               <p className="text-sm text-gray-500">
//                 Ingresa la URL de un archivo CSV, JSON o cualquier otra fuente
//                 de datos compatible.
//               </p>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   );
// }

import { Upload, Link, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { uploadFile } from "../../../services/api";

export default function UploadSection({ showNotification }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validar tipo de archivo
    const validTypes = ["csv", "xls", "xlsx"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!validTypes.includes(fileType)) {
      showNotification(
        "Error: Tipo de archivo no válido. Use CSV, XLS o XLSX",
        "error"
      );
      return;
    }

    // Validar tamaño (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification("Error: El archivo excede el límite de 10MB", "error");
      return;
    }

    setSelectedFile(file);
    showNotification("Archivo seleccionado: " + file.name);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    try {
      const response = await uploadFile(selectedFile);
      showNotification("Archivo cargado con éxito: " + response.file);
    } catch (error) {
      showNotification("Error al cargar el archivo. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  const handleUrlSubmit = async () => {
    if (!url) return;
    setLoading(true);
    // Simular carga
    await new Promise((resolve) => setTimeout(resolve, 1500));
    showNotification("Datos importados desde URL");
    setLoading(false);
    setUrl("");
  };

  return (
    <Card className="mb-6 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Cargar Datos</CardTitle>
        <CardDescription className="text-gray-500">
          Sube tus archivos o proporciona una URL para importar datos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger
              value="file"
              className="data-[state=active]:bg-[white]"
            >
              <Upload className="mr-2 h-4 w-4" />
              Archivo
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-[white]">
              <Link className="mr-2 h-4 w-4" />
              URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file" className="focus-visible:outline-none">
            <div
              className={`relative border-2 ${
                dragActive ? "border-primary" : "border-gray-200"
              } border-dashed rounded-lg p-8 transition-all duration-200 ${
                !selectedFile ? "hover:border-primary hover:bg-gray-50" : ""
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="hidden"
                onChange={handleFileInput}
                id="file-upload"
              />

              {!selectedFile ? (
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Upload
                    className={`w-12 h-12 mb-4 ${
                      dragActive
                        ? "text-primary animate-bounce"
                        : "text-gray-400"
                    }`}
                  />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {dragActive
                      ? "Suelta el archivo aquí"
                      : "Arrastra y suelta o haz clic para seleccionar"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Soporta archivos CSV, JSON, XLS hasta 10MB
                  </p>
                </label>
              ) : (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <File className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium text-gray-700">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => setSelectedFile(null)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={loading}
                      className="min-w-[100px]"
                    >
                      {loading ? "Cargando..." : "Subir"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="focus-visible:outline-none">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="url"
                  placeholder="https://ejemplo.com/datos.csv"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleUrlSubmit}
                  disabled={loading || !url}
                  className="min-w-[120px]"
                >
                  {loading ? (
                    "Importando..."
                  ) : (
                    <>
                      <Link className="mr-2 h-4 w-4" />
                      Importar
                    </>
                  )}
                </Button>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Formatos soportados:
                </h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• CSV (valores separados por comas)</li>
                  <li>• JSON (JavaScript Object Notation)</li>
                  <li>• XLS/XLSX (Hojas de cálculo Excel)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
