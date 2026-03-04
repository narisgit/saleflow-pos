# SaleFlow POS - ระบบจัดการจุดขายร้านอาหารสัตว์

ยินดีด้วย! แอปพลิเคชัน SaleFlow POS ของคุณพร้อมใช้งานแล้ว นี่คือคำแนะนำสำหรับการนำไปใช้งานจริงและการจัดการข้อมูล

## ⚠️ ข้อควรระวังสำคัญ (สำคัญมาก!)
- **ห้ามสร้างไฟล์ index.html ในโฟลเดอร์ public**: แอปนี้เป็น Next.js ระบบจะสร้างหน้าเว็บให้เอง หากมีไฟล์ `index.html` จะทำให้แอปใช้งานไม่ได้
- **ห้ามใช้คำสั่ง `firebase deploy`**: คำสั่งนี้จะทำให้แอปหาหน้าเว็บไม่เจอ (404) เพราะมันไม่ใช่การ Deploy สำหรับ Next.js

## 🛠️ 1. การจัดการไฟล์
หากคุณมีไฟล์ `index.html` อยู่ในโฟลเดอร์ `public` ให้ทำการ **ลบออกทันที**:
- คลิกขวาที่ไฟล์ `public/index.html` -> เลือก **Delete**

## 🚀 2. วิธีนำโค้ดขึ้น GitHub (เพื่อเตรียม Deploy)
1. **สร้าง Repository**: ไปที่ [GitHub](https://github.com/new) ตั้งชื่อว่า `saleflow-pos` แล้วกด Create
2. **เปิด Terminal**: ในโฟลเดอร์โปรเจกต์นี้ และรันคำสั่ง:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL_จาก_GITHUB_ของคุณ>
   git push -u origin main
   ```

## 🌐 3. การนำไปใช้งานจริง (App Hosting)
**ห้ามใช้ลิงก์เดิมที่ลงท้ายด้วย .web.app** ให้ทำตามนี้:
1. ไปที่ [Firebase Console](https://console.firebase.google.com/) -> เมนู **Build** -> **App Hosting**
2. กด **Get started** และเชื่อมต่อกับ GitHub Repository ของคุณ
3. เมื่อ Deploy สำเร็จ ให้ใช้ URL ที่ปรากฏในหน้า **App Hosting Dashboard** เท่านั้น (URL จะเปลี่ยนไป ไม่ใช่ลิงก์เดิม)

## 📊 4. การจัดการข้อมูล (Data Management)
- **ดูข้อมูล**: [Firebase Console](https://console.firebase.google.com/) -> **Build** -> **Firestore Database**
- **สิ่งที่ทำได้**: ตรวจสอบรายการขาย, แก้ไขสต็อก, หรือจัดการพนักงาน

---
*จัดทำโดย SaleFlow POS Team*