
# SaleFlow POS - ระบบจัดการจุดขายร้านอาหารสัตว์

ยินดีด้วย! แอปพลิเคชัน SaleFlow POS ของคุณพร้อมใช้งานแล้ว นี่คือคำแนะนำสำหรับการนำไปใช้งานจริงและการจัดการข้อมูล

## 🚀 1. วิธีนำโค้ดขึ้น GitHub (เพื่อเตรียม Deploy)
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

## 🌐 2. การนำไปใช้งานจริง (Deployment)
เมื่อโค้ดอยู่บน GitHub แล้ว ให้ใช้ **Firebase App Hosting**:

1. **ไปที่ Firebase Console**: เลือกโปรเจกต์ของคุณ -> เมนู **Build** -> **App Hosting**
2. **สร้าง Backend**: กด **Get started** และเชื่อมต่อกับ GitHub Repository ที่คุณเพิ่งสร้าง
3. **กำหนดการตั้งค่า**: เลือก Branch `main` และกด Deploy
4. **URL ใช้งาน**: เมื่อสำเร็จ คุณจะได้รับ URL (เช่น `https://saleflow-pos.web.app`) ให้ส่งลิงก์นี้ให้พนักงานเข้าใช้งานได้เลย

## 📊 3. การจัดการข้อมูล (Data Management)
ข้อมูลทั้งหมดถูกเก็บไว้ใน **Firebase Cloud Firestore**:
- **วิธีดูข้อมูล**: เข้าไปที่ [Firebase Console](https://console.firebase.google.com/) -> **Build** -> **Firestore Database**
- **สิ่งที่คุณทำได้**: ตรวจสอบรายการขาย, แก้ไขสต็อกสินค้า, หรือจัดการรายชื่อพนักงาน

## 📱 4. การใช้งานบนมือถือ
เมื่อเข้าลิงก์ผ่านมือถือ (Safari/Chrome) แนะนำให้กด **"เพิ่มลงในหน้าจอโฮม" (Add to Home Screen)** เพื่อให้ใช้งานได้รวดเร็วเหมือนแอปทั่วไป

## 🔐 5. กรณีลืมรหัสผ่าน
พนักงานสามารถกดปุ่ม **"Forgot password?"** ในหน้า Login เพื่อรับอีเมลสำหรับตั้งรหัสผ่านใหม่ได้ด้วยตัวเอง

---
*จัดทำโดย SaleFlow POS Team*
