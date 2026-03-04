
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/store"
import { 
  ShieldCheck, 
  BookOpen, 
  Terminal,
  Info,
  Download,
  Github,
  AlertTriangle,
  Zap,
  Globe,
  Smartphone,
  Cloud
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
        <AlertTitle className="text-blue-700 font-bold">สรุปสถานะปัจจุบัน</AlertTitle>
        <AlertDescription className="text-blue-800">
          คุณนำโค้ดขึ้น <b>GitHub</b> แล้ว ซึ่งดีมากครับ! ตอนนี้คุณมี 2 ทางเลือกในการทำให้คนอื่นเข้าใช้งานได้:
        </AlertDescription>
      </Alert>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-orange-200 bg-orange-50 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Zap className="w-5 h-5" />
              ทางเลือกที่ 1: ใช้ App Hosting
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3 flex-1">
            <div className="font-bold text-orange-800">เหมาะสำหรับ: ระบบจริง, ใช้งานหนัก, มี AI</div>
            <ul className="list-disc list-inside space-y-1 text-orange-900 opacity-80">
              <li>เชื่อมกับ GitHub โดยตรง</li>
              <li>แก้โค้ดปุ๊บ หน้าเว็บเปลี่ยนปั๊บ (Auto Update)</li>
              <li className="font-bold text-red-600 underline">ต้องอัปเกรดเป็นแผน Blaze (ผูกบัตรเครดิต)</li>
              <li>รองรับฟีเจอร์ AI ครบ 100%</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Globe className="w-5 h-5" />
              ทางเลือกที่ 2: ใช้ Hosting (แบบฟรี)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-3 flex-1">
            <div className="font-bold text-green-800">เหมาะสำหรับ: การเรียนรู้, ร้านขนาดเล็ก, งบ 0 บาท</div>
            <ul className="list-disc list-inside space-y-1 text-green-900 opacity-80">
              <li>ต้องดาวน์โหลดโค้ดลงเครื่องก่อน</li>
              <li>รันคำสั่ง Build และ Deploy ด้วยตัวเอง</li>
              <li className="font-bold text-green-600 underline">ฟรี 100% (แผน Spark) ไม่ต้องผูกบัตร</li>
              <li className="text-red-600 font-bold">เล่นบนมือถือได้เหมือนกัน! (ผ่าน URL ของคุณ)</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Cloud className="w-5 h-5" />
              Deploy แล้วเล่นบนมือถือได้ไหม?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">ได้แน่นอนครับ! เมื่อคุณรันคำสั่ง <code className="bg-muted px-1 rounded">firebase deploy</code> สำเร็จ:</p>
            <div className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg">
              <Smartphone className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="font-bold">เข้าผ่านมือถือได้ทุกที่</p>
                <p className="text-xs">เพียงพิมพ์ URL (เช่น .web.app) ในเบราว์เซอร์มือถือ</p>
              </div>
            </div>
            <p className="text-xs italic text-orange-600">* การ "Deploy ในเครื่อง" หมายถึงการส่งไฟล์จากคอมฯ ไปไว้บนเซิร์ฟเวอร์ Google เพื่อให้ทุกคนเข้าถึงได้ครับ</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Download className="w-5 h-5" />
              วิธีดาวน์โหลดโค้ดลงเครื่อง
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">เนื่องจากคุณเอาขึ้น GitHub แล้ว ให้ทำแบบนี้ครับ:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>ไปที่หน้า GitHub ของคุณ</li>
              <li>กดปุ่มสีเขียวที่เขียนว่า <b>"{'<>'}" Code</b></li>
              <li>เลือก <b>"Download ZIP"</b> แล้วนำไปแตกไฟล์ในคอมพิวเตอร์</li>
              <li>จากนั้นค่อยรันคำสั่ง Terminal ตามขั้นตอนด้านล่างครับ</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Step by step for Spark */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            วิธีรันแบบฟรี (Spark Plan) ในเครื่องของคุณ
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">เมื่อได้ไฟล์โปรเจกต์ในคอมพิวเตอร์แล้ว ให้เปิด Terminal ในโฟลเดอร์นั้นแล้วพิมพ์ดังนี้:</p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">1</div>
              <div className="space-y-1">
                <p className="font-bold">ติดตั้งโปรแกรม</p>
                <p className="text-sm text-muted-foreground">พิมพ์ <code className="bg-muted px-1 rounded">npm install</code> (ทำแค่ครั้งแรกครั้งเดียว)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">2</div>
              <div className="space-y-1">
                <p className="font-bold">สั่ง Build เป็นระบบ Static</p>
                <p className="text-sm text-muted-foreground">พิมพ์ <code className="bg-muted px-1 rounded">npm run build</code> ระบบจะสร้างโฟลเดอร์ชื่อ <code className="bg-muted px-1 rounded">out</code> ขึ้นมา</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">3</div>
              <div className="space-y-1">
                <p className="font-bold">ส่งขึ้นระบบฟรี (Deploy)</p>
                <p className="text-sm text-muted-foreground">พิมพ์ <code className="bg-muted px-1 rounded">firebase deploy --only hosting</code></p>
                <p className="text-xs text-green-600 font-bold">✨ เมื่อเสร็จ คุณจะได้ URL มาเปิดเล่นบนมือถือได้เลย!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>คำเตือนเรื่องลิงก์</AlertTitle>
        <AlertDescription>
          ลิงก์ที่ลงท้ายด้วย <code className="bg-red-100 px-1 rounded">.web.app</code> จะเข้าได้เฉพาะเมื่อคุณทำตามขั้นตอน <b>"รันแบบฟรี"</b> ด้านบนสำเร็จแล้วเท่านั้นครับ!
        </AlertDescription>
      </Alert>
    </div>
  )
}
