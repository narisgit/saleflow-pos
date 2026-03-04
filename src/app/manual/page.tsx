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
  FileX,
  CreditCard
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

      {/* Critical Warning about Blaze Plan */}
      <Alert variant="destructive" className="bg-amber-50 border-amber-200">
        <CreditCard className="h-5 w-5 text-amber-600" />
        <AlertTitle className="text-amber-800 font-bold">ข้อมูลสำคัญ: ต้องใช้แผน Blaze (Pay-as-you-go)</AlertTitle>
        <AlertDescription className="text-amber-700">
          เนื่องจากระบบ App Hosting ต้องใช้ทรัพยากรเซิร์ฟเวอร์ในการรัน Next.js คุณจำเป็นต้องกด <b>"Upgrade project"</b> ใน Firebase Console เพื่อเปลี่ยนจากแผน Spark (ฟรี) เป็น <b>Blaze</b> ก่อน ถึงจะเริ่มสร้าง Backend และใช้งานระบบนี้ได้ครับ (ไม่ต้องกังวล หากใช้งานไม่เยอะมักจะอยู่ในโควต้าฟรีของ Google Cloud ครับ)
        </AlertDescription>
      </Alert>

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
              ขั้นตอนการเริ่มต้นใช้งานครั้งแรก:
            </h4>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
                <p>กด <b>"Upgrade project"</b> ในหน้า App Hosting เพื่อเปลี่ยนเป็นแผน <b>Blaze</b></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                <p>กดปุ่ม <b>"Get started"</b> เพื่อเริ่มสร้าง Backend ชุดแรกของคุณ</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
                <p>เชื่อมต่อกับ <b>GitHub Repository</b> ที่คุณนำโค้ดขึ้นไปเก็บไว้</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
                <p>เมื่อ Deploy สำเร็จ ระบบจะแสดง <b>URL</b> ใหม่มาให้ (เช่น https://saleflow-pos-xxx.a.run.app)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
