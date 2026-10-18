# 🧋 Nose Tea — The Cloud Series (JavaScript Animation Website)

> เว็บไซต์แอนิเมชันอินเทอร์แอคทีฟสุดพรีเมียม ถอดแบบและพัฒนาต่อยอดจากภาพคอนเซปต์ **Nose Tea: Warm Tone vs Cold Tone** พร้อมระบบแอนิเมชันระดับ World-Class และพร้อมอัปโหลดขึ้น **Vercel (vercel.app)** ทันที!

---

## 📸 ที่มาของไอเดียจากรูปต้นฉบับ

จากภาพเครื่องดื่ม 4 แก้วของแบรนด์ **nose tea** ที่แบ่งออกเป็น 2 โทน:
1. **WARM TONE ☀️ (โทนอุ่น สดใส มีชีวิตชีวา)**
   - **Peach Orange Cloud:** ชาเขียวมะลิผสมน้ำหวานพีชขาวญี่ปุ่น ส้มวาเลนเซียสด และเนื้อพีชหั่นเต๋า
   - **Mango Passion Cloud:** ชาอู่หลงยอดดอย ผสานมะม่วงน้ำดอกไม้สุก เสาวรสสด และเลมอนสไลซ์
2. **COLD TONE ❄️ (โทนเย็น สดชื่น เย็นยะเยือก)**
   - **Blueberry Grape Cloud:** สลัชองุ่นเคียวโฮและบลูเบอร์รีป่าเข้มข้น ประกายม่วงคอสมิก
   - **Blue Lychee Cloud:** ชาสีฟ้าไอซ์แลนด์จากสารสกัดดอกไม้ธรรมชาติ ผสานเนื้อลิ้นจี่ขาวฉ่ำน้ำ
3. **Signature Cloud Top:** ชีสคลาวด์โฟมหนา 30 มม. นุ่มฟู ละมุนเค็มมันกลมกล่อมอันเป็นเอกลักษณ์

---

## ✨ ไฮไลต์ฟีเจอร์และ JavaScript Animations

1. **🎨 Dual-Tone Dynamic Theme Morphing (GSAP & CSS Custom Properties)**
   - สลับบรรยากาศทั้งหน้าเว็บระหว่าง **Warm Tone** (แสงส้มประกายทอง) และ **Cold Tone** (แสงฟ้านีออนและม่วงอาร์กติก) แบบ Real-time
   - พื้นหลัง Ambient Glow Orbs เคลื่อนไหวลอยตัวอย่างนุ่มนวล
2. **🫧 Canvas Fizzy Bubbles & Floating Fruit Physics Engine**
   - อนุภาคฟองก๊าซ Micro-bubbles ลอยขึ้นสู่ผิวน้ำพร้อมเอฟเฟกต์สะบัดตามแรงขยับเมาส์
   - ชิ้นผลไม้ลอยตัวแบบอิสระ (สไลซ์ส้ม, พีช, มะม่วง, บลูเบอร์รี, ลิ้นจี่, ก้อนน้ำแข็ง 3D) ที่เปลี่ยนชนิดตามโทนที่เลือก
3. **🧊 3D Perspective Card Tilt & Specular Glare**
   - การ์ดเครื่องดื่มหมุนเอียง 3 มิติ ตามพิกัดเคอร์เซอร์ของผู้ใช้ พร้อมแสงสะท้อนมันวาว (Glare Reflection)
   - หยดน้ำเกาะข้างแก้ว (Condensation Drops) ที่ไหลหยดสมจริง
4. **🔬 "Deconstruct the Cloud" Interactive 4-Layer Anatomy**
   - ผ่าชั้นความอร่อยของแก้วออกเป็น 4 เลเยอร์ (Cream Cheese Foam, Sub-Zero Slush, Cold-Brew Tea, Fresh Fruit Chunks)
   - ปุ่ม **"Explode 4 Layers"** แยกชิ้นส่วนแก้วแบบ 3D ด้วย GSAP
5. **🧪 "Mix & Match DIY Cloud" Drink Builder Simulator**
   - ซิมูเลเตอร์ผสมแก้วโปรดของคุณเอง! ปรับระดับของเหลว, สีชา, ชิ้นผลไม้, ความหนาของโฟมชีส (20mm, 30mm, Double Cloud)
   - คำนวณราคาและแคลอรี่แบบ Real-time พร้อมกดสั่งใส่แก้วได้จริง
6. **🎵 Web Audio API Sound Synthesizer (Zero Audio File Dependencies)**
   - สร้างเสียง Sound Effects ผ่าน Web Audio API โดยไม่ต้องโหลดไฟล์เสียงภายนอก:
     - เสียงฟองป๊อป (Bubble Pop)
     - เสียงก้อนน้ำแข็งกระทบแก้ว (Ice Clinking Chime)
     - เสียงรินชาซ่า (Fizzy Pouring Noise)
     - มีปุ่มเปิด/ปิดเสียง (Sound: ON/OFF) ที่มุมซ้ายล่าง
7. **🛒 Slide-in Order Drawer & Nutrition Modal**
   - แอนิเมชันลูกแก้วลอยพุ่งเข้าตะกร้าเมื่อกดสั่ง
   - ดูข้อมูลระดับความหวาน ความเปรี้ยว ความมันนัว และส่วนประกอบของแต่ละเมนู

