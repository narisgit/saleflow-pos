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
  CreditCard,
  Info,
  Zap
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

      {/* Blaze Plan Explanation */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            สรุปเรื่องแผนการใช้งาน (Blaze Plan)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          <p>
            <b>ทำไมต้องใช้แผน Blaze?</b>: เนื่องจาก SaleFlow เป็นแอป Next.js ที่มีการประมวลผลหลังบ้าน (Server-side) ระบบจึงต้องการเครื่องเซิร์ฟเวอร์ (Cloud Run) ในการรันแอป ซึ่ง Firebase จำกัดให้ใช้ได้เฉพาะในแผน Blaze เท่านั้น
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded border border-primary/10">
              <h4 className="font-bold mb-1 flex items-center gap-1 text-green-600">
                <CheckCircle2 className="w-4 h-4" /> ข้อดี
              </h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>มีโควต้าให้ใช้งานฟรีทุกเดือน (Free Tier)</li>
                <li>ถ้าร้านขนาดเล็ก ใช้งานคนเดียว มักจะไม่เสียเงิน</li>
                <li>ระบบจะลื่นไหลและรัน GenAI ได้สมบูรณ์</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border border-primary/10">
              <h4 className="font-bold mb-1 flex items-center gap-1 text-blue-600">
                <Info className="w-4 h-4" /> สิ่งที่ต้องเตรียม
              </h4>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>ต้องผูกบัตรเครดิต หรือ บัตรเดบิตเพื่อยืนยันตัวตน</li>
                <li>อัปเกรดใน Firebase Console ปุ่ม "Upgrade" มุมซ้ายล่าง</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Warning about index.html */}
      <Alert variant="destructive" className="bg-red-50 border-red-200">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle className="text-red-800 font-bold">คำเตือน: ห้ามใช้ไฟล์ index.html ในโฟลเดอร์ public</AlertTitle>
        <AlertDescription className="text-red-700">
          กรุณาลบไฟล์ <code className="bg-red-100 px-1 rounded">public/index.html</code> ออกทันทีหากมีอยู่ แอป Next.js จะสร้างหน้าเว็บให้เองโดยอัตโนมัติ การมีไฟล์นี้จะทำให้ระบบ Deployment ขัดข้อง (404 Error)
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
                <p>กด <b>"Upgrade project"</b> ใน Firebase Console เปลี่ยนเป็นแผน <b>Blaze</b> (Pay-as-you-go)</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                <p>ไปที่เมนู <b>Build &gt; App Hosting</b> แล้วกด <b>"Get started"</b></p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
                <p>เชื่อมต่อกับ <b>GitHub Repository</b> ที่คุณนำโค้ดขึ้นไปเก็บไว้</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-green-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
                <p>เมื่อ Deploy สำเร็จ ระบบจะแสดง <b>URL</b> ใหม่มาให้ที่หน้า App Hosting (ไม่ใช่ลิงก์ .web.app เดิม)</p>
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
