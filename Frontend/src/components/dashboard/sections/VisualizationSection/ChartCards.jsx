// // src/components/dashboard/sections/VisualizationSection/ChartCards.jsx
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   Cell,
//   ComposedChart,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// export default function ChartCards({ data, selectedColumns }) {
//   return (
//     <div
//       id="charts-container"
//       className="grid grid-cols-1 md:grid-cols-2 gap-6"
//     >
//       {/* Gráfico de Barras */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Gráfico de Barras</CardTitle>
//           <CardDescription>Comparación de valores por grupo</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {selectedColumns.includes("valor") && (
//                 <Bar dataKey="valor" fill="#8884d8" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Bar dataKey="tendencia" fill="#82ca9d" />
//               )}
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Gráfico de Líneas */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Gráfico de Líneas</CardTitle>
//           <CardDescription>Tendencias a lo largo del tiempo</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               {selectedColumns.includes("valor") && (
//                 <Line type="monotone" dataKey="valor" stroke="#8884d8" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Line type="monotone" dataKey="tendencia" stroke="#82ca9d" />
//               )}
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* nuevo */}

//       <Card>
//         <CardHeader>
//           <CardTitle>Gráfico Combinado</CardTitle>
//           <CardDescription>Comparación de valores y tendencias</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <ComposedChart
//               data={data}
//               margin={{
//                 top: 20,
//                 right: 20,
//                 bottom: 20,
//                 left: 20,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />

//               {/* Condicionales para las barras según selectedColumns */}
//               {selectedColumns.includes("valor") && (
//                 <Bar dataKey="valor" barSize={20} fill="#8884d8" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Bar dataKey="tendencia" barSize={20} fill="#82ca9d" />
//               )}

//               {/* Línea adicional opcional según selectedColumns */}
//               {selectedColumns.includes("valor") && (
//                 <Line type="monotone" dataKey="valor" stroke="#413ea0" />
//               )}
//               {selectedColumns.includes("tendencia") && (
//                 <Line type="monotone" dataKey="tendencia" stroke="#ff7300" />
//               )}
//             </ComposedChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Panel de Interpretación Automática */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Interpretación Automática</CardTitle>
//           <CardDescription>Resumen de hallazgos clave</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
//             <li>
//               El Grupo A muestra el valor más alto con 400 unidades y representa
//               el 40% del total.
//             </li>
//             <li>
//               Existe una tendencia decreciente en los valores desde el Grupo A
//               hasta el Grupo C.
//             </li>
//             <li>
//               El Grupo C presenta la tendencia más alta con 980 unidades, a
//               pesar de tener un valor bajo.
//             </li>
//             <li>
//               El Grupo E tiene el valor y porcentaje más bajo, indicando una
//               posible área de mejora.
//             </li>
//             <li>
//               La distribución de porcentajes muestra una concentración en los
//               Grupos A, B y D, que suman el 97.8% del total.
//             </li>
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// src/components/dashboard/sections/VisualizationSection/ChartCards.jsx
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
  ComposedChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function ChartCards({ data, selectedColumns }) {
  return (
    // Añadimos el id="charts-container" aquí
    <div
      id="charts-container"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Gráfico de Barras */}
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Gráfico de Barras</CardTitle>
          <CardDescription>Comparación de valores por grupo</CardDescription>
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
      <Card className="print:break-inside-avoid">
        <CardHeader>
          <CardTitle>Gráfico de Líneas</CardTitle>
          <CardDescription>Tendencias a lo largo del tiempo</CardDescription>
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
                <Line type="monotone" dataKey="valor" stroke="#8884d8" />
              )}
              {selectedColumns.includes("tendencia") && (
                <Line type="monotone" dataKey="tendencia" stroke="#82ca9d" />
              )}
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
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedColumns.includes("valor") && (
                <Bar dataKey="valor" barSize={20} fill="#8884d8" />
              )}
              {selectedColumns.includes("tendencia") && (
                <Bar dataKey="tendencia" barSize={20} fill="#82ca9d" />
              )}
              {selectedColumns.includes("valor") && (
                <Line type="monotone" dataKey="valor" stroke="#413ea0" />
              )}
              {selectedColumns.includes("tendencia") && (
                <Line type="monotone" dataKey="tendencia" stroke="#ff7300" />
              )}
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
            <li>
              El Grupo A muestra el valor más alto con 400 unidades y representa
              el 40% del total.
            </li>
            <li>
              Existe una tendencia decreciente en los valores desde el Grupo A
              hasta el Grupo C.
            </li>
            <li>
              El Grupo C presenta la tendencia más alta con 980 unidades, a
              pesar de tener un valor bajo.
            </li>
            <li>
              El Grupo E tiene el valor y porcentaje más bajo, indicando una
              posible área de mejora.
            </li>
            <li>
              La distribución de porcentajes muestra una concentración en los
              Grupos A, B y D, que suman el 97.8% del total.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
