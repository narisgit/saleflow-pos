# SaleFlow POS - ระบบจัดการจุดขายร้านอาหารสัตว์

ยินดีด้วย! แอปพลิเคชัน SaleFlow POS ของคุณพร้อมใช้งานแล้ว นี่คือคำแนะนำสำหรับการนำไปใช้งานจริงและการจัดการข้อมูล

## 🛠️ 1. การจัดการไฟล์ (ลบ/เปลี่ยนชื่อ)
หากคุณพบไฟล์ที่ชื่อผิด หรือต้องการลบไฟล์ (เช่น `index.html` ที่ไม่ได้ใช้):
- **วิธีลบ**: คลิกขวาที่ชื่อไฟล์ในแถบเมนูด้านซ้าย แล้วเลือก **Delete**
- **วิธีเปลี่ยนชื่อ**: คลิกขวาที่ชื่อไฟล์ แล้วเลือก **Rename**

## 🚀 2. วิธีนำโค้ดขึ้น GitHub (เพื่อเตรียม Deploy)
เพื่อให้พนักงานเข้าใช้งานได้จากมือถือส่วนตัว คุณต้องฝากโค้ดไว้ที่ GitHub ก่อน:

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

## 🌐 3. การนำไปใช้งานจริง (Deployment)
เมื่อโค้ดอยู่บน GitHub แล้ว ให้ใช้ **Firebase App Hosting**:

1. **ไปที่ Firebase Console**: เลือกโปรเจกต์ของคุณ -> เมนู **Build** -> **App Hosting**
2. **สร้าง Backend**: กด **Get started** และเชื่อมต่อกับ GitHub Repository ที่คุณเพิ่งสร้าง
3. **กำหนดการตั้งค่า**: เลือก Branch `main` และกด Deploy
4. **URL ใช้งาน**: เมื่อสำเร็จ **ห้ามใช้ลิงก์เดิมที่ลงท้ายด้วย .web.app** ให้ใช้ URL ใหม่ที่แสดงในหน้า **App Hosting Dashboard** เท่านั้น (จะอยู่ในหัวข้อ Domains หรือ URL)

## 📊 4. การจัดการข้อมูล (Data Management)
ข้อมูลทั้งหมดถูกเก็บไว้ใน **Firebase Cloud Firestore**:
- **วิธีดูข้อมูล**: เข้าไปที่ [Firebase Console](https://console.firebase.google.com/) -> **Build** -> **Firestore Database**
- **สิ่งที่คุณทำได้**: ตรวจสอบรายการขาย, แก้ไขสต็อกสินค้า, หรือจัดการรายชื่อพนักงาน

---
*จัดทำโดย SaleFlow POS Team*