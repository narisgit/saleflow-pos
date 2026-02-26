
"use client"

import { useState } from 'react'
import { useInventory } from '@/lib/store'
import { Product } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreVertical,
  Package,
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
  const [search, setSearch] = useState('')
  const [isAdding, setIsAdding] = useState(false)
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
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.barcode.includes(search)
  )

  const handleAdd = () => {
    if (!formData.name || !formData.price || !formData.barcode) {
      toast({ title: "Validation Error", description: "Please fill in all required fields.", variant: "destructive" })
      return
    }

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
    setIsAdding(false)
    setFormData({ name: '', price: 0, stock: 0, barcode: '', category: '', description: '' })
    toast({ title: "Product Added", description: `${newProduct.name} has been added to inventory.` })
  }

  const generateAI = async () => {
    if (!formData.name) {
      toast({ title: "Name Required", description: "Enter a product name first.", variant: "destructive" })
      return
    }
    setIsGenerating(true)
    try {
      const result = await generateProductDescription({
        productName: formData.name,
        attributes: [formData.category || 'General', `$${formData.price}`]
      })
      setFormData(prev => ({ ...prev, description: result.description }))
      toast({ title: "AI Generated", description: "Product description refined by AI." })
    } catch (e) {
      toast({ title: "Generation Failed", description: "Could not generate description.", variant: "destructive" })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateBarcode = () => {
    const code = Math.floor(Math.random() * 9000000000000 + 1000000000000).toString()
    setFormData(prev => ({ ...prev, barcode: code }))
    toast({ title: "Barcode Generated", description: "A unique barcode was assigned." })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your product catalog, stock levels, and details.</p>
        </div>
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  value={formData.name} 
                  onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={formData.price} 
                  onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">Initial Stock</Label>
                <Input 
                  id="stock" 
                  type="number" 
                  value={formData.stock} 
                  onChange={e => setFormData(f => ({ ...f, stock: Number(e.target.value) }))}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="barcode" className="text-right">Barcode</Label>
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input 
                  id="category" 
                  value={formData.category} 
                  onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                  className="col-span-3" 
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="description">Description</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7 text-primary"
                    onClick={generateAI}
                    disabled={isGenerating}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {isGenerating ? 'Generating...' : 'AI Enhance'}
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
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAdd}>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search products, categories, or barcodes..." 
          className="pl-10 h-12 border-none shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Barcode</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                  No products found matching your search.
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
                    <div className="text-xs text-muted-foreground truncate max-w-[200px]">{product.description}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{product.barcode}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${product.stock < 10 ? 'text-red-500' : ''}`}>{product.stock}</span>
                      {product.stock < 10 && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteProduct(product.id)}
                      >
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
