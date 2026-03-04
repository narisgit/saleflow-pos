
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
  AlertCircle
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
          <p className="text-muted-foreground">คำแนะนำเบื้องต้นสำหรับการใช้งานระบบจุดขาย</p>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-700 font-bold">ยินดีต้อนรับสู่ SaleFlow!</AlertTitle>
        <AlertDescription className="text-blue-800">
          ระบบนี้ออกแบบมาเพื่อช่วยให้คุณจัดการการขายและคลังสินค้าได้อย่างง่ายดายผ่านมือถือหรือคอมพิวเตอร์
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* POS Usage */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">การขายสินค้า (POS)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>1. ค้นหาสินค้าจากช่องค้นหา หรือใช้ปุ่มสแกนบาร์โค้ด</p>
            <p>2. คลิกที่รูปสินค้าเพื่อเพิ่มลงในตะกร้า</p>
            <p>3. ปรับจำนวนสินค้าได้ในแถบตะกร้าด้านขวา</p>
            <p>4. ตรวจสอบยอดรวมและกดปุ่ม "ยืนยันการสั่งซื้อ"</p>
          </CardContent>
        </Card>

        {/* Inventory Usage */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">การจัดการคลังสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>1. เพิ่มสินค้าใหม่ด้วยปุ่ม "เพิ่มสินค้า"</p>
            <p>2. สามารถสแกนบาร์โค้ดจากซองสินค้าจริงเพื่อบันทึกข้อมูลได้</p>
            <p>3. ระบบจะแจ้งเตือนอัตโนมัติเมื่อสินค้าในสต็อกต่ำกว่า 10 ชิ้น</p>
            <p>4. แก้ไขข้อมูลสินค้าได้โดยการคลิกที่ไอคอนดินสอ</p>
          </CardContent>
        </Card>

        {/* History Usage */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">ประวัติการขาย</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>1. ดูรายการย้อนหลังทั้งหมดได้ในเมนู "ประวัติการสั่งซื้อ"</p>
            <p>2. สามารถพิมพ์ใบเสร็จย้อนหลังได้</p>
            <p>3. ตรวจสอบยอดขายรวมรายเดือนได้ที่หน้า "แผงควบคุม"</p>
          </CardContent>
        </Card>

        {/* Staff Usage */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">การจัดการพนักงาน</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>1. เฉพาะผู้ที่มีสิทธิ์ Admin หรือ Manager เท่านั้นที่ควรจัดการส่วนนี้</p>
            <p>2. สามารถเพิ่มหรือลบชื่อพนักงานออกจากระบบได้</p>
            <p>3. ข้อมูลพนักงานจะถูกนำไปใช้ระบุว่าใครเป็นคนขายสินค้านั้นๆ</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 p-6 rounded-xl space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          เคล็ดลับการใช้งาน
        </h3>
        <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
          <li>บนมือถือ: คุณสามารถแตะที่ปุ่มสแกนเพื่อเปิดกล้องและขายของได้รวดเร็วเหมือนร้านสะดวกซื้อ</li>
          <li>การพิมพ์ใบเสร็จ: ระบบรองรับการพิมพ์ออกเครื่องพิมพ์ความร้อน (Thermal Printer) ได้โดยตรงผ่านบราวเซอร์</li>
          <li>ความปลอดภัย: อย่าลืมออกจากระบบเมื่อเปลี่ยนกะการทำงาน</li>
        </ul>
      </div>

      <Alert variant="destructive" className="bg-red-50">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>ข้อควรระวัง</AlertTitle>
        <AlertDescription>
          การลบรายการสินค้าหรือประวัติการขายจะทำให้ข้อมูลหายไปถาวร ไม่สามารถกู้คืนได้ โปรดใช้ความระมัดระวัง
        </AlertDescription>
      </Alert>
    </div>
  )
}
