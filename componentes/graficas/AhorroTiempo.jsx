import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

export default function AhorroTiempo({ datos }) {
  const puntoEquilibrio = datos.find((item) => item.estado === "ganancia")?.anio - 1 || 10

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ahorro Acumulado a 25 Años</CardTitle>
        <CardDescription>Proyección de ahorro considerando degradación e inflación energética</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="anio"
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `Año ${value}`}
              interval="preserveStartEnd"
            />
            <YAxis
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `$${((value || 0) / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "ahorro") return [`$${(value || 0).toLocaleString()}`, "Ahorro Acumulado"]
                return [`$${(value || 0).toLocaleString()}`, name]
              }}
              labelFormatter={(value) => `Año ${value}`}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <ReferenceLine
              x={puntoEquilibrio}
              stroke="#ef4444"
              strokeDasharray="5 5"
              label={{ value: "Punto de Equilibrio", position: "topRight" }}
            />
            <Line
              type="monotone"
              dataKey="ahorro"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-xs text-muted-foreground">
          <p>• Los primeros {puntoEquilibrio} años: recuperación de la inversión inicial</p>
          <p>• Años {puntoEquilibrio + 1}-25: período de ganancias netas</p>
          <p>• Considera degradación anual del 0.5% e inflación energética del 4%</p>
        </div>
      </CardContent>
    </Card>
  )
}
