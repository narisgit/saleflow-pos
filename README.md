# SaleFlow POS - คู่มือสำหรับนักพัฒนา (Developer Guide)

โปรเจกต์นี้เป็นระบบจุดขาย (POS) ที่สร้างด้วย Next.js และ Firebase

## 🚀 ทางเลือกในการนำไปใช้งาน (Deployment)

คุณสามารถเลือกการออนไลน์ระบบได้ 2 วิธีตามความเหมาะสม:

### ทางเลือกที่ 1: แบบฟรี 100% (Manual Deploy - แผน Spark)
วิธีนี้ไม่ต้องผูกบัตรเครดิต แต่ต้องทำผ่านเครื่องคอมพิวเตอร์ของคุณ:
1. **ดาวน์โหลดโค้ด**: ดาวน์โหลดไฟล์จาก GitHub ลงเครื่องคอมพิวเตอร์
2. **ติดตั้งโปรแกรม**: เปิด Terminal ในโฟลเดอร์โปรเจกต์แล้วรัน:
   ```bash
   npm install
   ```
3. **Build โค้ด**: แปลงแอปเป็นไฟล์ Static HTML:
   ```bash
   npm run build
   ```
   *ระบบจะสร้างโฟลเดอร์ชื่อ `out` ขึ้นมา*
4. **Deploy**: ส่งไฟล์ขึ้น Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```
   *คุณจะได้ลิงก์ `.web.app` ที่สามารถเปิดใช้งานบนมือถือได้ทันที*

### ทางเลือกที่ 2: แบบอัตโนมัติ (App Hosting - ต้องใช้แผน Blaze)
วิธีนี้สะดวกที่สุดและรองรับฟีเจอร์ AI ครบถ้วน แต่ต้องผูกบัตรเครดิต:
1. ไปที่ **Firebase Console** -> **Build** -> **App Hosting**
2. เชื่อมต่อกับ Repository ใน GitHub ของคุณ
3. ระบบจะ Deploy ให้อัตโนมัติทุกครั้งที่มีการ Push โค้ดใหม่

---

## 🛠 การนำโค้ดขึ้น GitHub ครั้งแรก
หากคุณต้องการส่งโค้ดจากเครื่องขึ้น GitHub ให้ใช้คำสั่งดังนี้:
1. `git init`
2. `git add .`
3. `git commit -m "Initial commit"`
4. `git branch -M main`
5. `git remote add origin [URL_ของ_GitHub_คุณ]`
6. `git push -u origin main`

## 📊 การจัดการข้อมูล
- ดูข้อมูลดิบ (สินค้า/ยอดขาย/พนักงาน) ได้ที่: [Firebase Console](https://console.firebase.google.com/) -> Build -> Firestore Database
