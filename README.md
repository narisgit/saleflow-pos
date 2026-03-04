# SaleFlow POS - คู่มือสำหรับนักพัฒนา (Developer Guide)

โปรเจกต์นี้เป็นระบบจุดขาย (POS) ที่สร้างด้วย Next.js และ Firebase โดยตั้งค่าให้สามารถ Deploy ได้ฟรีบนแผน Spark

## 🚀 วิธีออนไลน์ระบบแบบฟรี (GitHub Actions + Firebase Hosting)
วิธีนี้ดีที่สุด เพราะคุณไม่ต้องโหลดโค้ดลงเครื่อง และระบบจะอัปเดตให้อัตโนมัติเมื่อมีการแก้ไขโค้ดบน GitHub

### ขั้นตอนที่ 1: สร้างไฟล์กุญแจ (Service Account Key)
1. ไปที่ [Firebase Console](https://console.firebase.google.com/) แล้วเลือกโปรเจกต์ของคุณ
2. มองหาไอคอน **ฟันเฟือง (Project Settings)** ที่มุมบนซ้าย
3. เลือกเมนู **Service Accounts** (บัญชีบริการ)
4. เลือกหัวข้อ **Firebase Admin SDK**
5. กดปุ่มสีฟ้า **"Generate new private key"** เพื่อดาวน์โหลดไฟล์ `.json`

### ขั้นตอนที่ 2: ตั้งค่าใน GitHub
1. ไปที่ Repository ของคุณใน GitHub
2. กดเมนู **Settings** -> **Secrets and variables** -> **Actions**
3. กดปุ่ม **"New repository secret"**
4. ชื่อ (Name): `FIREBASE_SERVICE_ACCOUNT`
5. ค่า (Secret): ก๊อปปี้เนื้อหาทั้งหมดจากไฟล์ `.json` มาวางลงไป

### ขั้นตอนที่ 3: วิธีส่งโค้ด (Push) จาก Firebase Studio
หากคุณไม่เห็นปุ่ม Git หรือ Push ในหน้าจอ ให้ทำตามนี้ครับ:
1. **ไอคอน Source Control**: มองที่แถบซ้ายสุดของหน้าจอ คลิกไอคอน **ตัวที่ 3 นับจากด้านบน** (รูปกิ่งไม้/สาขา)
2. **Commit**: พิมพ์ข้อความในช่อง Message (เช่น `first deploy`) แล้วกดปุ่มสีฟ้า **Commit**
3. **Push**: กดปุ่ม **Sync Changes** หรือคลิกจุด 3 จุด `...` แล้วเลือก **Push**

---

## 📊 การเข้าใช้งานแอป
เมื่อหุ่นยนต์ใน GitHub Actions (เมนู Actions) ทำงานจนขึ้นเครื่องหมายถูกสีเขียวแล้ว คุณสามารถเข้าใช้งานแอปได้ที่:
- **URL:** `https://<ชื่อโปรเจกต์ของคุณ>.web.app` (ดูได้จากหน้า Firebase Console เมนู Hosting)

### ลำดับการเริ่มใช้งาน:
1. **Login**: ลงชื่อเข้าใช้ด้วย Email/Password
2. **Staff**: เพิ่มรายชื่อพนักงานที่เมนู "จัดการพนักงาน"
3. **Inventory**: เพิ่มสินค้าที่เมนู "คลังสินค้า" (ลองสแกนบาร์โค้ดได้)
4. **POS**: เริ่มการขายที่หน้า "จุดขาย"
