
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/store"
import { 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  BookOpen, 
  Info, 
  Package, 
  ShoppingCart, 
  History, 
  CheckCircle2,
  Smartphone,
  QrCode,
  Download,
  MonitorSmartphone,
  MousePointer2,
  KeyRound,
  Database,
  ExternalLink
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
          <h1 className="text-3xl font-headline font-bold text-primary">คู่มือการใช้งานเบื้องต้น</h1>
          <p className="text-muted-foreground">SaleFlow POS สำหรับร้านอาหารสัตว์</p>
        </div>
      </div>

      {/* ส่วนการจัดการข้อมูลหลังบ้าน */}
      <Card className="border-none shadow-lg bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Database className="w-5 h-5" />
            การจัดการข้อมูลหลังบ้าน (Backend Database)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800 text-sm space-y-4">
          <p>ข้อมูลทั้งหมดของร้านถูกจัดเก็บไว้อย่างปลอดภัยบน <b>Firebase Cloud Firestore</b> คุณสามารถเข้าไปจัดการข้อมูลดิบได้ที่:</p>
          <div className="bg-white p-4 rounded-lg border border-blue-100 space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
              <p>เข้าไปที่ <b><a href="https://console.firebase.google.com/" target="_blank" className="underline font-bold">Firebase Console</a></b> และเลือกโปรเจกต์ของคุณ</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
              <p>ที่แถบเมนูด้านซ้าย คลิกที่เมนู <b>"Build"</b> (หรือ "สร้าง")</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
              <p>คุณจะพบเมนูย่อยชื่อ <b>"Firestore Database"</b> เมื่อคลิกเข้าไปจะเห็นข้อมูลสินค้า (products) และยอดขาย (orders) ทั้งหมดครับ</p>
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
          <Alert className="bg-accent/5 border-accent/20 mt-4">
            <MousePointer2 className="w-4 h-4 text-accent" />
            <AlertTitle className="text-accent">คำแนะนำเพิ่มเติม</AlertTitle>
            <AlertDescription className="text-accent-foreground text-xs">
              หลังจากคลิกไอคอนแล้ว หน้าจอแอปจะหดเล็กลงเหมือนมือถือ คุณสามารถเลือกขนาดรุ่นมือถือ (เช่น iPhone, Samsung) ได้จากเมนูด้านบนหน้าจอ
            </AlertDescription>
          </Alert>
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

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            การใช้งานหน้าหลัก
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-accent/10 p-2 rounded-lg h-fit">
                <ShoppingCart className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold">หน้าจุดขาย (POS)</h4>
                <p className="text-sm text-muted-foreground">ใช้สำหรับเลือกสินค้าลงตะกร้า พนักงานสามารถกดสแกนบาร์โค้ดด้วยกล้องมือถือได้ เมื่อชำระเงินเสร็จระบบจะตัดสต็อกอัตโนมัติ</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/10 p-2 rounded-lg h-fit">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">การจัดการคลังสินค้า</h4>
                <p className="text-sm text-muted-foreground">ระบุชื่อสินค้า หมวดหมู่ และราคาเป็น <b>บาท (฿)</b> พนักงานที่ล็อกอินอยู่จะถูกบันทึกเป็น "ผู้เพิ่มสินค้า" อัตโนมัติ</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-orange-100 p-2 rounded-lg h-fit">
                <History className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold">ประวัติการขาย</h4>
                <p className="text-sm text-muted-foreground">ตรวจสอบยอดขายย้อนหลังและพิมพ์ใบเสร็จ (Receipt) กราฟในหน้า Dashboard จะรวมยอดขายตามเดือนที่ทำรายการ</p>
              </div>
            </div>
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="w-4 h-4 text-blue-600" />
              <AlertTitle className="text-blue-800">คำแนะนำความปลอดภัย</AlertTitle>
              <AlertDescription className="text-blue-700 text-xs">
                ควรเปลี่ยนรหัสผ่านพนักงานเมื่อมีการเปลี่ยนแปลงทีม และไม่ควรแชร์บัญชี Admin ร่วมกันหลายคน
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
