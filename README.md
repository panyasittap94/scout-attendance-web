# Scout Attendance — GitHub Pages frontend (STAGING)

เว็บเช็กชื่อกิจกรรมลูกเสือสามัญรุ่นใหญ่ ชั้น ม.1 ภาคเรียนที่ 2/2569 โรงเรียนทุ่งเสลี่ยมชนูปถัมภ์

**สถานะปัจจุบัน: STAGING — ยังไม่สามารถเช็กชื่อหรือบันทึกข้อมูลจริงได้**

## URL ของหน้าเว็บ

https://panyasittap94.github.io/scout-attendance-web/

GitHub Pages URL นี้จะเปิดได้หลังตั้งค่าที่ **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save** และรอ GitHub เผยแพร่สำเร็จ

## ไฟล์สาธารณะที่อนุญาต

- `index.html`: ส่วนติดต่อผู้ใช้ 7 เมนูและปุ่มสถานะ ม ส ล ป ข ก **ไม่มีชื่อ/รหัสนักเรียนฝังในโค้ด**
- `config.js`: ค่า URL ของ API ที่ผ่านการตรวจแล้ว; ระหว่างนี้ตั้งค่าว่างเพื่อป้องกันการใช้ข้อมูลจริง
- `.nojekyll`: ตั้งค่าโฮสต์แบบ static

## ความปลอดภัย

- **Repository นี้เป็น Public** ห้ามเก็บทะเบียน รายชื่อนักเรียน ข้อมูลเช็กชื่อ รหัสลับ API secret, Google credentials หรือ capability link สำหรับผู้กำกับ
- Backend/Google Sheets และการทดสอบอยู่ใน Private Repository `scout-attendance-v1`; ห้ามเปลี่ยน Repository เดิมเป็น Public
- GitHub Pages รัน Backend ไม่ได้ และ **เขียน Google Sheets โดยตรงอย่างปลอดภัยไม่ได้**
- เป้าหมายเมื่อเชื่อม API และผ่านการทดสอบ: ผู้กำกับแตะลิงก์เฉพาะแล้วใช้งานทันที โดยไม่ต้อง Google Login, PIN หรือ OTP; API ต้องตรวจสิทธิ์ของลิงก์ทุกครั้งก่อนคืนข้อมูลนักเรียนหรือบันทึกผล
- **อย่าแจก URL นี้เป็นระบบพร้อมใช้จริง** จนกว่า Backend API ปลอดภัยและผ่านการทดสอบ
