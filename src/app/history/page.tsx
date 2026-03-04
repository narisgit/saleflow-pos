
"use client"

import { useOrders, useLanguage } from '@/lib/store'
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Search, Eye, FileText, User, Printer, Trash2, Lock, ShieldAlert } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Order } from '@/lib/types'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/hooks/use-toast'
import { doc } from 'firebase/firestore'

export default function HistoryPage() {
  const { orders, deleteOrder } = useOrders()
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()

  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)

  const currentUserRef = useMemoFirebase(() => user ? doc(db, 'userProfiles', user.uid) : null, [db, user])
  const { data: profile, isLoading: isProfileLoading } = useDoc(currentUserRef)
  
  const canViewHistory = profile?.role === 'Admin' || profile?.role === 'Manager'
  const isAdmin = profile?.role === 'Admin'

  const filteredOrders = useMemo(() => {
    return orders.filter(o => 
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.cashierName.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()))
    )
  }, [orders, search])

  const handlePrint = () => {
    window.print()
  }

  const confirmDelete = () => {
    if (orderToDelete) {
      if (!isAdmin) {
        toast({ title: "ถูกปฏิเสธ", description: "เฉพาะ Admin เท่านั้นที่ลบประวัติได้", variant: "destructive" })
        return
      }
      deleteOrder(orderToDelete)
      toast({ title: "Order Deleted", description: `Order ${orderToDelete} has been removed.` })
      setOrderToDelete(null)
    }
  }

  if (isProfileLoading) {
    return (
      <div className="h-full flex items-center justify-center p-20">
        <ShieldAlert className="w-8 h-8 animate-pulse text-muted-foreground" />
      </div>
    )
  }

  if (!canViewHistory) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="bg-destructive/10 p-6 rounded-full">
          <Lock className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground">คุณไม่มีสิทธิ์เข้าถึงหน้านี้ เฉพาะผู้จัดการเท่านั้น</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">{t.history}</h1>
        <p className="text-muted-foreground">รายการสั่งซื้อย้อนหลังทั้งหมด</p>
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
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-muted-foreground" />
                      {order.cashierName}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">{order.total.toLocaleString()} ฿</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-700 border-none">{t.completed}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="gap-2" onClick={() => { setSelectedOrder(order); setShowReceipt(true); }}>
                        <FileText className="w-4 h-4" />
                        {t.receipt}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedOrder(order); setShowReceipt(false); }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {isAdmin && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => setOrderToDelete(order.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!orderToDelete} onOpenChange={(o) => !o && setOrderToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบประวัติ?</AlertDialogTitle>
            <AlertDialogDescription>การกระทำนี้ไม่สามารถย้อนกลับได้</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">ลบรายการ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!selectedOrder} onOpenChange={(o) => !o && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{showReceipt ? t.receipt : "Order Details"}</span>
              {showReceipt && <Button variant="outline" size="icon" onClick={handlePrint} className="h-8 w-8"><Printer className="w-4 h-4" /></Button>}
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
                    <span>{(item.price * item.quantity).toLocaleString()} ฿</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between font-bold text-base">
                  <span>{t.total}</span>
                  <span>{selectedOrder.total.toLocaleString()} ฿</span>
                </div>
              </div>
              <Separator />
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t.cashier}:</span>
                  <span>{selectedOrder.cashierName}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
