import React, { useState } from "react";
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
import { Calendar as CalendarIcon, Search, History } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const historyData = [
  {
    id: 1,
    action: "Análisis de Regresión",
    dataset: "Ventas Q2 2023",
    date: "2023-06-15",
    status: "Completado",
  },
  {
    id: 2,
    action: "Carga de Datos",
    dataset: "Encuesta de Satisfacción",
    date: "2023-06-14",
    status: "Exitoso",
  },
  {
    id: 3,
    action: "Visualización",
    dataset: "Métricas de Marketing",
    date: "2023-06-13",
    status: "Completado",
  },
  {
    id: 4,
    action: "Análisis de Clústeres",
    dataset: "Segmentación de Clientes",
    date: "2023-06-12",
    status: "En Progreso",
  },
  {
    id: 5,
    action: "Carga de Datos",
    dataset: "Datos Financieros Q1 2023",
    date: "2023-06-11",
    status: "Fallido",
  },
];

export default function HistorySection({ showNotification }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState();

  const filteredData = historyData.filter(
    (item) =>
      (item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.dataset.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || item.status === statusFilter) &&
      (!date || item.date === format(date, "yyyy-MM-dd"))
  );

  const getBadgeVariant = (status) => {
    switch (status) {
      case "Completado":
      case "Exitoso":
        return "success";
      case "En Progreso":
        return "warning";
      case "Fallido":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Historial</h2>
          <p className="text-muted-foreground">
            Registro de análisis y acciones realizadas en la plataforma
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Buscar por acción o conjunto de datos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-500" />}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Fallido">Fallido</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP")
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {(date || statusFilter !== "all") && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setDate(undefined);
                    setStatusFilter("all");
                    showNotification("Filtros limpiados");
                  }}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {filteredData.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Acción</TableHead>
                    <TableHead>Conjunto de Datos</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.action}
                      </TableCell>
                      <TableCell>{item.dataset}</TableCell>
                      <TableCell>
                        {format(new Date(item.date), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                No se encontraron resultados para los filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
