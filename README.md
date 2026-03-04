# SaleFlow POS - ระบบจัดการจุดขายร้านอาหารสัตว์

ยินดีด้วย! แอปพลิเคชัน SaleFlow POS ของคุณพร้อมใช้งานแล้ว นี่คือคำแนะนำสำหรับการนำไปใช้งานจริงและการจัดการข้อมูล

## ⚠️ ข้อควรระวังสำคัญ (สำคัญมาก!)

### 1. ต้องใช้แผนการใช้งานแบบ Blaze (Pay-as-you-go)
- ระบบ **App Hosting** (สำหรับ Next.js) จำเป็นต้องใช้แผน Blaze เพื่อรันเซิร์ฟเวอร์
- ไปที่ Firebase Console -> คลิกปุ่ม **Upgrade project** เพื่อเปิดใช้งาน
- **ไม่ต้องกังวลเรื่องค่าใช้จ่าย**: หากร้านขนาดเล็ก ใช้งานไม่เยอะ มักจะอยู่ในโควต้าฟรี (Free Tier) ของ Google Cloud

### 2. ห้ามสร้างไฟล์ index.html ในโฟลเดอร์ public
- แอปนี้เป็น Next.js ระบบจะสร้างหน้าเว็บให้เอง หากมีไฟล์ `public/index.html` จะทำให้แอปใช้งานไม่ได้ (404 Error)
- หากมีไฟล์ดังกล่าว ให้ทำการ **ลบออกทันที**

### 3. ห้ามใช้คำสั่ง `firebase deploy`
- คำสั่งนี้ใช้สำหรับ Hosting แบบเก่า (Static) ซึ่งจะไม่รันเซิร์ฟเวอร์ Next.js ให้
- ให้ใช้วิธีเชื่อมต่อผ่าน GitHub ในหน้า **App Hosting** แทน

## 🚀 วิธีนำโค้ดขึ้น GitHub และ Deploy
1. **สร้าง Repository**: ไปที่ [GitHub](https://github.com/new) ตั้งชื่อว่า `saleflow-pos`
2. **Push Code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL_จาก_GITHUB_ของคุณ>
   git push -u origin main
   ```
3. **Deploy**:
   - ไปที่ Firebase Console -> **Build** -> **App Hosting**
   - กด **Upgrade project** (เพื่อเปิดแผน Blaze)
   - กด **Get started** และเชื่อมต่อกับ GitHub Repository ของคุณ

## 📊 การจัดการข้อมูล (Data Management)
- **ดูข้อมูล**: [Firebase Console](https://console.firebase.google.com/) -> **Build** -> **Firestore Database**
- **สิ่งที่ทำได้**: ตรวจสอบรายการขาย, แก้ไขสต็อก, หรือจัดการพนักงาน

---
*จัดทำโดย SaleFlow POS Team*
