# 🎯 Venky QR Code Generator 🎯

An interactive and smart QR Code Generator built with **React**. This app supports text and image inputs, real-time QR generation, Cloudinary upload, voice input using the browser microphone, PDF export, download functionality, and Dark/Light mode with a beautiful animated UI.

---

## 🌟 Features

✅ Real-time QR Code generation  
✅ 🎤 Voice input support using Web Speech API  
✅ 📸 Upload image and convert URL to QR using Cloudinary  
✅ 📥 Download QR code as PNG  
✅ 📄 Export QR with input text to PDF  
✅ 🌓 Toggle between Darkmode / Lightmode  
✅ 📜 Local History tracking  
✅ 🎨 Attractive UI with animations

---

## 📁 Project Structure

qr-ai-generator/
├── public/
├── src/
│ ├── components/
│ │ ├── QRCodeGenerator.jsx
│ │ └── styles.css
│ └── App.jsx
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

yaml
Copy
Edit

---

## 🚀 Installation & Run

### Prerequisites:
- Node.js and npm installed
- Vite development server

### 1. Clone this repository

```bash
git clone https://github.com/your-username/qr-ai-generator.git
cd qr-ai-generator
2. Install dependencies
bash
Copy
Edit
npm install
3. Start development server
bash
Copy
Edit
npm run dev
Then open http://localhost:5173 in your browser.

☁️ Cloudinary Setup
To enable image upload:

Go to Cloudinary Console

Create a new unsigned upload preset (e.g. venky_unsigned)

Update the constants in QRCodeGenerator.jsx:

js
Copy
Edit
const CLOUD_NAME = 'your_cloud_name'; // Replace this
const UPLOAD_PRESET = 'your_unsigned_preset'; // Replace this
🧠 Technologies Used
React 19+

Vite

react-qr-code

html2canvas

jspdf

axios

react-speech-recognition

Cloudinary API

🖼️ Screenshot

🧑‍💻 Author
@Venky K
👨‍💻 Passionate about AI + Web
📧 Email: venkyaarm@gmail.com"# venkyQR" 
