
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
  PlusSquare,
  UserPlus,
  ShieldCheck,
  Camera,
  Settings
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
        <Card className="border-none shadow-sm bg-orange-50/50 border-orange-200 border">
          <CardHeader className="flex flex-row items-center gap-2">
            <Camera className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-lg">วิธีเปิดกล้องเพื่อสแกน (สำคัญ!)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <div className="space-y-2">
              <p className="font-bold text-orange-700">สำหรับ iPhone (Safari):</p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                <li>ไปที่ <b>Settings (การตั้งค่า)</b> ของมือถือ</li>
                <li>เลือกเมนู <b>Safari</b></li>
                <li>เลื่อนลงล่างสุด เลือก <b>Camera (กล้อง)</b></li>
                <li>เลือกเป็น <b>Allow (อนุญาต)</b></li>
              </ol>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-orange-700">สำหรับ Android (Chrome):</p>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                <li>กด <b>จุด 3 จุด</b> ที่มุมขวาบนของเบราว์เซอร์</li>
                <li>เลือก <b>Settings (การตั้งค่า)</b> > <b>Site settings</b></li>
                <li>เลือก <b>Camera</b> และอนุญาตให้ใช้งาน</li>
              </ol>
            </div>
            <p className="text-xs text-orange-600 italic">* หากยังไม่ได้ ให้ลอง "ล้างคุกกี้" หรือเข้า "โหมดไม่ระบุตัวตน"</p>
          </CardContent>
        </Card>

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

        <Card className="border-none shadow-sm bg-blue-50/50">
          <CardHeader className="flex flex-row items-center gap-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">การเพิ่มพนักงานใหม่</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>พนักงานแต่ละคนต้องตั้งรหัสผ่านด้วยตนเองเพื่อความปลอดภัย:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>ให้พนักงานสมัครสมาชิกเองที่หน้า <b>Register</b></li>
              <li>พนักงานตั้งอีเมลและรหัสผ่านที่ตนเองจำได้</li>
              <li>แจ้ง Admin เพื่อขอปรับตำแหน่งสิทธิ์การใช้งาน</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">การขายสินค้า (POS)</CardTitle>
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
