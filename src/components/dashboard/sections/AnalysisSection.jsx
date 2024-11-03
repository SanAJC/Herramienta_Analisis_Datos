// src/components/dashboard/sections/AnalysisSection.jsx
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

export default function AnalysisSection({ showNotification }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Seleccionar Análisis</CardTitle>
        <CardDescription>Elige el tipo de análisis a ejecutar</CardDescription>
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
            <SelectItem value="descriptivo">Análisis Descriptivo</SelectItem>
            <SelectItem value="inferencial">Análisis Inferencial</SelectItem>
            <SelectItem value="regresion">Análisis de Regresión</SelectItem>
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
  );
}