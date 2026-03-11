# 🚀 Quick Start Guide - Bhagavad Gita Translation

## ⚠️ IMPORTANT: The Translation Page Needs Backend Running!

The translation page shows **404 errors** because the backend API is not running.

## ✅ Solution: Start the Backend Locally

### Method 1: Use START_ALL.bat (Easiest)

1. **Double-click** `START_ALL.bat`
2. Wait for both servers to start
3. Browser will open automatically
4. Go to Translation page and test!

### Method 2: Manual Start

1. **Install dependencies** (first time only):
```bash
pip install -r requirements.txt
```

2. **Start backend**:
```bash
cd backend
uvicorn backend:app --reload --host 0.0.0.0 --port 8000
```

3. **Open frontend**:
   - Open `frontend/Dashboard/index.html` in browser
   - Or use Live Server in VS Code

### Method 3: Test Backend First

1. **Open** `TEST_BACKEND.html` in browser
2. **Follow instructions** on the page
3. **Click "Test API Connection"** button
4. If ✅ green, backend is working!
5. Then open translation page

## 📝 How to Use Translation Page

1. **Make sure backend is running** (see above)
2. **Open** `frontend/BV/translation.html`
3. **Paste a Sanskrit shloka**, for example:
```
धृतराष्ट्र उवाच |
धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||
```
4. **Select language** (English, Hindi, etc.)
5. **Click "Translate"**
6. **See the translation** appear with animation!

## 🔍 Troubleshooting

### Problem: "Backend NOT Running" error

**Solution:**
- Make sure you started the backend (see above)
- Check if port 8000 is free
- Look for errors in the backend terminal

### Problem: "404 Not Found" error

**Solution:**
- Backend is running but API endpoint is wrong
- Check `frontend/config.js` - should be `http://127.0.0.1:8000`
- Restart the backend

### Problem: Translation not working

**Solution:**
- Open browser console (F12)
- Check for error messages
- Verify the shloka text is correct
- Try with the example shloka above

### Problem: Dependencies not installed

**Solution:**
```bash
pip install fastapi uvicorn gtts mtranslate python-multipart aiofiles
```

## 📂 Project Structure

```
bhagavadgitatranslation/
├── backend/
│   ├── backend.py          ← Backend API
│   └── BhagavatGitaJsonFiles/  ← Verse data
├── frontend/
│   ├── BV/
│   │   └── translation.html    ← Translation page
│   ├── Dashboard/
│   │   └── index.html          ← Home page
│   └── config.js               ← API configuration
├── START_ALL.bat               ← Quick start script
├── TEST_BACKEND.html           ← Backend test page
└── requirements.txt            ← Python dependencies
```

## 🌐 API Endpoints

- **POST** `/get-meaning` - Get translation
  - Body: `{ "shloka": "sanskrit text", "language": "english" }`
  - Returns: `{ "text": "translation", "audio_url": "/audio/file.mp3" }`

- **GET** `/docs` - API documentation (Swagger UI)
  - URL: http://127.0.0.1:8000/docs

- **GET** `/audio/{filename}` - Get audio file

## 💡 Tips

1. **Always start backend first** before opening translation page
2. **Use TEST_BACKEND.html** to verify backend is working
3. **Check browser console** (F12) for detailed error messages
4. **Keep backend terminal open** to see API logs
5. **Use START_ALL.bat** for easiest setup

## 🎯 Current Configuration

- **Backend URL**: `http://127.0.0.1:8000` (local)
- **Frontend**: Open HTML files directly in browser
- **Port**: 8000 (backend), 5500 (frontend with START_ALL.bat)

## 📞 Need Help?

1. Open `TEST_BACKEND.html` - it will show you exactly what's wrong
2. Check `BACKEND_SETUP.md` for detailed instructions
3. Look at browser console (F12) for error messages
4. Check backend terminal for API logs

---

**Remember**: The translation page REQUIRES the backend to be running. Always start the backend first!
