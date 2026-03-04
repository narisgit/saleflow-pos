# SaleFlow POS - คู่มือสำหรับนักพัฒนา (Developer Guide)

โปรเจกต์นี้เป็นระบบจุดขาย (POS) ที่สร้างด้วย Next.js และ Firebase

## 🚀 ทางเลือกในการออนไลน์ระบบ (Deployment)

### ทางเลือกที่ 1: อัตโนมัติและฟรี 100% (GitHub Actions + Firebase Hosting)
วิธีนี้ดีที่สุดสำหรับสายหัดเขียน เพราะไม่ต้องโหลดโค้ดลงเครื่อง และไม่ต้องจ่ายเงิน (ใช้แผน Spark ได้):
1. **สร้าง Service Account**:
   - ไปที่ [Firebase Console](https://console.firebase.google.com/) -> Project Settings -> Service Accounts
   - กดปุ่ม **"Generate new private key"** คุณจะได้ไฟล์ JSON มา
2. **ตั้งค่าใน GitHub**:
   - ไปที่ Repository ของคุณใน GitHub -> Settings -> Secrets and variables -> Actions
   - กด **"New repository secret"**
   - ตั้งชื่อว่า `FIREBASE_SERVICE_ACCOUNT`
   - ก๊อปปี้เนื้อหาทั้งหมดในไฟล์ JSON ที่โหลดมาวางลงไปแล้วกด Save
3. **ใช้งาน**: ทุกครั้งที่คุณแก้ไขโค้ดและ Push ขึ้น GitHub หุ่นยนต์จะ Deploy ให้คุณอัตโนมัติภายใน 1-2 นาที!

### ทางเลือกที่ 2: แบบง่ายที่สุด (App Hosting - ต้องใช้แผน Blaze)
สะดวกที่สุด รองรับ AI เต็มรูปแบบ แต่ต้องผูกบัตรเครดิต:
1. ไปที่ **Firebase Console** -> **Build** -> **App Hosting**
2. เชื่อมต่อกับ GitHub แล้วระบบจะจัดการให้ทุกอย่าง

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
