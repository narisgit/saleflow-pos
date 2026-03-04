
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/store"
import { 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  BookOpen, 
  CheckCircle2,
  Globe,
  Link as LinkIcon,
  AlertTriangle,
  Zap,
  Terminal,
  Info,
  Download,
  Github
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
          <h1 className="text-3xl font-headline font-bold text-primary">คู่มือการนำระบบไปใช้งาน (Deployment Guide)</h1>
          <p className="text-muted-foreground">SaleFlow POS - ทำความเข้าใจขั้นตอนการออนไลน์ระบบ</p>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle className="text-blue-700 font-bold">ตอนนี้โค้ดอยู่ที่ไหน?</AlertTitle>
        <AlertDescription className="text-blue-800">
          ตอนนี้โค้ดของคุณทำงานอยู่บน <b>Cloud Editor (Firebase Studio)</b> ซึ่งเป็นพื้นที่ออนไลน์ หากคุณต้องการ Deploy (นำขึ้นระบบจริง) คุณต้องเลือกหนึ่งในสองวิธีด้านล่างนี้
        </AlertDescription>
      </Alert>

      {/* Deployment Choice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Github className="w-5 h-5" />
              ทางเลือกที่ 1: ผ่าน GitHub (ง่ายที่สุด)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>เชื่อมต่อโค้ดจากหน้านี้เข้ากับ <b>GitHub</b> แล้วให้ Firebase จัดการให้</p>
            <ul className="list-disc list-inside space-y-1 text-green-800">
              <li>ไม่ต้องดาวน์โหลดโค้ดลงเครื่อง</li>
              <li>ระบบจะอัปเดตให้อัตโนมัติเมื่อมีการแก้โค้ด</li>
              <li className="font-bold">ต้องใช้แผน Blaze (จ่ายตามจริง)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Download className="w-5 h-5" />
              ทางเลือกที่ 2: ทำในเครื่อง (ฟรี 100%)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>ดาวน์โหลดโค้ดลงเครื่องคอมพิวเตอร์ แล้วหัดใช้ <b>Terminal</b></p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>ฟรี 100% ไม่ต้องผูกบัตร</li>
              <li>เหมาะสำหรับการฝึกหัดคำสั่งคอมพิวเตอร์</li>
              <li>ใช้ Firebase Hosting (แผน Spark)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Step by step for Spark */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            วิธี Deploy แบบฟรี (ทำในเครื่องคอมพิวเตอร์ของคุณ)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
              <p><b>ดาวน์โหลดโค้ด</b> จากหน้าเว็บ Firebase Studio นี้ลงไปที่คอมพิวเตอร์ของคุณก่อน</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
              <p>เปิดโปรแกรม <b>Terminal</b> หรือ <b>Command Prompt</b> ในคอมพิวเตอร์ของคุณ แล้วเข้าไปที่โฟลเดอร์โปรเจกต์</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
              <p>พิมพ์ <code className="bg-muted px-1 rounded">npm install</code> เพื่อติดตั้งโปรแกรมที่จำเป็นลงในเครื่อง</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
              <p>พิมพ์ <code className="bg-muted px-1 rounded">npm run build</code> เพื่อสร้างไฟล์สำหรับแสดงผล (จะได้โฟลเดอร์ <code className="bg-muted px-1 rounded">out</code>)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">5</span>
              <p>พิมพ์ <code className="bg-muted px-1 rounded">firebase deploy --only hosting</code> เพื่อนำขึ้นออนไลน์</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management Section */}
      <Card id="data-management">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            การจัดการข้อมูล (Data Management)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">คุณสามารถดูและจัดการข้อมูลสินค้า ยอดขาย และพนักงาน ได้โดยตรงผ่านระบบหลังบ้านของ Firebase:</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
              <p>เข้าสู่เว็บไซต์ <a href="https://console.firebase.google.com/" target="_blank" className="text-blue-600 underline">Firebase Console</a></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
              <p>เมนู <b>Build (สร้าง) &gt; Firestore Database</b></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
              <p>เลือกแท็บ <b>Data</b> เพื่อดูตารางข้อมูลทั้งหมดที่เกิดขึ้นจริงในแอป</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>ข้อควรระวัง</AlertTitle>
        <AlertDescription>
          หากคุณ Deploy แบบฟรี (Static) ฟีเจอร์ AI ในหน้าคลังสินค้าจะไม่ทำงาน และลิงก์ที่ใช้ได้คือลิงก์เดิมที่ลงท้ายด้วย <code className="bg-red-100 px-1 rounded">.web.app</code> ครับ
        </AlertDescription>
      </Alert>
    </div>
  )
}
