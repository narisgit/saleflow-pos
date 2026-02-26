
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInventory, useOrders } from "@/lib/store"
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function DashboardPage() {
  const { products } = useInventory()
  const { orders } = useOrders()

  const totalSales = orders.reduce((acc, order) => acc + order.total, 0)
  const totalItemsSold = orders.reduce((acc, order) => acc + order.items.reduce((iAcc, item) => iAcc + item.quantity, 0), 0)
  const lowStockProducts = products.filter(p => p.stock < 10).length

  // Simplified chart data
  const chartData = orders.slice(0, 7).reverse().map(order => ({
    name: new Date(order.date).toLocaleDateString([], { weekday: 'short' }),
    total: order.total
  }))

  const stats = [
    { title: "Total Revenue", value: `$${totalSales.toFixed(2)}`, icon: DollarSign, color: "text-blue-600" },
    { title: "Orders Completed", value: orders.length, icon: ShoppingCart, color: "text-green-600" },
    { title: "Items Sold", value: totalItemsSold, icon: TrendingUp, color: "text-purple-600" },
    { title: "Low Stock Items", value: lowStockProducts, icon: Package, color: "text-orange-600" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, here's your sales overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    cursor={{fill: '#f0f0f0'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground italic">
                No transaction data available yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.filter(p => p.stock < 10).length > 0 ? (
                products.filter(p => p.stock < 10).slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.category}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-orange-100 text-orange-700">
                      {p.stock} left
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Inventory levels are healthy!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
