"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/store"
import { 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  BookOpen, 
  Package, 
  ShoppingCart, 
  CheckCircle2,
  Smartphone,
  QrCode,
  Download,
  MonitorSmartphone,
  KeyRound,
  Database,
  ExternalLink,
  Cloud,
  Globe,
  Link as LinkIcon,
  AlertTriangle,
  FileX
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ManualPage() {
  const { t } = useLanguage()

  const roles = [
    {
      title: "Admin (ผู้ดูแลระบบ)",
      icon: ShieldCheck,
      color: "text-red-600",
      description: "มีสิทธิ์สูงสุดในระบบ เหมาะสำหรับเจ้าของร้าน",
      permissions: [
        "จัดการพนักงาน (เพิ่ม/ลบ/แก้ไขตำแหน่ง)",
        "จัดการคลังสินค้า (เพิ่ม/ลบ/แก้ไข/สแกนบาร์โค้ด)",
        "ดูประวัติการขายของพนักงานทุกคน",
        "ลบรายการสั่งซื้อที่ผิดพลาดออกจากระบบ",
        "เข้าถึงหน้าตั้งค่าระบบทั้งหมด"
      ]
    },
    {
      title: "Manager (ผู้จัดการ)",
      icon: Briefcase,
      color: "text-blue-600",
      description: "ดูแลความเรียบร้อยของสินค้าและยอดขาย",
      permissions: [
        "จัดการคลังสินค้าและตรวจสอบสต็อกสินค้า",
        "ดูประวัติการขายรวมของทั้งร้าน",
        "แก้ไขข้อมูลพนักงานเบื้องต้น (ไม่มีสิทธิ์ลบพนักงาน)",
        "ช่วยสนับสนุนพนักงานขายในหน้า POS"
      ]
    },
    {
      title: "Cashier (พนักงานขาย)",
      icon: UserCheck,
      color: "text-green-600",
      description: "เน้นการขายหน้าร้านและความรวดเร็ว",
      permissions: [
        "ใช้งานหน้าจุดขาย (POS) เพื่อออกใบเสร็จ",
        "ตรวจสอบราคาสินค้าและสต็อกในคลัง (ดูได้อย่างเดียว)",
        "ดูประวัติการขายของตัวเองในกะงานนั้นๆ",
        "สแกนบาร์โค้ดสินค้าเพื่อเพิ่มลงตะกร้า"
      ]
    }
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">คู่มือการใช้งานและการติดตั้ง</h1>
          <p className="text-muted-foreground">SaleFlow POS ระบบจัดการร้านอาหารสัตว์</p>
        </div>
      </div>

      {/* Critical Warning about index.html */}
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="text-red-800 font-bold">คำเตือน: ห้ามใช้ไฟล์ index.html ในโฟลเดอร์ public</AlertTitle>
        <AlertDescription className="text-red-700">
          แอปพลิเคชันนี้ทำงานด้วยระบบ Next.js ซึ่ง **ไม่ต้องการ** ไฟล์ index.html หากคุณสร้างไฟล์นี้ไว้ในโฟลเดอร์ public จะทำให้ระบบ Deployment ขัดข้องและหาหน้าเว็บไม่เจอ (404 Error) กรุณาลบไฟล์ดังกล่าวออกหากมีอยู่ครับ
        </AlertDescription>
      </Alert>

      {/* Deployment & URL Guide */}
      <Card className="border-none shadow-lg bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700">
            <LinkIcon className="w-5 h-5" />
            วิธีหา URL ใช้งานจริง (Firebase App Hosting)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-800 text-sm space-y-4">
          <div className="bg-white p-4 rounded-lg border border-green-100 space-y-4">
            <h4 className="font-bold text-base flex items-center gap-2">
              <Globe className="w-5 h-5" />
              ทำไมถึงเข้าลิงก์ .web.app เดิมไม่ได้?
            </h4>
            <p className="text-sm">ลิงก์เดิมที่เป็นระบบ Hosting (Static) จะมองหาไฟล์ index.html ซึ่งแอปเราไม่ได้ใช้ครับ คุณต้องใช้ลิงก์จากระบบใหม่ที่ชื่อว่า <b>App Hosting</b> เท่านั้น</p>
            
            <div className="space-y-2 pt-2 border-t">
              <p className="font-bold">ขั้นตอนการหา URL ที่ถูกต้อง:</p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>ไปที่ <b><a href="https://console.firebase.google.com/" target="_blank" className="underline font-bold">Firebase Console</a></b></li>
                <li>เมนูซ้ายมือ เลือก <b>Build (สร้าง) &gt; App Hosting</b></li>
                <li>คลิกที่ชื่อโปรเจกต์ของคุณ (Backend)</li>
                <li>มองหาหัวข้อ <b>"Domains"</b> หรือ <b>"URL"</b> คุณจะพบลิงก์ใหม่ที่ Firebase สร้างให้ (มักจะยาวกว่าลิงก์เดิม)</li>
                <li><b>คัดลอกลิงก์นั้น</b> ไปให้พนักงานใช้งานได้ทันทีครับ!</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rest of the manual... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, i) => (
          <Card key={i} className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <role.icon className={`w-5 h-5 ${role.color}`} />
                <CardTitle className="text-lg">{role.title}</CardTitle>
              </div>
              <p className="text-xs text-muted-foreground">{role.description}</p>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {role.permissions.map((p, j) => (
                  <li key={j} className="text-sm flex gap-2">
                    <span className="text-primary">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}