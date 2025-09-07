import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function ComparacionCostos({ datos }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparación de Costos</CardTitle>
        <CardDescription>Costo mensual actual vs. energía renovable</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="nombre" className="text-xs fill-muted-foreground" />
            <YAxis
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `$${(value || 0).toLocaleString()}`}
            />
            <Tooltip
              formatter={(value) => [`$${(value || 0).toLocaleString()}`, "Costo"]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="costo" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
