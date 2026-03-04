
"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInventory, useOrders, useLanguage } from "@/lib/store"
import { TrendingUp, Package, ShoppingCart, DollarSign, Loader2, Calendar } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function DashboardPage() {
  const { products } = useInventory()
  const { orders } = useOrders()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalSales = useMemo(() => orders.reduce((acc, order) => acc + order.total, 0), [orders])
  const totalItemsSold = useMemo(() => orders.reduce((acc, order) => acc + order.items.reduce((iAcc, item) => iAcc + item.quantity, 0), 0), [orders])
  const lowStockProducts = useMemo(() => products.filter(p => p.stock < 10).length, [products])

  // คำนวณยอดขายรายเดือนสำหรับปีปัจจุบัน
  const monthlyChartData = useMemo(() => {
    const monthNames = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ]
    
    const currentYear = new Date().getFullYear()
    const data = monthNames.map(name => ({ name, total: 0 }))

    orders.forEach(order => {
      const orderDate = new Date(order.date)
      if (orderDate.getFullYear() === currentYear) {
        const monthIndex = orderDate.getMonth()
        data[monthIndex].total += order.total
      }
    })

    return data
  }, [orders])

  const stats = [
    { title: t.totalRevenue, value: `${totalSales.toLocaleString()} ฿`, icon: DollarSign, color: "text-blue-600" },
    { title: t.ordersCompleted, value: orders.length.toLocaleString(), icon: ShoppingCart, color: "text-green-600" },
    { title: t.itemsSold, value: totalItemsSold.toLocaleString(), icon: TrendingUp, color: "text-purple-600" },
    { title: t.lowStockItems, value: lowStockProducts.toLocaleString(), icon: Package, color: "text-orange-600" },
  ]

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center p-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.dashboard}</h1>
          <p className="text-muted-foreground">ภาพรวมยอดขายรายเดือน ปี {new Date().getFullYear() + 543}</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border shadow-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">สรุปผลแบบเรียลไทม์</span>
        </div>
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
            <CardTitle>ยอดขายรวมแยกตามเดือน (฿)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {orders.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12}}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(value) => `${value.toLocaleString()}`}
                    tick={{fontSize: 12}}
                  />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    formatter={(value: number) => [`${value.toLocaleString()} ฿`, 'ยอดขาย']}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {monthlyChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === new Date().getMonth() ? 'hsl(var(--primary))' : '#cbd5e1'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground italic">
                {t.noOrders}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-orange-600 flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t.lowStockAlert}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-4">
              {products.filter(p => p.stock < 10).length > 0 ? (
                products.filter(p => p.stock < 10).sort((a,b) => a.stock - b.stock).slice(0, 8).map(p => (
                  <div key={p.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div className="min-w-0 pr-2">
                      <p className="font-medium text-sm truncate">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">{p.category}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${p.stock <= 2 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                      {p.stock} {t.units}
                    </span>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-center py-8 text-muted-foreground text-sm italic">
                  สต็อกสินค้าอยู่ในระดับปกติ
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
