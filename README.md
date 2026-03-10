# 📜 Bhagavad Gita Translation Dashboard

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

**A beautiful, multilingual web application for translating and listening to Bhagavad Gita shlokas in 100+ languages**

[Features](#-features) • [Quick Start](#-quick-start) • [Demo](#-demo) • [Documentation](#-project-structure) • [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🌍 Multilingual Support
- Translate to **100+ languages**
- Supports all major Indian languages
- International language support

### 🔊 Audio Features
- Text-to-speech in any language
- High-quality audio generation
- Auto-cleanup of temporary files

</td>
<td width="50%">

### 🎨 Beautiful Interface
- Animated scroll design
- Rotating Sudarshana Chakra
- Responsive mobile-friendly UI

### ⚡ Performance
- Fast API responses
- Optimized animations
- Efficient resource loading

</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/bhagavad-gita-translation.git
cd bhagavad-gita-translation
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Start Backend Server
```bash
cd backend
python -m uvicorn backend:app --reload --host 127.0.0.1 --port 8000
```

#### 4. Start Frontend Server (in a new terminal)
```bash
cd frontend/BV
python -m http.server 5500
```

#### 5. Open in Browser
Navigate to: `http://localhost:5500/translation.html`

### Using the Application
1. Paste a Sanskrit shloka in Devanagari script
2. Select your preferred language
3. Click "Translate"
4. Listen to the audio translation

## 📚 Project Structure

```
bhagavadgitatranslation-dashboard/
├── backend/
│   ├── backend.py              # FastAPI server
│   ├── BhagavatGitaJsonFiles/  # Gita verses data
│   └── audio/                  # Generated audio files
├── frontend/
│   ├── BV/                     # Translation page
│   │   ├── translation.html
│   │   ├── script.js
│   │   ├── style.css
│   │   └── images/
│   ├── DASHBOARD/              # Home page
│   └── Chapters/               # Chapters listing
├── START_ALL.bat               # Start everything
├── START_BACKEND.bat           # Start backend only
├── START_FRONTEND.bat          # Start frontend only
├── INSTALL_REQUIREMENTS.bat    # Install dependencies
└── requirements.txt            # Python packages
```

## 🌐 API Endpoints

### Get Verse by Chapter and Number
```
GET /get-verse/{chapter}/{verse}?language={language}
```
Example: `http://localhost:8000/get-verse/1/1?language=english`

### Get Meaning by Sanskrit Text
```
POST /get-meaning
Body: {"shloka": "sanskrit text", "language": "english"}
```

### API Documentation
Visit: `http://localhost:8000/docs`

## 🎯 Supported Languages

### Indian Languages
English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Urdu, Punjabi, Sanskrit

### International Languages
Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, and 80+ more!

## 🔧 Requirements

- Python 3.8 or higher
- Internet connection (for translation API)
- Modern web browser (Chrome, Firefox, Edge, Safari)

## 📝 Dependencies

- **FastAPI** - Backend API framework
- **Uvicorn** - ASGI server
- **gTTS** - Google Text-to-Speech
- **mtranslate** - Translation service
- **Pydantic** - Data validation

## 🐛 Troubleshooting

### Backend not starting?
- Check if Python is installed: `python --version`
- Check if port 8000 is available
- Reinstall dependencies: `pip install -r requirements.txt`

### Frontend not loading?
- Make sure backend is running first
- Check browser console (F12) for errors
- Verify you're accessing the correct URL

### Translation not working?
- Verify backend is running: `http://localhost:8000/docs`
- Check internet connection (required for translations)
- Check backend logs for errors

### Audio not playing?
- Check browser audio permissions
- Verify audio files are being generated in `backend/audio/`
- Try a different browser

## 📖 Usage Tips

1. **Copy full shloka**: Include verse numbers and punctuation
2. **Use Devanagari script**: Sanskrit text must be in Devanagari
3. **Wait for audio**: Audio generation takes a few seconds
4. **Clear cache**: Old audio files are auto-deleted after 1 hour

## 🎨 Performance Optimizations

The application has been optimized for smooth performance:
- Reduced particle count (50% reduction)
- Optimized animations and CSS
- Resource preloading for faster page load
- Efficient canvas rendering
- Debounced resize handlers

See `frontend/BV/OPTIMIZATION_NOTES.md` for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Bhagavad Gita text and translations
- Google Text-to-Speech (gTTS)
- FastAPI framework
- Translation services

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check `QUICK_START.md` for detailed setup guide
- Review `frontend/BV/OPTIMIZATION_NOTES.md` for performance details

---

**Made with 🙏 for spiritual learning and knowledge sharing**
