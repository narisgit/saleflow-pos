
"use client"

import { useState, useMemo, useEffect, useRef } from 'react'
import { useInventory, useOrders, useLanguage } from '@/lib/store'
import { useUser } from '@/firebase'
import { Product, CartItem, Order } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Scan,
  User as UserIcon,
  Loader2,
  Camera,
  Percent
} from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function POSPage() {
  const { products, updateProduct, isLoading: isInventoryLoading } = useInventory()
  const { addOrder } = useOrders()
  const { t } = useLanguage()
  const { user } = useUser()
  
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [taxRate, setTaxRate] = useState(7) // Default VAT 7%

  // Scanner State
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentUser = useMemo(() => {
    if (!user) return null;
    return {
      id: user.uid,
      name: user.displayName || user.email?.split('@')[0] || 'Staff'
    };
  }, [user]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)))
    return ['All', ...cats]
  }, [products])

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search)
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast({ title: t.outOfStock, description: "สินค้าในสต็อกไม่เพียงพอ", variant: "destructive" })
      return
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast({ title: t.limitReached, description: "ถึงจำนวนจำกัดในสต็อกแล้ว", variant: "destructive" })
          return prev
        }
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta)
        const product = products.find(p => p.id === id)
        if (product && newQty > product.stock) {
          toast({ title: t.limitReached, description: "จำนวนสินค้าเกินสต็อกที่มี", variant: "destructive" })
          return item
        }
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  const finalizeOrder = () => {
    if (cart.length === 0 || !currentUser) return

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      items: cart,
      subtotal,
      total,
      cashierId: currentUser.id,
      cashierName: currentUser.name
    }

    // Update stock and save order
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id)
      if (product) {
        updateProduct({ ...product, stock: product.stock - item.quantity })
      }
    })

    addOrder(newOrder)
    setCart([])
    toast({
      title: t.orderCompleted,
      description: `${t.orderId}: ${newOrder.id} - ${t.cashier}: ${currentUser.name}`,
    })
  }

  // Camera Permission Logic
  useEffect(() => {
    if (isScannerOpen) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'เข้าถึงกล้องไม่ได้',
            description: 'กรุณาอนุญาตให้ใช้งานกล้องในตั้งค่าเบราว์เซอร์',
          });
        }
      };
      getCameraPermission();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    }
  }, [isScannerOpen]);

  const simulateScan = () => {
    if (products.length === 0) {
      toast({ title: "ไม่พบสินค้า", description: "กรุณาเพิ่มสินค้าลงในคลังก่อน", variant: "destructive" });
      return;
    }
    
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    addToCart(randomProduct);
    setIsScannerOpen(false);
    toast({ title: "สแกนสำเร็จ", description: `พบสินค้า: ${randomProduct.name}` });
  }

  if (isInventoryLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
           <div className="flex-1 flex gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder={t.searchProducts} 
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 shrink-0" onClick={() => setIsScannerOpen(true)}>
              <Scan className="w-4 h-4" />
              {t.scan}
            </Button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm font-medium">
            <UserIcon className="w-4 h-4" />
            <span>{currentUser?.name || '---'}</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-4"
            >
              {cat === 'All' ? t.all : cat}
            </Button>
          ))}
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <Card 
                key={product.id} 
                className="overflow-hidden border-none shadow-sm cursor-pointer hover:ring-2 hover:ring-accent transition-all group"
                onClick={() => addToCart(product)}
              >
                <div className="aspect-[4/3] relative bg-muted">
                  {product.imageUrl && (
                    <Image 
                      src={product.imageUrl} 
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-primary font-bold">{product.price.toLocaleString()} ฿</p>
                    <p className="text-[10px] text-muted-foreground">{t.stock}: {product.stock}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Card className="w-full md:w-[400px] flex flex-col border-none shadow-lg overflow-hidden h-full">
        <div className="p-4 border-b flex items-center justify-between bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-bold">{t.cart}</h2>
          </div>
          <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-bold">
            {cart.reduce((a, b) => a + b.quantity, 0)} {t.items}
          </span>
        </div>

        <ScrollArea className="flex-1 p-4">
          {cart.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-muted-foreground space-y-2 opacity-60">
              <ShoppingCart className="w-12 h-12" />
              <p>{t.cart} ({t.items} 0)</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-12 h-12 rounded bg-muted relative overflow-hidden flex-shrink-0">
                    {item.imageUrl && <Image src={item.imageUrl} alt="" fill className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.price.toLocaleString()} ฿</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 rounded-full"
                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-6 w-6 rounded-full"
                        onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between items-end">
                    <p className="font-bold text-sm">{(item.price * item.quantity).toLocaleString()} ฿</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-6 border-t bg-muted/30 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.subtotal}</span>
              <span>{subtotal.toLocaleString()} ฿</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>{t.tax}</span>
                <div className="flex items-center border rounded px-1 bg-background h-7">
                  <Input 
                    type="number" 
                    value={taxRate} 
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-10 h-6 border-none p-0 text-center text-xs focus-visible:ring-0"
                  />
                  <span className="text-[10px]">%</span>
                </div>
              </div>
              <span>{tax.toLocaleString()} ฿</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>{t.total}</span>
              <span className="text-primary">{total.toLocaleString()} ฿</span>
            </div>
          </div>

          <Button 
            className="w-full py-6 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
            disabled={cart.length === 0}
            onClick={finalizeOrder}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            {t.finalizeOrder}
          </Button>
        </div>
      </Card>

      {/* Scanner Dialog */}
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>สแกนบาร์โค้ดสินค้า</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
            <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-12 rounded-xl pointer-events-none" />
            
            {hasCameraPermission === false && (
              <div className="absolute inset-0 bg-background/90 flex items-center justify-center p-6 text-center">
                <Alert variant="destructive">
                  <AlertTitle>เข้าถึงกล้องไม่ได้</AlertTitle>
                  <AlertDescription>
                    กรุณาอนุญาตให้แอปเข้าถึงกล้องเพื่อสแกนบาร์โค้ดสินค้า
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            หันกล้องไปที่บาร์โค้ดบนซองสินค้าสัตว์เลี้ยง
          </div>
          <DialogFooter className="gap-2">
            <Button variant="secondary" onClick={() => setIsScannerOpen(false)}>{t.cancel}</Button>
            <Button onClick={simulateScan}>จำลองการสแกน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
