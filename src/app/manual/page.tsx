
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
  AlertCircle,
  ExternalLink
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

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
          <p className="text-muted-foreground">คำแนะนำสำหรับการเริ่มใช้งานระบบหลังจาก Deploy สำเร็จ</p>
        </div>
      </div>

      <Alert className="bg-green-50 border-green-200">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-700 font-bold">ระบบของคุณออนไลน์แล้ว!</AlertTitle>
        <AlertDescription className="text-green-800">
          ตอนนี้คุณสามารถเข้าใช้งานผ่านมือถือหรือแท็บเล็ตได้จากทุกที่ทั่วโลกผ่าน URL ของคุณ
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Staff */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">1. ตั้งค่าพนักงาน</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>ไปที่เมนู <b>"จัดการพนักงาน"</b> เพื่อสร้างรายชื่อผู้ที่สามารถขายสินค้าได้ ข้อมูลนี้จะถูกนำไปใช้ในใบเสร็จและประวัติการขาย</p>
          </CardContent>
        </Card>

        {/* Step 2: Inventory */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">2. เพิ่มสินค้าในคลัง</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>เพิ่มรายการสินค้าของคุณในเมนู <b>"คลังสินค้า"</b> คุณสามารถใช้กล้องมือถือสแกนบาร์โค้ดจากซองสินค้าได้โดยตรงเพื่อความรวดเร็ว</p>
          </CardContent>
        </Card>

        {/* Step 3: POS */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">3. เริ่มการขาย</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>ใช้หน้า <b>"จุดขาย (POS)"</b> เพื่อเลือกสินค้าและชำระเงิน ระบบจะตัดสต็อกสินค้าในคลังให้อัตโนมัติทันที</p>
          </CardContent>
        </Card>

        {/* Step 4: Reports */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">4. ตรวจสอบรายงาน</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>ดูยอดรวมรายวัน/รายเดือนที่หน้า <b>"แผงควบคุม"</b> และตรวจสอบรายละเอียดใบเสร็จย้อนหลังได้ที่หน้า <b>"ประวัติการสั่งซื้อ"</b></p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/50 p-6 rounded-xl space-y-4 border">
        <h3 className="font-bold flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          การอัปเดตระบบในอนาคต
        </h3>
        <p className="text-sm text-muted-foreground">
          เมื่อคุณทำการแก้ไขโค้ดใน Firebase Studio และกด <b>Push</b> ขึ้น GitHub ระบบจะทำการอัปเดตหน้าเว็บจริงให้คุณโดยอัตโนมัติผ่าน GitHub Actions
        </p>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="gap-2">
              <ExternalLink className="w-4 h-4" /> ดูสถานะที่ GitHub
            </a>
          </Button>
        </div>
      </div>

      <Alert variant="destructive" className="bg-red-50">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>ข้อควรระวัง</AlertTitle>
        <AlertDescription>
          ระบบนี้รันบน Firebase Hosting แผน Spark (ฟรี) ซึ่งมีการจำกัดปริมาณข้อมูลต่อเดือน หากคุณมีการใช้งานที่สูงมาก กรุณาตรวจสอบสถานะโควต้าใน Firebase Console
        </AlertDescription>
      </Alert>
    </div>
  )
}
