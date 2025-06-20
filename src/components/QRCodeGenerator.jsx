import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './styles.css';

const CLOUD_NAME = 'doi1kxw5o';
const UPLOAD_PRESET = 'venky_unsigned';

const QRCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [qrValue, setQRValue] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (input.trim() !== '') {
      setQRValue(input);
      addToHistory(input);
    }
  }, [input]);

  const addToHistory = (text) => {
    const time = new Date().toLocaleString();
    const updated = [{ text, time }, ...history];
    setHistory(updated);
    localStorage.setItem('qrHistory', JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = localStorage.getItem('qrHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleDownloadImage = () => {
    html2canvas(document.getElementById('qrCode')).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('QR Code & Text:', 10, 10);
    doc.text(input, 10, 20);
    html2canvas(document.getElementById('qrCode')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 30, 50, 50);
      doc.save('qr-code.pdf');
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const publicUrl = response.data.secure_url;
      setInput(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed. Please check your Cloudinary config.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? '' : 'dark';
  };

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <h1 className="floating-title">@Venky QR Code Wizard 🧙‍♂️</h1>

      <textarea
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="🎤 Type or Speak to generate QR..."
      />

      <div className="buttons">
        <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>
          🎤 Voice Input
        </button>
        <button onClick={handleDownloadImage}>📥 Download</button>
        <button onClick={handleExportPDF}>📄 Export PDF</button>
        <label className="upload-btn">
          ⬆️ Upload Image
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
        </label>
        <button onClick={toggleDarkMode}>
          {darkMode ? '🌞 Lightmode' : '🌙 Darkmode'}
        </button>
        <button onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? '🗃️ Hide History' : '📂 Show History'}
        </button>
      </div>

      {qrValue && (
        <div className="qr-box floating" id="qrCode">
          <QRCode value={qrValue} size={256} />
        </div>
      )}

      {showHistory && (
        <div className="history-box">
          <h3>📜 QR History</h3>
          <ul>
            {history.map((h, i) => (
              <li key={i}>
                <b>{h.time}</b>: {h.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
