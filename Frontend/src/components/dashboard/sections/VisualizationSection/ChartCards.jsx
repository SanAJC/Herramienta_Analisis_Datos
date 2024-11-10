// // // src/components/dashboard/sections/VisualizationSection/ChartCards.jsx
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChartCards({ data, selectedColumns }) {
  const formatChartData = () => {
    if (!data || data.length === 0 || !selectedColumns.x || !selectedColumns.y)
      return [];
    return data.map((row) => ({
      xValue: row[selectedColumns.x], // El valor del eje X
      ...selectedColumns.y.reduce((acc, column) => {
        acc[column] = parseFloat(row[column]) || 0; // Asignamos cada columna y su valor
        return acc;
      }, {}),
    }));
  };

  const chartData = formatChartData();

  return (
    <div
      id="charts-container"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Gráfico de Barras */}
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Gráfico de Barras</CardTitle>
          <CardDescription>
            Comparación de valores por {selectedColumns.x}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="xValue"
                label={{
                  value: selectedColumns.x,
                  position: "insideBottom",
                  offset: -3,
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedColumns.y.map((column, index) => (
                <Bar
                  key={column}
                  dataKey={column}
                  fill={`hsl(${
                    index * (360 / selectedColumns.y.length)
                  }, 70%, 50%)`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Líneas */}
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Gráfico de Líneas</CardTitle>
          <CardDescription>
            Tendencias de {selectedColumns.y.join(", ")} por {selectedColumns.x}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="xValue"
                label={{
                  value: selectedColumns.x,
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedColumns.y.map((column, index) => (
                <Line
                  key={column}
                  type="monotone"
                  dataKey={column}
                  stroke={`hsl(${
                    index * (360 / selectedColumns.y.length)
                  }, 70%, 50%)`}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico Combinado */}
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Gráfico Combinado</CardTitle>
          <CardDescription>Comparación de valores y tendencias</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="xValue"
                label={{
                  value: selectedColumns.x,
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedColumns.y.map((column, index) => (
                <>
                  <Bar
                    key={`bar-${column}`}
                    dataKey={column}
                    barSize={20}
                    fill={`hsl(${
                      index * (360 / selectedColumns.y.length)
                    }, 70%, 50%)`}
                  />
                  <Line
                    key={`line-${column}`}
                    type="monotone"
                    dataKey={column}
                    stroke={`hsl(${
                      index * (360 / selectedColumns.y.length)
                    }, 90%, 40%)`}
                  />
                </>
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Panel de Interpretación Automática */}
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Interpretación Automática</CardTitle>
          <CardDescription>Resumen de hallazgos clave</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            {selectedColumns.y.map((column) => {
              const values = data.map((row) => parseFloat(row[column]) || 0);
              const max = Math.max(...values);
              const min = Math.min(...values);
              const avg = values.reduce((a, b) => a + b, 0) / values.length;

              return (
                <li key={column}>
                  <strong>{column}:</strong> Máximo: {max.toFixed(2)}, Mínimo:{" "}
                  {min.toFixed(2)}, Promedio: {avg.toFixed(2)}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
