
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
  Info
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
          <h1 className="text-3xl font-headline font-bold text-primary">คู่มือสำหรับผู้เริ่มต้น (หัด Deploy)</h1>
          <p className="text-muted-foreground">SaleFlow POS - ระบบจัดการร้านอาหารสัตว์</p>
        </div>
      </div>

      {/* Deployment Choice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-200 bg-green-50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Zap className="w-5 h-5" />
              ทางเลือกที่ 1: Deploy แบบฟรี (Spark)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>เหมาะสำหรับ: <b>นักศึกษา, ผู้ที่หัดเขียนโปรแกรม</b></p>
            <ul className="list-disc list-inside space-y-1 text-green-800">
              <li>ไม่ต้องผูกบัตรเครดิต</li>
              <li>ใช้ Firebase Hosting แบบปกติ</li>
              <li>ใช้งานฐานข้อมูลและระบบขายได้ปกติ</li>
              <li className="text-red-600 font-bold">ฟีเจอร์ AI จะใช้งานไม่ได้</li>
            </ul>
            <div className="bg-white p-3 rounded border border-green-100 font-mono text-[10px] mt-2">
              npm run build<br/>
              firebase deploy --only hosting
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Globe className="w-5 h-5" />
              ทางเลือกที่ 2: ใช้งานจริง (Blaze)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <p>เหมาะสำหรับ: <b>ร้านค้าจริง, ระบบที่ต้องการ AI</b></p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>ต้องผูกบัตรเครดิต (มีโควต้าฟรี)</li>
              <li>ใช้ Firebase App Hosting</li>
              <li>รัน Next.js ได้สมบูรณ์ 100%</li>
              <li>ใช้งานระบบ AI เขียนคำบรรยายสินค้าได้</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Step by step for Spark */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            วิธี Deploy แบบฟรี (Step-by-Step)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
              <p>เปิด Terminal ในเครื่องของคุณ แล้วพิมพ์ <code className="bg-muted px-1 rounded">npm run build</code> เพื่อสร้างไฟล์สำหรับนำไปแสดงผล</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
              <p>ตรวจสอบว่าโฟลเดอร์ชื่อ <code className="bg-muted px-1 rounded">out</code> ปรากฏขึ้นมาในโปรเจกต์</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
              <p>พิมพ์คำสั่ง <code className="bg-muted px-1 rounded">firebase deploy --only hosting</code></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
              <p>ระบบจะให้ลิงก์ที่ลงท้ายด้วย <code className="text-blue-600">.web.app</code> มา คลิกเปิดใช้งานได้เลย!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>ข้อควรระวัง</AlertTitle>
        <AlertDescription>
          หากคุณ Deploy แบบฟรี ลิงก์เดิมที่เป็น <code className="bg-red-100 px-1 rounded">.web.app</code> จะใช้งานได้แล้ว แต่คุณจะพบว่าฟีเจอร์ AI ในหน้าคลังสินค้าจะไม่ทำงาน ซึ่งเป็นเรื่องปกติของโหมดฟรีครับ
        </AlertDescription>
      </Alert>
    </div>
  )
}
