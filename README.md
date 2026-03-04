
# SaleFlow POS - ระบบจัดการจุดขายสำหรับผู้เริ่มต้น (Learning Mode)

โปรเจกต์นี้ได้รับการตั้งค่าให้สามารถ **Deploy ได้ฟรี (แผน Spark)** เพื่อการเรียนรู้ โดยไม่ต้องผูกบัตรเครดิต

## 🛠 วิธี Deploy แบบฟรี (Spark Plan)
หากคุณต้องการหัดนำโค้ดขึ้นระบบจริงโดยไม่เสียค่าใช้จ่าย ให้ทำตามขั้นตอนดังนี้:

1. **Build โค้ดในเครื่อง**:
   รันคำสั่งใน Terminal:
   ```bash
   npm run build
   ```
   *ระบบจะสร้างโฟลเดอร์ชื่อ `out` ขึ้นมา*

2. **ติดตั้ง Firebase CLI**:
   (หากยังไม่มี) รัน: `npm install -g firebase-tools` แล้วรัน `firebase login`

3. **Deploy ไปที่ Firebase Hosting**:
   รันคำสั่ง:
   ```bash
   firebase deploy --only hosting
   ```

4. **เข้าใช้งาน**:
   เมื่อสำเร็จ คุณจะได้ลิงก์ `https://your-project-id.web.app` มาใช้งานได้ทันที!

## ⚠️ ข้อจำกัดของโหมดฟรี (Static)
- **AI (Genkit) จะใช้งานไม่ได้**: เนื่องจากระบบ AI ต้องการเซิร์ฟเวอร์ประมวลผล
- **ความเร็ว**: การโหลดหน้าเว็บอาจช้ากว่าแบบ App Hosting เล็กน้อย
- **ฐานข้อมูล (Firestore/Auth)**: ใช้งานได้ตามปกติ 100%

## 📊 การจัดการข้อมูล
- ดูข้อมูลได้ที่: [Firebase Console](https://console.firebase.google.com/) -> Build -> Firestore Database

---
*จัดทำขึ้นเพื่อการศึกษาและการเรียนรู้การ Deploy ระบบ*
