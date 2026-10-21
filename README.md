# Scout Attendance — เว็บไซต์เช็กชื่อลูกเสือ

เว็บไซต์: **https://panyasittap94.github.io/scout-attendance-web/**

**กำลังทดสอบ STAGING — ยังไม่รับรองการบันทึกเข้าเรียนจริง**

## วิธีใช้งานที่ยืนยัน

- ใช้ URL ด้านบน URL เดียว เปิดจากคอมพิวเตอร์หรือโทรศัพท์ รวมถึงเปิดจาก LINE ได้
- ไม่ต้องลงชื่อเข้า Google ไม่ต้องใช้ Username/Password, PIN, OTP หรือ `#access` และไม่มีลิงก์เฉพาะ
- GitHub Pages ใช้แสดงหน้าเว็บ ส่วน Google Apps Script ContentService (JSONP) เป็นชั้นรับส่งข้อมูลกับ Google Sheets เบื้องหลังโดยไม่ใช้ iframe
- กิจกรรมลูกเสือชั้น ม.1 ภาคเรียน 2/2569: 149 สมาชิกปัจจุบัน 4 กอง 20 หมู่ ปุ่มสถานะ ม ส ล ป ข ก
- ผู้กำกับเช็กชื่อได้ทุกกอง ทุกหมู่ ไม่บันทึกชื่อผู้กดเช็กชื่อ

## คำเตือนเกี่ยวกับการเปิดสาธารณะ

**เว็บไซต์นี้เป็นสาธารณะจริง** เมื่อเปิด Apps Script แบบไม่ต้องตรวจสิทธิ์ด้วย ผู้ใช้ทุกคนที่เข้าถึง URL อาจอ่านทะเบียนและผลการเข้าเรียน รวมทั้งบันทึกแก้ไขผลได้ เจ้าของโครงการระบุชัดเจนว่าต้องการโหมดนี้แล้ว

ระบบใช้ Google Sheets สำหรับข้อมูลจริง ไม่มีข้อมูลนักเรียนหรือบัญชี Google ฝังในไฟล์สาธารณะของ GitHub

## การพัฒนา

- Frontend: `index.html`, `config.js` และ GitHub Pages
- Backend Apps Script + unit tests: Private Repository `scout-attendance-v1`, branch `develop/scout-attendance-v1`
- GitHub Pages Deploy สำเร็จไม่ได้แปลว่าการทำงานกับ Google Sheets สำเร็จโดยอัตโนมัติ; ต้องอัปเดต Apps Script source/deployment ให้ตรงรุ่นและทดสอบ E2E
- การบันทึกข้อมูลและการแก้ไขย้อนหลังต้องมี revision check และ script lock

**แก้ปัญหา iframe:** ในเดือนตุลาคม 2569 เปลี่ยนการเชื่อมจาก HTMLService iframe มาใช้ Google ContentService JSONP ตามเอกสารทางการ เพื่อหลีกเลี่ยงข้อจำกัด cross-origin iframe และ CORS โดยยังใช้ GitHub Pages URL เดิม
