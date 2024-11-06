// src/components/dashboard/sections/VisualizationSection/FilterExportCard.jsx
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FilterExportCard({
  selectedColumns,
  toggleColumn,
  exportToPDF,
}) {
  return (
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
  );
}