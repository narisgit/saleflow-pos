
# SaleFlow POS - คู่มือสำหรับนักพัฒนา (Developer Guide)

โปรเจกต์นี้เป็นระบบจุดขาย (POS) ที่สร้างด้วย Next.js และ Firebase โดยใช้ GitHub Actions ในการ Deploy อัตโนมัติ

## 🚀 วิธีออนไลน์ระบบแบบฟรี (GitHub Actions + Firebase Hosting)

### การตั้งค่าครั้งแรก
1. **Firebase Console**: ไปที่ Project Settings > Service Accounts > Generate new private key เพื่อโหลดไฟล์ `.json`
2. **GitHub Settings**: ไปที่ Repository > Settings > Secrets > Actions
3. **Add Secret**: สร้าง Secret ชื่อ `FIREBASE_SERVICE_ACCOUNT` แล้ววางเนื้อหาจากไฟล์ `.json` ลงไป
4. **Push Code**: เมื่อคุณ Commit & Push โค้ดจาก Firebase Studio ระบบจะเริ่ม Deploy ทันที

## 👥 ขั้นตอนการเพิ่มพนักงานเข้าสู่ระบบ
เนื่องจากระบบเน้นความปลอดภัย พนักงานแต่ละคนต้องตั้งรหัสผ่านของตนเอง:
1. ให้พนักงานเปิดลิงก์เว็บแอป แล้วเลือกเมนู **Register** ในหน้า Login
2. พนักงานสมัครด้วยอีเมลและ **ตั้งรหัสผ่านของตนเอง**
3. เมื่อสมัครเสร็จ Admin จะเห็นรายชื่อในหน้า **"จัดการพนักงาน"**
4. Admin กดแก้ไข (ไอคอนดินสอ) เพื่อปรับตำแหน่งเป็น **Manager** หรือ **Admin** ตามต้องการ

## 📱 วิธีเข้าใช้งานบนมือถือ
1. ไปที่ **Firebase Console** เมนู **Hosting**
2. คัดลอก URL ในช่อง Domains (เช่น `https://your-app.web.app`)
3. เปิด URL นั้นใน Browser บนมือถือ
4. **Tip:** ใช้เมนู "Add to Home Screen" ใน Safari หรือ Chrome เพื่อสร้างไอคอนแอปบนหน้าจอมือถือ
