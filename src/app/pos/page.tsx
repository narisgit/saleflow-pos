
"use client"

import { useState, useMemo } from 'react'
import { useInventory, useOrders } from '@/lib/store'
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
  Barcode
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function POSPage() {
  const { products, updateProduct } = useInventory()
  const { addOrder } = useOrders()
  
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState('All')

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
      toast({ title: "Out of Stock", description: "This item is currently unavailable.", variant: "destructive" })
      return
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast({ title: "Limit Reached", description: "Not enough stock available.", variant: "destructive" })
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
          toast({ title: "Limit Reached", description: "Not enough stock available.", variant: "destructive" })
          return item
        }
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const finalizeTransaction = () => {
    if (cart.length === 0) return

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString(),
      items: cart,
      subtotal,
      total
    }

    // Deduct stock
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id)
      if (product) {
        updateProduct({ ...product, stock: product.stock - item.quantity })
      }
    })

    addOrder(newOrder)
    setCart([])
    toast({
      title: "Order Completed!",
      description: `Transaction ${newOrder.id} has been saved successfully.`,
    })
  }

  const scanBarcodeMock = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)]
    if (randomProduct) {
      addToCart(randomProduct)
      toast({ title: "Barcode Scanned", description: `Added ${randomProduct.name} to cart.` })
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6">
      {/* Product Selection Side */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products or scan barcode..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={scanBarcodeMock} className="gap-2">
            <Scan className="w-4 h-4" />
            Scan
          </Button>
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
              {cat}
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
                  {product.stock <= 5 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      LOW STOCK
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                    <p className="text-[10px] text-muted-foreground">Qty: {product.stock}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Cart Side */}
      <Card className="w-full md:w-[400px] flex flex-col border-none shadow-lg overflow-hidden h-full">
        <div className="p-4 border-b flex items-center justify-between bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-bold">Transaction Cart</h2>
          </div>
          <span className="bg-accent text-accent-foreground px-2 py-0.5 rounded-full text-xs font-bold">
            {cart.reduce((a, b) => a + b.quantity, 0)} items
          </span>
        </div>

        <ScrollArea className="flex-1 p-4">
          {cart.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-muted-foreground space-y-2 opacity-60">
              <ShoppingCart className="w-12 h-12" />
              <p>Your cart is empty</p>
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
                    <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} / unit</p>
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
                    <p className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
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
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            className="w-full py-6 text-lg font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
            disabled={cart.length === 0}
            onClick={finalizeTransaction}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Finalize Order
          </Button>
        </div>
      </Card>
    </div>
  )
}