---

## 🚀 วิธีนำขึ้น Vercel (vercel.app)

โปรเจกต์นี้ถูกออกแบบเป็น **Zero-Build Static Web Architecture** (HTML5 + Vanilla JS + CSS3 + Tailwind CDN + GSAP CDN) จึงสามารถ Deploy บน Vercel ได้ทันที 100% โดยไม่มีข้อผิดพลาดเรื่อง Node / Build Failed!

### วิธีที่ 1: Deploy ผ่าน GitHub (แนะนำ สะดวกที่สุด)
1. นำโฟลเดอร์นี้อัปโหลดขึ้น GitHub Repository ของคุณ (เช่น `nose-tea-cloud-animation`)
2. เข้าไปที่ [vercel.com](https://vercel.com) แล้วล็อกอิน
3. คลิกปุ่ม **"Add New..."** > **"Project"**
4. เลือก Repository ที่คุณเพิ่ง Push ขึ้นไป
5. ในหน้าตั้งค่า Vercel:
   - **Framework Preset:** ให้เลือก `Other` (หรือปล่อยเป็นค่าเริ่มต้น)
   - **Root Directory:** `./`
6. กดปุ่ม **"Deploy"**
7. รอประมาณ 10-15 วินาที คุณจะได้ลิงก์เว็บไซต์ เช่น `https://nose-tea-cloud.vercel.app` ใช้งานได้ทันทีทั่วโลก!

---

### วิธีที่ 2: Deploy ด้วย Vercel CLI (ผ่าน Terminal)
หากคุณติดตั้ง Node.js หรือ Vercel CLI บนเครื่องแล้ว สามารถรันคำสั่ง:
```bash
npx vercel
```
หรือหากต้องการ Deploy ขึ้น Production โดยตรง:
```bash
npx vercel --prod
```
ทำตามขั้นตอนบน Terminal ล็อกอินและยืนยันชื่อโปรเจกต์ ระบบจะสร้าง URL `*.vercel.app` ให้ทันที

---

### วิธีที่ 3: Drag & Drop ผ่าน Vercel Dashboard (ไม่ต้องใช้ Git หรือ Command Line)
1. ล็อกอินเข้า [vercel.com](https://vercel.com)
2. ไปที่ [vercel.com/new](https://vercel.com/new)
3. เลื่อนลงมาที่หัวข้อ **"Deploy a Third-Party Git Repository or Import Project"** หรือลากโฟลเดอร์โปรเจกต์นี้วางลงในหน้าต่างของ Vercel
4. ระบบจะทำการ Deploy ให้อัตโนมัติทันที

---

## 💻 วิธีเปิดดูและทดสอบบนเครื่อง Local

เนื่องจากไฟล์ทั้งหมดเป็น Static Files คุณสามารถเปิดดูได้ง่ายๆ 2 วิธี:
1. **เปิดตรงผ่าน Browser:** ดับเบิลคลิกไฟล์ `index.html` เพื่อเปิดบน Chrome / Edge / Safari / Firefox ได้ทันที
2. **ใช้ Local HTTP Server:**
   ```bash
   npx serve .
   ```
   หรือใช้ส่วนขยาย **Live Server** ใน Visual Studio Code

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
nose-tea-cloud-animation/
├── index.html                   # โครงสร้างหน้าเว็บหลักและ UI ทั้งหมด
├── style.css                    # สไตล์ CSS, ธีมสี Warm/Cold, เอฟเฟกต์ 3D และ Glassmorphism
├── app.js                       # ตัวควบคุม Animation, Canvas Particles, เสียง, และ DIY Mixer
├── vercel.json                  # ไฟล์ตั้งค่าความปลอดภัยและ Routing สำหรับ Vercel
├── package.json                 # สคริปต์คำสั่งสำหรับนักพัฒนา
├── README.md                    # เอกสารแนะนำการใช้งานและการ Deploy
└── assets/
    ├── original-drinks.jpg      # รูปภาพต้นฉบับ 4 แก้วที่คุณอัปโหลด
    ├── drink-peach-orange.png   # ภาพแก้ว Peach Orange Cloud คุณภาพสูง
    ├── drink-mango-passion.png  # ภาพแก้ว Mango Passion Cloud คุณภาพสูง
    ├── drink-blueberry-grape.png# ภาพแก้ว Blueberry Grape Cloud คุณภาพสูง
    ├── drink-blue-lychee.png    # ภาพแก้ว Blue Lychee Cloud คุณภาพสูง
    ├── nose-logo.svg            # เวกเตอร์โลโก้ Nose Tea มาสคอตจมูกเขียว
    ├── orange-slice.svg         # เวกเตอร์สไลซ์ส้ม
    ├── peach-slice.svg          # เวกเตอร์ชิ้นพีช
    ├── mango-cube.svg           # เวกเตอร์มะม่วงหั่นเต๋า 3D
    ├── blueberry.svg            # เวกเตอร์ผลบลูเบอร์รี
    ├── lychee.svg               # เวกเตอร์ผลลิ้นจี่สด
    └── ice-cube.svg             # เวกเตอร์ก้อนน้ำแข็งคริสตัล
```

---

Crafted with 💚 for **Nose Tea** lovers and interactive web enthusiasts.
