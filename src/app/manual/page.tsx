
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/store"
import { 
  BookOpen, 
  ShoppingCart, 
  Package, 
  History, 
  Users,
  Info,
  CheckCircle2,
  Smartphone,
  PlusSquare
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ManualPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">คู่มือการใช้งาน SaleFlow POS</h1>
          <p className="text-muted-foreground">คำแนะนำสำหรับพนักงานร้านในการเริ่มใช้งานระบบ</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm bg-accent/5">
          <CardHeader className="flex flex-row items-center gap-2">
            <Smartphone className="w-5 h-5 text-accent" />
            <CardTitle className="text-lg">การใช้งานบนมือถือ</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>เพื่อให้ใช้งานได้สะดวกเหมือนแอปจริง แนะนำให้เพิ่มไว้ที่หน้าจอโฮม:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><b>iPhone:</b> เปิด Safari {'>'} กดปุ่ม Share {'>'} เลือก "Add to Home Screen"</li>
              <li><b>Android:</b> เปิด Chrome {'>'} กดจุด 3 จุด {'>'} เลือก "Install app"</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">1. จัดการพนักงาน</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>เพิ่มรายชื่อพนักงานที่เมนู <b>"จัดการพนักงาน"</b> เพื่อใช้ระบุชื่อผู้ขายในใบเสร็จและตรวจสอบประวัติการขายย้อนหลังได้ถูกต้อง</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">2. จัดการสต็อกสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>เพิ่มสินค้าที่เมนู <b>"คลังสินค้า"</b> สามารถใช้กล้องมือถือสแกนบาร์โค้ดจากซองสินค้าได้ทันที ระบบจะช่วยเตือนเมื่อสินค้าใกล้หมด</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">3. การขายสินค้า (POS)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>ที่หน้า <b>"จุดขาย"</b> ให้เลือกสินค้าหรือสแกนบาร์โค้ด ตรวจสอบยอดเงิน และกดชำระเงิน ระบบจะตัดสต็อกและบันทึกยอดขายให้อัตโนมัติ</p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-700 font-bold">ข้อมูลปลอดภัยบนระบบ Cloud</AlertTitle>
        <AlertDescription className="text-green-800">
          ข้อมูลยอดขายและสต็อกทั้งหมดถูกเก็บไว้บน Firebase ของ Google คุณสามารถเข้าดูรายงานได้จากมือถือทุกเครื่องตลอด 24 ชั่วโมง
        </AlertDescription>
      </Alert>
    </div>
  )
}
