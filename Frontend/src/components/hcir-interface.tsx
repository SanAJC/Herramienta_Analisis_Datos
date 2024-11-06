import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Home,
  Upload,
  PlayCircle,
  PieChart as PieChartIcon,
  User,
  Menu,
  Edit2,
  Save,
  FileDown,
  Link,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HcirInterface() {
  const [activeSection, setActiveSection] = useState("home");
  const [notification, setNotification] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([
    "valor",
    "tendencia",
    "porcentaje",
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Investigador",
    bio: "Investigador apasionado por el análisis de datos y la interpretación estadística.",
  });
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
      icon: <PieChartIcon className="h-12 w-12" />,
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

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const data = [
    { name: "Grupo A", valor: 400, tendencia: 240, porcentaje: 40 },
    { name: "Grupo B", valor: 300, tendencia: 139, porcentaje: 30 },
    { name: "Grupo C", valor: 200, tendencia: 980, porcentaje: 20 },
    { name: "Grupo D", valor: 278, tendencia: 390, porcentaje: 27.8 },
    { name: "Grupo E", valor: 189, tendencia: 480, porcentaje: 18.9 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const toggleColumn = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const handleProfileChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    setIsEditing(false);
    showNotification("Perfil actualizado con éxito");
  };

  const exportToPDF = () => {
    showNotification("Exportando a PDF...");
    // Aquí iría la lógica real para exportar a PDF
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barra de navegación lateral */}
      <nav className="w-16 md:w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">
            HCIR
          </h1>
          <Menu className="md:hidden" />
        </div>
        <ul className="mt-6">
          {[
            { icon: <Home />, label: "Inicio", id: "home" },
            { icon: <Upload />, label: "Carga de Datos", id: "upload" },
            {
              icon: <PlayCircle />,
              label: "Ejecución de Análisis",
              id: "analysis",
            },
            {
              icon: <PieChartIcon />,
              label: "Visualización",
              id: "visualization",
            },
            { icon: <User />, label: "Perfil", id: "profile" },
          ].map((item) => (
            <li key={item.id} className="mb-2">
              <TooltipProvider>
                <UITooltip>
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
                      <span className="ml-3 hidden md:inline">
                        {item.label}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>

      {/* Área principal de contenido */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Página de inicio */}
        {activeSection === "home" && (
          <div className="min-h-[calc(100vh-2rem)] bg-[#000] to-indigo-100 flex flex-col justify-center items-center p-6 -m-6">
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

            <motion.div
              className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
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
                      Vista previa
                    </motion.div>
                  </div>
                </div>
              </div>
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
        )}

        {/* Panel de carga de archivos */}
        {activeSection === "upload" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cargar Datos</CardTitle>
              <CardDescription>
                Sube tus archivos o proporciona una URL para importar datos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file">Archivo</TabsTrigger>
                  <TabsTrigger value="url">URL</TabsTrigger>
                </TabsList>
                <TabsContent value="file">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() =>
                      showNotification("Archivo cargado con éxito")
                    }
                  >
                    <Upload className="mx-auto mb-4" />
                    <p className="text-sm text-gray-600">
                      Haz clic o arrastra tu archivo aquí
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="url"
                        placeholder="Ingresa la URL de tus datos"
                      />
                      <Button
                        onClick={() =>
                          showNotification("Datos importados desde URL")
                        }
                      >
                        <Link className="mr-2 h-4 w-4" />
                        Importar
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Ingresa la URL de un archivo CSV, JSON o cualquier otra
                      fuente de datos compatible.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Panel de ejecución de análisis */}
        {activeSection === "analysis" && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Seleccionar Análisis</CardTitle>
              <CardDescription>
                Elige el tipo de análisis a ejecutar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                onValueChange={(value) =>
                  showNotification(`Análisis ${value} seleccionado`)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un tipo de análisis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="descriptivo">
                    Análisis Descriptivo
                  </SelectItem>
                  <SelectItem value="inferencial">
                    Análisis Inferencial
                  </SelectItem>
                  <SelectItem value="regresion">
                    Análisis de Regresión
                  </SelectItem>
                  <SelectItem value="cluster">Análisis de Clústeres</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="mt-4 w-full"
                onClick={() => showNotification("Análisis iniciado")}
              >
                Iniciar Análisis
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Panel de visualización */}
        {activeSection === "visualization" && (
          <>
            {/* Barra de filtros y exportación */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Filtros y Exportación</CardTitle>
                  <Button onClick={exportToPDF}>
                    <FileDown className="mr-2 h-4 w-4" />
                    Exportar a PDF
                  </Button>
                </div>
                <CardDescription>
                  Selecciona las columnas que deseas visualizar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {["valor", "tendencia", "porcentaje"].map((column) => (
                    <div key={column} className="flex items-center space-x-2">
                      <Checkbox
                        id={column}
                        checked={selectedColumns.includes(column)}
                        onCheckedChange={() => toggleColumn(column)}
                      />
                      <Label htmlFor={column}>
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gráficas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gráfico de Barras */}
              <Card>
                <CardHeader>
                  <CardTitle>Gráfico de Barras</CardTitle>
                  <CardDescription>
                    Comparación de valores por grupo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {selectedColumns.includes("valor") && (
                        <Bar dataKey="valor" fill="#8884d8" />
                      )}
                      {selectedColumns.includes("tendencia") && (
                        <Bar dataKey="tendencia" fill="#82ca9d" />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Líneas */}
              <Card>
                <CardHeader>
                  <CardTitle>Gráfico de Líneas</CardTitle>
                  <CardDescription>
                    Tendencias a lo largo del tiempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {selectedColumns.includes("valor") && (
                        <Line
                          type="monotone"
                          dataKey="valor"
                          stroke="#8884d8"
                        />
                      )}
                      {selectedColumns.includes("tendencia") && (
                        <Line
                          type="monotone"
                          dataKey="tendencia"
                          stroke="#82ca9d"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Gráfico de Pastel */}
              <Card>
                <CardHeader>
                  <CardTitle>Gráfico de Pastel</CardTitle>
                  <CardDescription>Distribución porcentual</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey={
                          selectedColumns.includes("porcentaje")
                            ? "porcentaje"
                            : "valor"
                        }
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {data.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Panel de Interpretación Automática */}
              <Card>
                <CardHeader>
                  <CardTitle>Interpretación Automática</CardTitle>
                  <CardDescription>Resumen de hallazgos clave</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                    <li>
                      El Grupo A muestra el valor más alto con 400 unidades y
                      representa el 40% del total.
                    </li>
                    <li>
                      Existe una tendencia decreciente en los valores desde el
                      Grupo A hasta el Grupo C.
                    </li>
                    <li>
                      El Grupo C presenta la tendencia más alta con 980
                      unidades, a pesar de tener un valor bajo.
                    </li>
                    <li>
                      El Grupo E tiene el valor y porcentaje más bajo, indicando
                      una posible área de mejora.
                    </li>
                    <li>
                      La distribución de porcentajes muestra una concentración
                      en los Grupos A, B y D, que suman el 97.8% del total.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Perfil de usuario */}
        {activeSection === "profile" && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Perfil de Usuario</CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <Save className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src="/placeholder.svg?height=80&width=80"
                      alt={userProfile.name}
                    />
                    <AvatarFallback>
                      {userProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {userProfile.name}
                    </h3>
                    <p className="text-sm text-gray-500">{userProfile.role}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={userProfile.name}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={userProfile.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Rol</Label>
                    <Input
                      id="role"
                      name="role"
                      value={userProfile.role}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={userProfile.bio}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
                {isEditing && (
                  <Button onClick={saveProfile} className="w-full">
                    Guardar Cambios
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notificaciones */}
        {notification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
            {notification}
          </div>
        )}
      </main>
    </div>
  );
}
