import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Search, History, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { obtenerHistorial, eliminarArchivo } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function HistorySection() {
  const [archivos, setArchivos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("all");
  const [fecha, setFecha] = useState();
  const { toast } = useToast();

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      setCargando(true);
      const datos = await obtenerHistorial();
      setArchivos(datos);
      setError(null);
    } catch (err) {
      setError('Error al cargar el historial de archivos');
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cargar el historial de archivos",
      });
    } finally {
      setCargando(false);
    }
  };

  const handleEliminarArchivo = async (id) => {
    try {
      await eliminarArchivo(id);
      toast({
        title: "Éxito",
        description: "Archivo eliminado correctamente",
      });
      cargarHistorial(); 
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el archivo",
      });
    }
  };

  const datosFiltrados = archivos.filter((archivo) => {
    const cumpleBusqueda = 
      archivo.file.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      archivo.file_type.toLowerCase().includes(terminoBusqueda.toLowerCase());
    
    const cumpleFiltroEstado = 
      filtroEstado === "all" || archivo.status === filtroEstado;
    
    const cumpleFiltroFecha = 
      !fecha || format(new Date(archivo.created_at), "yyyy-MM-dd") === format(fecha, "yyyy-MM-dd");

    return cumpleBusqueda && cumpleFiltroEstado && cumpleFiltroFecha;
  });


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Historial de Archivos</CardTitle>
        <CardDescription>Registro de archivos procesados en la plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nombre o tipo de archivo"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4 text-gray-500" />}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="completed">Cargado</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fecha ? format(fecha, "PPP") : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={fecha}
                  onSelect={setFecha}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {(fecha || filtroEstado !== "all") && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setFecha(undefined);
                  setFiltroEstado("all");
                }}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>

        {cargando ? (
          <div className="text-center py-10">
            <p>Cargando historial...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del Archivo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosFiltrados.map((archivo) => (
                  <TableRow key={archivo.id}>
                    <TableCell className="font-medium">{archivo.file}</TableCell>
                    <TableCell>{archivo.file_type}</TableCell>
                    <TableCell>{format(new Date(archivo.created_at), 'dd MMM yyyy')}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          archivo.status === "completed" ? "Completado" :
                          archivo.status === "processing" ? "En Proceso" :
                          "Error"
                        }
                      >
                        { archivo.status === "completed" ? "success" :
                          archivo.status === "processing" ? "warning" :
                          "Exitoso"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminarArchivo(archivo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
