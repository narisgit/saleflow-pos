"use client"

import { useState, useEffect, useRef } from 'react'
import { useInventory, useLanguage } from '@/lib/store'
import { Product } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Barcode,
  Camera,
  Image as ImageIcon,
  X,
  RefreshCw,
  Loader2
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
import { toast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import Image from 'next/image'

export default function InventoryPage() {
  const { products, addProduct, updateProduct, deleteProduct, isLoading } = useInventory()
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // Scanner State
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stock: 0,
    barcode: '',
    category: '',
    description: '',
    imageUrl: ''
  })

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
    p.barcode.includes(search)
  )

  const resetForm = () => {
    setFormData({ name: '', price: 0, stock: 0, barcode: '', category: '', description: '', imageUrl: '' })
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
      toast({ title: "ข้อผิดพลาด", description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน (ชื่อ, ราคา, บาร์โค้ด)", variant: "destructive" })
      return
    }

    const finalImageUrl = formData.imageUrl || `https://picsum.photos/seed/${formData.name || Date.now()}/400/300`

    const productData = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category || 'ทั่วไป',
      imageUrl: finalImageUrl
    }

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productData
      } as Product)
      toast({ title: t.completed, description: `แก้ไขข้อมูล ${formData.name} เรียบร้อย` })
    } else {
      const newProduct: Product = {
        id: '', // Will be assigned by Firestore
        name: formData.name!,
        price: Number(formData.price),
        stock: Number(formData.stock),
        barcode: formData.barcode!,
        category: formData.category || 'ทั่วไป',
        description: formData.description || '',
        imageUrl: finalImageUrl
      }
      addProduct(newProduct)
      toast({ title: t.completed, description: `เพิ่มสินค้า ${newProduct.name} เรียบร้อย` })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const generateBarcode = () => {
    const code = Math.floor(Math.random() * 9000000000000 + 1000000000000).toString()
    setFormData(prev => ({ ...prev, barcode: code }))
  }

  const useDefaultImage = () => {
    const randomImg = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)]
    setFormData(prev => ({ ...prev, imageUrl: randomImg.imageUrl }))
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
    const scannedCode = Math.floor(Math.random() * 9000000000000 + 1000000000000).toString();
    setFormData(prev => ({ ...prev, barcode: scannedCode }));
    setIsScannerOpen(false);
    toast({ title: "สแกนสำเร็จ", description: `รหัสที่พบ: ${scannedCode}` });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">{t.inventory}</h1>
          <p className="text-muted-foreground">จัดการคลังสินค้าอาหารสัตว์และอุปกรณ์</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              {t.addProduct}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "แก้ไขสินค้า" : t.addProduct}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              {/* Left Side: Image Preview & URL */}
              <div className="space-y-4">
                <Label className="text-base font-bold">รูปบรรจุภัณฑ์สินค้า</Label>
                
                <div className="relative aspect-square rounded-xl bg-muted border-2 border-dashed border-muted-foreground/20 overflow-hidden flex items-center justify-center group shadow-inner">
                  {formData.imageUrl ? (
                    <>
                      <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="secondary" size="sm" onClick={useDefaultImage} className="gap-2">
                          <RefreshCw className="w-4 h-4" />
                          สุ่มรูปใหม่
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => setFormData(f => ({ ...f, imageUrl: '' }))}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6 space-y-3">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-xs text-muted-foreground">เลือกรูปตัวอย่างบรรจุภัณฑ์</p>
                      <Button variant="outline" size="sm" onClick={useDefaultImage} className="mt-2">
                        <Plus className="w-4 h-4 mr-2" />
                        ใช้รูปบรรจุภัณฑ์
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-xs text-muted-foreground">หรือใส่ URL รูปภาพสินค้า</Label>
                  <Input 
                    id="imageUrl" 
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={e => setFormData(f => ({ ...f, imageUrl: e.target.value }))}
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Right Side: Form Data */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.name}</Label>
                    <Input 
                      id="name" 
                      placeholder="เช่น อาหารแมวเกรดพรีเมียม"
                      value={formData.name} 
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">{t.price}</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        value={formData.price} 
                        onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">{t.stock}</Label>
                      <Input 
                        id="stock" 
                        type="number" 
                        value={formData.stock} 
                        onChange={e => setFormData(f => ({ ...f, stock: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">{t.category}</Label>
                    <Input 
                      id="category" 
                      placeholder="เช่น อาหารแมว, ขนมสุนัข"
                      value={formData.category} 
                      onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="barcode">{t.barcode}</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="barcode" 
                        value={formData.barcode} 
                        onChange={e => setFormData(f => ({ ...f, barcode: e.target.value }))}
                        className="flex-1 font-mono"
                      />
                      <Button variant="outline" size="icon" onClick={() => setIsScannerOpen(true)} title="สแกนจากซองสินค้า">
                        <Camera className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={generateBarcode} title="สุ่มบาร์โค้ด">
                        <Barcode className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t.description}</Label>
                    <Textarea 
                      id="description" 
                      className="h-24 text-sm leading-relaxed"
                      placeholder="ข้อมูลเพิ่มเติมเกี่ยวกับสินค้า..."
                      value={formData.description}
                      onChange={e => setFormData(f => ({ ...f, description: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-4 gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.cancel}</Button>
              <Button onClick={handleSave} className="min-w-[120px]">
                {editingProduct ? "บันทึกการแก้ไข" : "เพิ่มสินค้าใหม่"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="ค้นหาตามชื่อสินค้า, หมวดหมู่ หรือบาร์โค้ด..." 
          className="pl-10 h-12 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Scanner Dialog */}
      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>สแกนบาร์โค้ดจากซองสินค้า</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
            <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-12 rounded-xl pointer-events-none" />
            
            {hasCameraPermission === false && (
              <div className="absolute inset-0 bg-background/90 flex items-center justify-center p-6 text-center">
                <Alert variant="destructive">
                  <AlertTitle>เข้าถึงกล้องไม่ได้</AlertTitle>
                  <AlertDescription>
                    กรุณาอนุญาตให้แอปเข้าถึงกล้องเพื่อสแกนบาร์โค้ด
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            หันกล้องไปที่บาร์โค้ดบนซองสินค้า
          </div>
          <DialogFooter className="gap-2">
            <Button variant="secondary" onClick={() => setIsScannerOpen(false)}>{t.cancel}</Button>
            <Button onClick={simulateScan}>จำลองการสแกน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">รูปสินค้า</TableHead>
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
                  ไม่พบสินค้าในระบบ
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="w-14 h-14 rounded-lg bg-muted relative overflow-hidden border shadow-sm">
                      {product.imageUrl && <Image src={product.imageUrl} alt="" fill className="object-cover" />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-sm">{product.name}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{product.barcode}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="font-bold text-primary">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${product.stock < 10 ? 'text-destructive' : ''}`}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:text-primary" 
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:bg-destructive/10" 
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