
"use client"

import { useState, useEffect, useRef } from 'react'
import { useInventory, useLanguage } from '@/lib/store'
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase'
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
  Loader2,
  Lock,
  CheckCircle2,
  Upload
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
import { PlaceHolderImages } from '@/lib/placeholder-images'
import Image from 'next/image'
import { doc } from 'firebase/firestore'

export default function InventoryPage() {
  const { products, addProduct, updateProduct, deleteProduct, isLoading: isInventoryLoading } = useInventory()
  const { t } = useLanguage()
  const { user } = useUser()
  const db = useFirestore()
  
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  // States for live camera capture (Product Image)
  const [isCaptureMode, setIsCaptureMode] = useState(false)
  const captureVideoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Scanner states (for barcode)
  const [isScannerOpen, setIsScannerOpen] = useState(false)
  const [hasScannerPermission, setHasScannerPermission] = useState<boolean | null>(null)
  const scannerVideoRef = useRef<HTMLVideoElement>(null)

  const currentUserRef = useMemoFirebase(() => user ? doc(db, 'userProfiles', user.uid) : null, [db, user])
  const { data: currentUserProfile } = useDoc(currentUserRef)
  const canManageInventory = currentUserProfile?.role === 'Admin' || currentUserProfile?.role === 'Manager'

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stock: 0,
    barcode: '',
    category: '',
    description: '',
    imageUrl: ''
  })

  // Barcode Scanner Effect
  useEffect(() => {
    let stream: MediaStream | null = null;
    async function startScanner() {
      if (isScannerOpen && hasScannerPermission) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          if (scannerVideoRef.current) {
            scannerVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Scanner access error:', error);
          setHasScannerPermission(false);
        }
      }
    }
    startScanner();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScannerOpen, hasScannerPermission]);

  // Auto-request permission when scanner opens
  useEffect(() => {
    if (isScannerOpen && hasScannerPermission === null) {
      requestScannerCamera();
    }
  }, [isScannerOpen]);

  // Product Photo Capture Effect
  useEffect(() => {
    let stream: MediaStream | null = null;
    async function startCapture() {
      if (isCaptureMode) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          if (captureVideoRef.current) {
            captureVideoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Camera access error:', error);
          setIsCaptureMode(false);
        }
      }
    }
    startCapture();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCaptureMode]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
    p.barcode.includes(search)
  )

  const resetForm = () => {
    setFormData({ name: '', price: 0, stock: 0, barcode: '', category: '', description: '', imageUrl: '' })
    setEditingProduct(null)
    setIsCaptureMode(false)
  }

  const handleOpenDialog = (product?: Product) => {
    if (!canManageInventory) {
      toast({ title: "ถูกปฏิเสธ", description: "เฉพาะ Admin/Manager เท่านั้นที่จัดการสต็อกได้", variant: "destructive" })
      return
    }
    if (product) {
      setEditingProduct(product)
      setFormData(product)
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(f => ({ ...f, imageUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (!formData.name || formData.price === undefined || !formData.barcode) {
      toast({ title: "ข้อผิดพลาด", description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน", variant: "destructive" })
      return
    }

    const finalImageUrl = formData.imageUrl || `https://picsum.photos/seed/${formData.name || Date.now()}/400/300`

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category || 'ทั่วไป',
        imageUrl: finalImageUrl
      } as Product)
      toast({ title: t.completed, description: `แก้ไขข้อมูล ${formData.name} เรียบร้อย` })
    } else {
      const newProduct: Product = {
        id: '', 
        name: formData.name!,
        price: Number(formData.price),
        stock: Number(formData.stock),
        barcode: formData.barcode!,
        category: formData.category || 'ทั่วไป',
        description: formData.description || '',
        imageUrl: finalImageUrl,
        createdByUserId: user?.uid || 'unknown',
        createdByUserName: user?.displayName || user?.email?.split('@')[0] || 'Unknown Staff',
        createdAt: new Date().toISOString()
      }
      addProduct(newProduct)
      toast({ title: t.completed, description: `เพิ่มสินค้า ${newProduct.name} เรียบร้อย` })
    }
    setIsDialogOpen(false)
    resetForm()
  }

  const takePhoto = () => {
    if (captureVideoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = captureVideoRef.current.videoWidth
      canvas.height = captureVideoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(captureVideoRef.current, 0, 0)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setFormData(f => ({ ...f, imageUrl: dataUrl }))
        setIsCaptureMode(false)
        toast({ title: "บันทึกรูปสำเร็จ" })
      }
    }
  }

  const requestScannerCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setHasScannerPermission(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasScannerPermission(false);
      toast({
        variant: 'destructive',
        title: 'ไม่ได้รับอนุญาต',
        description: 'กรุณาอนุญาตการเข้าถึงกล้องในการตั้งค่าเบราว์เซอร์',
      });
    }
  }

  const simulateScan = () => {
    const scannedCode = Math.floor(Math.random() * 9000000000000 + 1000000000000).toString();
    setFormData(prev => ({ ...prev, barcode: scannedCode }));
    setIsScannerOpen(false);
    toast({ title: "สแกนสำเร็จ", description: `รหัสที่พบ: ${scannedCode}` });
  }

  if (isInventoryLoading) {
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
        {canManageInventory && (
          <Dialog open={isDialogOpen} onOpenChange={(open) => { if(!open) resetForm(); setIsDialogOpen(open); }}>
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
                <div className="space-y-4">
                  <Label className="text-base font-bold">รูปบรรจุภัณฑ์สินค้า</Label>
                  <div className="relative aspect-square rounded-xl bg-muted border-2 border-dashed border-muted-foreground/20 overflow-hidden flex items-center justify-center group shadow-inner">
                    {isCaptureMode ? (
                      <div className="absolute inset-0 bg-black flex flex-col items-center">
                        <video ref={captureVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        <div className="absolute bottom-4 flex gap-2">
                          <Button size="sm" onClick={takePhoto} className="rounded-full h-12 w-12 p-0 bg-white hover:bg-white/90 text-primary">
                            <CheckCircle2 className="w-8 h-8" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => setIsCaptureMode(false)} className="rounded-full h-12 w-12 p-0">
                            <X className="w-6 h-6" />
                          </Button>
                        </div>
                      </div>
                    ) : formData.imageUrl ? (
                      <>
                        <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                            <Upload className="w-4 h-4" />
                            เลือกไฟล์
                          </Button>
                          <Button variant="secondary" size="sm" onClick={() => setIsCaptureMode(true)} className="gap-2">
                            <Camera className="w-4 h-4" />
                            ถ่ายใหม่
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
                        <p className="text-xs text-muted-foreground">ถ่ายรูป หรือเลือกจากคลังภาพ</p>
                        <div className="flex flex-col gap-2">
                          <Button variant="default" size="sm" onClick={() => setIsCaptureMode(true)} className="gap-2">
                            <Camera className="w-4 h-4" />
                            ถ่ายรูปด้วยกล้อง
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
                            <Upload className="w-4 h-4" />
                            เลือกจากเครื่อง
                          </Button>
                        </div>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.productName}</Label>
                      <Input id="name" placeholder="เช่น อาหารแมวเกรดพรีเมียม" value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">{t.price} (฿)</Label>
                        <Input id="price" type="number" value={formData.price} onChange={e => setFormData(f => ({ ...f, price: Number(e.target.value) }))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">{t.stock}</Label>
                        <Input id="stock" type="number" value={formData.stock} onChange={e => setFormData(f => ({ ...f, stock: Number(e.target.value) }))} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">{t.category}</Label>
                      <Input id="category" placeholder="เช่น อาหารแมว, ขนมสุนัข" value={formData.category} onChange={e => setFormData(f => ({ ...f, category: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="barcode">{t.barcode}</Label>
                      <div className="flex gap-2">
                        <Input id="barcode" value={formData.barcode} onChange={e => setFormData(f => ({ ...f, barcode: e.target.value }))} className="font-mono" />
                        <Button variant="outline" size="icon" onClick={() => setIsScannerOpen(true)} title="สแกนจากซองสินค้า"><Camera className="w-4 h-4" /></Button>
                        <Button variant="outline" size="icon" onClick={() => setFormData(prev => ({ ...prev, barcode: Math.floor(Math.random() * 9000000000000 + 1000000000000).toString() }))} title="สุ่มบาร์โค้ด"><Barcode className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-4 gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>{t.cancel}</Button>
                <Button onClick={handleSave} className="min-w-[120px]">{editingProduct ? "บันทึกการแก้ไข" : "เพิ่มสินค้าใหม่"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="ค้นหาตามชื่อสินค้า, หมวดหมู่ หรือบาร์โค้ด..." className="pl-10 h-12 shadow-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">รูปสินค้า</TableHead>
              <TableHead>{t.productName}</TableHead>
              <TableHead>{t.barcode}</TableHead>
              <TableHead>{t.category}</TableHead>
              <TableHead>{t.price} (฿)</TableHead>
              <TableHead>{t.stock}</TableHead>
              <TableHead className="text-right">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">ไม่พบสินค้าในระบบ</TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="w-14 h-14 rounded-lg bg-muted relative overflow-hidden border shadow-sm">
                      {product.imageUrl && <Image src={product.imageUrl} alt="" fill className="object-cover" />}
                    </div>
                  </TableCell>
                  <TableCell><div className="font-medium text-sm">{product.name}</div></TableCell>
                  <TableCell className="font-mono text-xs">{product.barcode}</TableCell>
                  <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                  <TableCell className="font-bold text-primary">{product.price.toLocaleString()} ฿</TableCell>
                  <TableCell><span className={`font-medium ${product.stock < 10 ? 'text-destructive' : ''}`}>{product.stock}</span></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {canManageInventory ? (
                        <>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => handleOpenDialog(product)}><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => deleteProduct(product.id)}><Trash2 className="w-4 h-4" /></Button>
                        </>
                      ) : <Lock className="w-4 h-4 text-muted-foreground mr-3" />}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isScannerOpen} onOpenChange={setIsScannerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader><DialogTitle>สแกนบาร์โค้ดสินค้า</DialogTitle></DialogHeader>
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden flex flex-col items-center justify-center">
            {hasScannerPermission ? (
              <>
                <video ref={scannerVideoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted playsInline />
                <div className="absolute inset-0 border-2 border-dashed border-primary/50 m-12 rounded-xl pointer-events-none" />
              </>
            ) : (
              <div className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold">ต้องการการเข้าถึงกล้อง</h3>
                <p className="text-white/60 text-sm">เพื่อใช้ฟีเจอร์สแกนบาร์โค้ด กรุณากดปุ่มอนุญาตด้านล่าง</p>
                <Button onClick={requestScannerCamera} className="w-full bg-primary hover:bg-primary/90">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  อนุญาตใช้งานกล้อง
                </Button>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="secondary" onClick={() => setIsScannerOpen(false)}>{t.cancel}</Button>
            <Button onClick={simulateScan} variant="outline">จำลองการสแกน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
