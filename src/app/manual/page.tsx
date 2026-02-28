
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/store"
import { ShieldCheck, Briefcase, UserCheck, BookOpen, Info, Package, ShoppingCart, History } from "lucide-react"

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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <BookOpen className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">คู่มือการใช้งานเบื้องต้น</h1>
          <p className="text-muted-foreground">SaleFlow POS สำหรับร้านอาหารสัตว์</p>
        </div>
      </div>

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
                <p className="text-sm text-muted-foreground">ใช้สำหรับเลือกสินค้าลงตะกร้า พนักงานสามารถกดสแกนบาร์โค้ดเพื่อความรวดเร็ว เมื่อชำระเงินเสร็จระบบจะตัดสต็อกอัตโนมัติ</p>
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
                <p className="text-sm text-muted-foreground">ตรวจสอบยอดขายย้อนหลังและพิมพ์ใบเสร็จ (Receipt) หากมีการขายผิดพลาด Admin สามารถกดลบรายการทิ้งได้</p>
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
