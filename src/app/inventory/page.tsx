
"use client"

import { useState } from 'react'
import { useInventory, useLanguage } from '@/lib/store'
import { Product } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Sparkles,
  Barcode
} from 'lucide-react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { generateProductDescription } from '@/ai/flows/generate-product-description-flow'
import { toast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'

export default function InventoryPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory()
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stock: 0,
    barcode: '',
    category: '',
    description: ''
  })

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
    p.barcode.includes(search)
  )

  const resetForm = () => {
    setFormData({ name: '', price: 0, stock: 0, barcode: '', category: '', description: '' })
    setEditingProduct(null)
  }

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData(product)
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || formData.price === undefined || !formData.barcode) {
      toast({ title: "Error", description: "Fill required fields.", variant: "destructive" })
      return
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      } as Product)
      toast({ title: t.completed, description: `Updated ${formData.name}` })
    } else {
      const newProduct: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        price: Number(formData.price),
        stock: Number(formData.stock),
        barcode: formData.barcode!,
        category: formData.category || 'Uncategorized',
        description: formData.description || '',
        imageUrl: `https://picsum.photos/seed/${formData.name}/400/300`
      }
      addProduct(newProduct)
      toast({ title: t.completed, description: `Added ${newProduct.name}` })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const generateAI = async () => {
    if (!formData.name) return
    setIsGenerating(true)
    try {
      const result = await generateProductDescription({
        productName: formData.name,
        attributes: [formData.category || 'General', `$${formData.price}`]
      })
      setFormData(prev => ({ ...prev, description: result.description }))
    } catch (e) {
      toast({ title: "Failed", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateBarcode = () => {
    const code = Math.floor(Math.random() * 9000000000000 + 1000000000000).toString()
    setFormData(prev => ({ ...prev, barcode: code }))
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.inventory}</h1>
          <p className="text-muted-foreground">{t.inventory} Management</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              {t.addProduct}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingProduct ? t.actions : t.addProduct}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">{t.name}</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">{t.price}</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">{t.stock}</Label>
                <Input 
                  id="stock" 
                  type="number" 
                  value={formData.stock} 
                  onChange={e => setFormData(f => ({ ...f, stock: Number(e.target.value) }))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="barcode" className="text-right">{t.barcode}</Label>
                <div className="col-span-3 flex gap-2">
                  <Input 
                    id="barcode" 
                    value={formData.barcode} 
                    onChange={e => setFormData(f => ({ ...f, barcode: e.target.value }))}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon" onClick={generateBarcode}>
                    <Barcode className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">{t.description}</Label>
                  <Button variant="ghost" size="sm" onClick={generateAI} disabled={isGenerating}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isGenerating ? t.generating : t.aiEnhance}
                  </Button>
                </div>
                <Textarea 
                  id="description" 
                  className="h-24"
                  value={formData.description}
                  onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.cancel}</Button>
              <Button onClick={handleSave}>{editingProduct ? t.saveProduct : t.saveProduct}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder={t.searchProducts} 
          className="pl-10 h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.barcode}</TableHead>
              <TableHead>{t.category}</TableHead>
              <TableHead>{t.price}</TableHead>
              <TableHead>{t.stock}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                  {t.noProducts}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 rounded bg-muted relative overflow-hidden">
                      {product.imageUrl && <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{product.barcode}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteProduct(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
