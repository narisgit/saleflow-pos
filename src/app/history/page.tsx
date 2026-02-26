
"use client"

import { useOrders, useLanguage } from '@/lib/store'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Search, Eye, FileText, User, Printer, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Order } from '@/lib/types'
import { Separator } from '@/components/ui/separator'

export default function HistoryPage() {
  const { orders } = useOrders()
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.cashierName.toLowerCase().includes(search.toLowerCase()) ||
    o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
  )

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.history}</h1>
        <p className="text-muted-foreground">{t.history} Log</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder={t.searchOrders} 
          className="pl-10 h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.orderId}</TableHead>
              <TableHead>{t.date}</TableHead>
              <TableHead>{t.cashier}</TableHead>
              <TableHead>{t.total}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">
                  {t.noOrders}
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm font-bold text-primary">{order.id}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-muted-foreground" />
                      {order.cashierName}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 border-none">{t.completed}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => { setSelectedOrder(order); setShowReceipt(true); }}
                      >
                        <FileText className="w-4 h-4" />
                        {t.receipt}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => { setSelectedOrder(order); setShowReceipt(false); }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Detail / Receipt Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{showReceipt ? t.receipt : "Order Details"}</span>
              {showReceipt && (
                <Button variant="outline" size="icon" onClick={handlePrint} className="h-8 w-8">
                  <Printer className="w-4 h-4" />
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className={`space-y-4 ${showReceipt ? 'font-mono text-sm' : ''}`}>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-lg">SaleFlow POS</h3>
                <p className="text-xs text-muted-foreground">Order ID: {selectedOrder.id}</p>
                <p className="text-xs text-muted-foreground">{new Date(selectedOrder.date).toLocaleString()}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>{t.total}</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.cashier}:</span>
                  <span>{selectedOrder.cashierName}</span>
                </div>
                <p className="text-center mt-4 italic">Thank you for your business!</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
