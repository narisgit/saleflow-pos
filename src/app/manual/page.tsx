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
  Link as LinkIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const testSteps = [
    { title: "1. เพิ่มสินค้า", description: "ไปที่หน้า 'คลังสินค้า' เพิ่มสินค้าใหม่ ระบุชื่อ ราคา และบาร์โค้ด ระบบจะบันทึกว่าคุณเป็นผู้เพิ่ม", icon: Package },
    { title: "2. ทดสอบขาย", description: "ไปที่หน้า 'จุดขาย' เลือกสินค้าที่เพิ่งเพิ่มลงตะกร้า แล้วกดชำระเงิน ระบบจะหักสต็อกอัตโนมัติ", icon: ShoppingCart },
    { title: "3. ตรวจสอบ Dashboard", description: "กลับไปหน้า 'แผงควบคุม' ยอดขายจะถูกรวมเข้ากับกราฟแท่งรายเดือนของเดือนปัจจุบันทันที", icon: CheckCircle2 }
  ]

  const mobileTips = [
    { 
      title: "ใช้งานผ่านเบราว์เซอร์มือถือ", 
      description: "เปิดเบราว์เซอร์ (Safari/Chrome) บนมือถือ แล้วเข้าสู่ URL ของระบบ SaleFlow", 
      icon: Smartphone 
    },
    { 
      title: "เพิ่มลงหน้าจอหลัก (PWA)", 
      description: "กดปุ่ม Share (iOS) หรือเมนู (Android) แล้วเลือก 'Add to Home Screen' เพื่อใช้งานเหมือนแอป", 
      icon: Download 
    },
    { 
      title: "สแกนบาร์โค้ดด้วยกล้อง", 
      description: "หน้า POS และ Inventory รองรับการใช้กล้องหลังมือถือสแกนบาร์โค้ดสินค้าได้ทันที", 
      icon: QrCode 
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
            <p className="text-sm">แอปนี้เป็น <b>Next.js</b> ซึ่งต้องการการรันแบบ Server (SSR) ลิงก์เดิมที่เป็นแบบ Static จะหาไฟล์ไม่เจอครับ คุณต้องใช้ลิงก์จาก <b>App Hosting</b> เท่านั้น</p>
            
            <div className="space-y-2 pt-2 border-t">
              <p className="font-bold">ขั้นตอนการหา URL ตัวจริง:</p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>ไปที่ <b><a href="https://console.firebase.google.com/" target="_blank" className="underline font-bold">Firebase Console</a></b></li>
                <li>เมนูซ้ายมือ เลือก <b>Build (สร้าง) &gt; App Hosting</b></li>
                <li>หากคุณสร้าง Backend ไว้แล้ว (เชื่อมกับ GitHub) ให้คลิกที่ชื่อโปรเจกต์นั้น</li>
                <li>มองหาหัวข้อ <b>"Domains"</b> หรือ <b>"URL"</b> ในหน้า Dashboard คุณจะเห็นลิงก์ที่ Firebase สร้างให้ (มักจะเป็นชื่อโปรเจกต์ตามด้วยตัวอักษรสุ่ม)</li>
                <li>คัดลอกลิงก์นั้นส่งให้พนักงานใช้งานได้ทันทีครับ!</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-green-100/50 p-3 rounded-lg flex items-start gap-2 italic">
            <Cloud className="w-4 h-4 mt-0.5" />
            <p className="text-xs">หมายเหตุ: หากคุณยังไม่เคยสร้าง Backend ใน App Hosting ให้กด <b>"Get started"</b> และเชื่อมต่อกับ GitHub Repository ของคุณก่อนนะครับ</p>
          </div>
        </CardContent>
      </Card>

      {/* ส่วนการจัดการข้อมูลหลังบ้าน */}
      <Card className="border-none shadow-lg bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Database className="w-5 h-5" />
            การจัดการข้อมูลหลังบ้าน (Firestore Database)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 text-sm space-y-4">
          <p>คุณสามารถจัดการ แก้ไข หรือลบข้อมูลดิบ (สินค้า/ยอดขาย/พนักงาน) ได้โดยตรงที่:</p>
          <div className="bg-white p-4 rounded-lg border border-blue-100 space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
              <p>เข้าไปที่ <b><a href="https://console.firebase.google.com/" target="_blank" className="underline font-bold">Firebase Console</a></b></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
              <p>เมนู <b>Build (สร้าง) &gt; Firestore Database</b></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
              <p>จะพบ Collection <b>products</b> (สินค้า), <b>orders</b> (ยอดขาย) และ <b>userProfiles</b> (พนักงาน)</p>
            </div>
          </div>
          <Button variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100" asChild>
            <a href="https://console.firebase.google.com/" target="_blank">
              <ExternalLink className="w-4 h-4 mr-2" />
              ไปยัง Firebase Console
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg bg-orange-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <KeyRound className="w-5 h-5" />
            กรณีพนักงานลืมรหัสผ่าน
          </CardTitle>
        </CardHeader>
        <CardContent className="text-orange-800 text-sm space-y-2">
          <p>หากพนักงานลืมรหัสผ่าน สามารถทำตามขั้นตอนต่อไปนี้ได้:</p>
          <ul className="list-decimal pl-5 space-y-1">
            <li>ไปที่หน้าเข้าสู่ระบบ (Login)</li>
            <li>คลิกที่ลิงก์ <b>"Forgot password?"</b> ด้านบนช่องใส่รหัสผ่าน</li>
            <li>กรอกอีเมลของพนักงานที่ใช้ลงทะเบียน</li>
            <li>กดปุ่ม <b>"Send Reset Link"</b> ระบบจะส่งอีเมลสำหรับตั้งรหัสผ่านใหม่ไปให้</li>
            <li>พนักงานเปิดอีเมลและคลิกลิงก์เพื่อตั้งรหัสผ่านใหม่ด้วยตัวเอง</li>
          </ul>
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

      <Card className="border-none shadow-lg border-2 border-accent/20">
        <CardHeader className="bg-accent/10">
          <CardTitle className="flex items-center gap-2 text-accent">
            <MonitorSmartphone className="w-5 h-5" />
            วิธีเปิดโหมดมือถือบนคอมพิวเตอร์ (สำหรับทดสอบ)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-bold flex items-center gap-2">
                <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                กดปุ่ม F12 บนคีย์บอร์ด
              </h4>
              <p className="text-sm text-muted-foreground">เพื่อเปิดเครื่องมือสำหรับนักพัฒนา (Developer Tools) ขึ้นมาทางด้านขวาหรือด้านล่างของหน้าจอ</p>
            </div>
            <div className="space-y-3 border-l md:pl-6">
              <h4 className="font-bold flex items-center gap-2">
                <span className="bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                คลิกไอคอน "Toggle Device Toolbar"
              </h4>
              <p className="text-sm text-muted-foreground">มองหาไอคอนรูป **โทรศัพท์ซ้อนกับแท็บเล็ต** ที่มุมซ้ายบนของหน้าต่าง F12 (หรือกด Ctrl+Shift+M)</p>
              <div className="bg-muted p-4 rounded-lg flex items-center justify-center border-2 border-dashed">
                <div className="flex items-center gap-2 text-accent font-bold animate-pulse">
                  <MonitorSmartphone className="w-8 h-8" />
                  <span>คลิกที่นี่ในหน้าต่าง F12</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-accent" />
            การใช้งานผ่านมือถือจริง (Mobile Application)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mobileTips.map((tip, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="bg-white p-3 rounded-full shadow-sm border text-accent">
                  <tip.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm">{tip.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-lg bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Test Case: การตรวจสอบความเชื่อมโยงของระบบ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="bg-white p-3 rounded-full shadow-sm border">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-sm">{step.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}