# Scout Attendance — GitHub Pages (STAGING)

เว็บไซต์เช็กชื่อกิจกรรมลูกเสือสามัญรุ่นใหญ่ ชั้น ม.1 ภาคเรียน 2/2569 โรงเรียนทุ่งเสลี่ยมชนูปถัมภ์

## เว็บไซต์

https://panyasittap94.github.io/scout-attendance-web/

**เผยแพร่หน้าเว็บแล้ว แต่ยังไม่รับรองการอ่านทะเบียนหรือบันทึกผลจริง** — ต้องอัปเดตและทดสอบ Apps Script STAGING ก่อน

## สถาปัตยกรรมที่เลือก

- **GitHub Pages**: หน้าเว็บ HTML/CSS/JS 7 เมนู ไม่มีข้อมูลนักเรียนหรือข้อมูลเข้าเรียนฝังในโค้ด
- **Google Apps Script Web App**: iframe ที่ซ่อนอยู่ เชื่อมผ่าน `postMessage` ไปยัง `google.script.run` ภายใน Apps Script เท่านั้น; `bridgeRpc` ตรวจลิงก์เฉพาะผู้กำกับก่อนอ่าน/เขียน
- **Google Sheets**: ทะเบียนที่อ่านอย่างเดียวและผลเช็กชื่อเก็บในเอกสาร STAGING แยกต่างหาก

**ไม่ใช้ Vercel, Cloudflare หรือ Cloudflare D1**

ผู้กำกับได้รับลิงก์เฉพาะ `https://panyasittap94.github.io/scout-attendance-web/#access=...` แล้วแตะเปิดได้เลย ไม่ต้อง Google Login/OTP/PIN หรือเลือกผู้บันทึก ตัว token ต้องไม่ฝังใน Repository นี้ และห้ามเผยแพร่ในที่สาธารณะ

## ข้อควรระวัง

- เว็บนี้เป็น **Public Repository** แต่ต้องไม่เปิดเผยรายชื่อนักเรียนแก่ผู้ไม่มีลิงก์เฉพาะ
- ลิงก์เฉพาะเป็นเสมือนกุญแจ หากผู้ใดได้รับก็อาจใช้งานได้
- การฝัง Apps Script ยังต้องทดสอบความเข้ากันได้กับ Chrome ที่ลงชื่อ Google หลายบัญชีและข้อจำกัด third-party cookies จริง
- โค้ด Apps Script และชุดทดสอบอยู่ใน Private Repo `scout-attendance-v1`
- ห้ามใส่ความลับ Google credentials, roster, attendance หรือ token ใน Repository สาธารณะ
