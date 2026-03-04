
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
  Settings,
  Globe
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
        <Card className="border-none shadow-sm bg-orange-50/50 border-orange-200 border md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-2">
            <Camera className="w-6 h-6 text-orange-600" />
            <CardTitle className="text-xl">วิธีเปิดกล้องเพื่อสแกน (สำหรับ Android และ iPhone)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-orange-700 text-lg">
                <Smartphone className="w-5 h-5" />
                <span>สำหรับ Android (Google Chrome)</span>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-orange-100 space-y-3">
                <p className="font-semibold">วิธีที่ 1: ผ่านแถบที่อยู่เว็บ (เร็วที่สุด)</p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-2">
                  <li>กดไอคอน <b>"แม่กุญแจ"</b> หรือ <b>"การตั้งค่า"</b> หน้าชื่อเว็บ `.web.app`</li>
                  <li>เลือกเมนู <b>"Permissions" (การอนุญาต)</b> หรือ <b>"Site settings"</b></li>
                  <li>หาคำว่า <b>"Camera" (กล้อง)</b> แล้วกดเปิดให้เป็น <b>"Allow" (อนุญาต)</b></li>
                </ol>
                <p className="font-semibold mt-4">วิธีที่ 2: ผ่านการตั้งค่า Chrome</p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-2">
                  <li>กด <b>จุด 3 จุด</b> มุมขวาบนของ Chrome</li>
                  <li>เลือก <b>Settings (การตั้งค่า)</b> > <b>Site settings</b></li>
                  <li>เลือก <b>Camera</b> > ค้นหาลิงก์ของร้านในรายการ "Blocked"</li>
                  <li>กดเลือกชื่อเว็บแล้วกด <b>"Allow" (อนุญาต)</b></li>
                </ol>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-blue-700 text-lg">
                <Smartphone className="w-5 h-5" />
                <span>สำหรับ iPhone (Safari)</span>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-blue-100 space-y-3">
                <p className="font-semibold">วิธีที่ 1: ผ่านแถบที่อยู่เว็บ</p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-2">
                  <li>กดไอคอน <b>"AA"</b> ตรงซ้ายมือของแถบพิมพ์ชื่อเว็บ</li>
                  <li>เลือก <b>"Website Settings" (การตั้งค่าเว็บไซต์)</b></li>
                  <li>เปลี่ยน Camera จาก Ask เป็น <b>"Allow" (อนุญาต)</b></li>
                </ol>
                <p className="font-semibold mt-4">วิธีที่ 2: ผ่านการตั้งค่าเครื่อง</p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1 ml-2">
                  <li>ไปที่แอป <b>Settings (การตั้งค่า)</b> ของ iPhone</li>
                  <li>เลื่อนหาเมนู <b>Safari</b></li>
                  <li>เลื่อนลงล่างสุดเลือก <b>Camera</b></li>
                  <li>เลือกเป็น <b>Allow (อนุญาต)</b></li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-accent/5">
          <CardHeader className="flex flex-row items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            <CardTitle className="text-lg">การใช้งานบนหน้าจอโฮม</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>เพื่อให้ใช้งานได้สะดวกเหมือนแอปจริง แนะนำให้เพิ่มไว้ที่หน้าจอโฮม:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><b>iPhone:</b> เปิด Safari {'>'} กดปุ่ม Share {'>'} เลือก "Add to Home Screen"</li>
              <li><b>Android:</b> เปิด Chrome {'>'} กดจุด 3 จุด {'>'} เลือก "Install app" หรือ "Add to Home screen"</li>
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
