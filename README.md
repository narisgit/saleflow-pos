# SaleFlow POS - คู่มือสำหรับนักพัฒนา (Developer Guide)

โปรเจกต์นี้เป็นระบบจุดขาย (POS) ที่สร้างด้วย Next.js และ Firebase โดยตั้งค่าให้สามารถ Deploy ได้ฟรีบนแผน Spark

## 🚀 วิธีออนไลน์ระบบแบบฟรี (GitHub Actions + Firebase Hosting)
วิธีนี้ดีที่สุด เพราะคุณไม่ต้องโหลดโค้ดลงเครื่อง และระบบจะอัปเดตให้อัตโนมัติเมื่อมีการแก้ไขโค้ดบน GitHub

### ขั้นตอนที่ 1: สร้างไฟล์กุญแจ (Service Account Key)
1. ไปที่ [Firebase Console](https://console.firebase.google.com/) แล้วเลือกโปรเจกต์ของคุณ
2. มองหาไอคอน **ฟันเฟือง (Project Settings)** ที่มุมบนซ้าย (ข้างๆ คำว่า Project Overview)
3. เลือกเมนู **Service Accounts** (บัญชีบริการ)
4. ตรวจสอบว่าเลือกหัวข้อ **Firebase Admin SDK** อยู่
5. เลื่อนลงมาด้านล่างสุด คุณจะเจอแถบสีฟ้าเขียนว่า **"Generate new private key"** (สร้างคีย์ส่วนตัวใหม่)
6. กดปุ่มนั้นแล้วกด **"Generate key"** อีกครั้งเพื่อดาวน์โหลดไฟล์ `.json` ลงเครื่อง (เก็บไฟล์นี้ไว้ให้ดี ห้ามให้ใครเห็น!)

### ขั้นตอนที่ 2: ตั้งค่าใน GitHub
1. ไปที่ Repository ของคุณใน GitHub
2. กดเมนู **Settings** -> **Secrets and variables** -> **Actions**
3. กดปุ่ม **"New repository secret"**
4. ช่อง Name: พิมพ์ว่า `FIREBASE_SERVICE_ACCOUNT`
5. ช่อง Secret: ให้เปิดไฟล์ `.json` ที่โหลดมาด้วย Notepad แล้วก๊อปปี้เนื้อหาทั้งหมดมาวางลงไป
6. กด **Add secret**

### ขั้นตอนที่ 3: ใช้งาน
เมื่อตั้งค่าครบแล้ว ทุกครั้งที่คุณแก้ไขโค้ดและ Push ขึ้น GitHub หุ่นยนต์จะ Deploy ให้คุณอัตโนมัติ! คุณสามารถดูสถานะได้ที่เมนู **Actions** ใน GitHub ครับ

---

## 📊 การจัดการข้อมูล
- ดูข้อมูลสินค้า/ยอดขาย: [Firebase Console](https://console.firebase.google.com/) -> Build -> Firestore Database
- หากต้องการลบไฟล์ที่เกินมา (เช่น index.html ใน public): ให้ลบผ่านแถบ File Explorer ด้านซ้ายมือในโปรแกรมนี้ได้เลยครับ
