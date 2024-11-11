// src/components/dashboard/sections/VisualizationSection/ChartCards.jsx
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
      xValue: row[selectedColumns.x],
      ...selectedColumns.y.reduce((acc, column) => {
        acc[column] = parseFloat(row[column]) || 0;
        return acc;
      }, {}),
    }));
  };

  const calculateStatistics = (values) => {
    // Ordenar valores para cálculos estadísticos
    const sortedValues = [...values].sort((a, b) => a - b);
    const n = values.length;

    // Medidas de tendencia central
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const median =
      n % 2 === 0
        ? (sortedValues[n / 2 - 1] + sortedValues[n / 2]) / 2
        : sortedValues[Math.floor(n / 2)];

    // Medidas de dispersión
    const variance =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const cv = (stdDev / mean) * 100; // Coeficiente de variación

    // Cuartiles
    const q1 = sortedValues[Math.floor(n * 0.25)];
    const q3 = sortedValues[Math.floor(n * 0.75)];
    const iqr = q3 - q1;

    return {
      mean,
      median,
      stdDev,
      cv,
      q1,
      q3,
      iqr,
      min: sortedValues[0],
      max: sortedValues[n - 1],
    };
  };

  const analyzeTimeSeries = (values, timePoints) => {
    const n = values.length;
    if (n < 2) return null;

    // Cálculo de cambios porcentuales
    const changes = [];
    for (let i = 1; i < n; i++) {
      const pctChange = ((values[i] - values[i - 1]) / values[i - 1]) * 100;
      changes.push(pctChange);
    }

    // Tendencia general (regresión lineal simple)
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0;
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += values[i];
      sumXY += i * values[i];
      sumX2 += i * i;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);

    return {
      slope,
      avgChange: changes.reduce((a, b) => a + b, 0) / changes.length,
      changes,
    };
  };

  const generateProfessionalInsights = () => {
    const insights = [];
    const chartData = formatChartData();

    selectedColumns.y.forEach((column) => {
      const values = chartData.map((item) => item[column]);
      const timePoints = chartData.map((item) => item.xValue);
      const stats = calculateStatistics(values);
      const timeSeriesAnalysis = analyzeTimeSeries(values, timePoints);

      // 1. Análisis Descriptivo
      insights.push({
        title: "Análisis Descriptivo",
        content: `Para la variable ${column}, se observa una distribución con las siguientes características estadísticas:
• Media aritmética: ${stats.mean.toFixed(2)} unidades
• Mediana: ${stats.median.toFixed(2)} unidades
• Desviación estándar: ${stats.stdDev.toFixed(2)}
• Coeficiente de variación: ${stats.cv.toFixed(2)}%`,
      });

      // 2. Análisis de Dispersión y Variabilidad
      insights.push({
        title: "Análisis de Dispersión",
        content: `La distribución de los datos presenta:
• Rango intercuartílico (IQR): ${stats.iqr.toFixed(2)}
• Q1 (25° percentil): ${stats.q1.toFixed(2)}
• Q3 (75° percentil): ${stats.q3.toFixed(2)}
• Este rango indica la dispersión central del 50% de los datos.`,
      });

      // 3. Análisis de Tendencias
      if (timeSeriesAnalysis) {
        const trendDescription =
          timeSeriesAnalysis.slope > 0 ? "creciente" : "decreciente";
        insights.push({
          title: "Análisis de Tendencias",
          content: `Se identifica una tendencia ${trendDescription} con:
• Pendiente promedio: ${timeSeriesAnalysis.slope.toFixed(3)}
• Variación porcentual promedio: ${timeSeriesAnalysis.avgChange.toFixed(2)}%
• La serie temporal muestra ${
            Math.abs(timeSeriesAnalysis.slope) < 0.1
              ? "estabilidad"
              : "variabilidad significativa"
          } en sus valores.`,
        });
      }

      // 4. Identificación de Valores Atípicos
      const outlierThreshold = 1.5 * stats.iqr;
      const lowerBound = stats.q1 - outlierThreshold;
      const upperBound = stats.q3 + outlierThreshold;
      const outliers = chartData.filter(
        (item) => item[column] < lowerBound || item[column] > upperBound
      );

      if (outliers.length > 0) {
        insights.push({
          title: "Valores Atípicos",
          content: `Se identificaron ${outliers.length} valores atípicos:
• ${outliers.map((o) => `${o.xValue}: ${o[column].toFixed(2)}`).join("\n• ")}
• Estos valores se desvían significativamente del patrón general de los datos.`,
        });
      }

      // 5. Conclusiones y Recomendaciones
      insights.push({
        title: "Conclusiones",
        content: `Del análisis realizado se puede concluir:
• La variable ${column} muestra una ${
          stats.cv > 30 ? "alta" : "moderada"
        } variabilidad (CV=${stats.cv.toFixed(2)}%)
• ${
          timeSeriesAnalysis && timeSeriesAnalysis.slope > 0
            ? `Se observa una tendencia positiva que sugiere un crecimiento sostenido`
            : `Se observa una tendencia que requiere atención para optimizar resultados`
        }
• ${
          outliers.length > 0
            ? `Los valores atípicos identificados merecen un análisis específico para determinar sus causas`
            : `No se identifican valores atípicos significativos`
        }`,
      });
    });

    return insights;
  };

  const chartData = formatChartData();

  return (
    <div
      id="charts-container"
      className="grid grid-cols-1 md:grid-cols-1 gap-6"
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

       {/* Panel de Interpretación Profesional */}
       <Card className="print:break-inside-avoid h-[47.067vh] overflow-y-scroll">
        <CardHeader>
          <CardTitle>
            Interpretación Automática
          </CardTitle>
          <CardDescription>
            Evaluación comprehensiva de patrones, tendencias y comportamientos
            estadísticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {generateProfessionalInsights().map((section, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-base">{section.title}</h3>
                <div className="text-sm text-gray-600 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
