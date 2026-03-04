
# SaleFlow POS - คู่มือสำหรับนักพัฒนา (Developer Guide)

โปรเจกต์นี้เป็นระบบจุดขาย (POS) ที่สร้างด้วย Next.js และ Firebase โดยใช้ GitHub Actions ในการ Deploy อัตโนมัติ

## 🚀 วิธีออนไลน์ระบบแบบฟรี (GitHub Actions + Firebase Hosting)

### การตั้งค่าครั้งแรก
1. **Firebase Console**: ไปที่ Project Settings > Service Accounts > Generate new private key เพื่อโหลดไฟล์ `.json`
2. **GitHub Settings**: ไปที่ Repository > Settings > Secrets > Actions
3. **Add Secret**: สร้าง Secret ชื่อ `FIREBASE_SERVICE_ACCOUNT` แล้ววางเนื้อหาจากไฟล์ `.json` ลงไป
4. **Push Code**: เมื่อคุณ Commit & Push โค้ดจาก Firebase Studio ระบบจะเริ่ม Deploy ทันที

### 📱 วิธีเข้าใช้งานบนมือถือ
1. ไปที่ **Firebase Console** เมนู **Hosting**
2. คัดลอก URL ในช่อง Domains (เช่น `https://your-app.web.app`)
3. เปิด URL นั้นใน Browser บนมือถือ
4. **Tip:** ใช้เมนู "Add to Home Screen" ใน Safari หรือ Chrome เพื่อสร้างไอคอนแอปบนหน้าจอมือถือ

## 📊 ลำดับการเริ่มใช้งานแอป
1. **Login**: เข้าสู่ระบบด้วย Email/Password (พนักงานต้องมี Account ในระบบ)
2. **Staff**: เพิ่มพนักงานที่เมนู "จัดการพนักงาน"
3. **Inventory**: เพิ่มสินค้าที่เมนู "คลังสินค้า" (รองรับการสแกนบาร์โค้ดผ่านกล้องมือถือ)
4. **POS**: เริ่มการขายที่หน้า "จุดขาย"
