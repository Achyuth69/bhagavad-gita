# Backend Setup Instructions

## The Issue
The translation page shows 404 errors because the backend API is not accessible at:
`https://bhagavad-gita-backend.onrender.com`

## Solutions

### Option 1: Run Backend Locally (Recommended for Development)

1. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

2. **Start the backend server:**
```bash
cd backend
uvicorn backend:app --reload --host 0.0.0.0 --port 8000
```

3. **Update frontend config:**
Edit `frontend/config.js` and uncomment the local URL:
```javascript
const API_BASE_URL = "http://127.0.0.1:8000";
```

4. **Test the API:**
Open browser: http://127.0.0.1:8000/docs

### Option 2: Deploy Backend to Render

1. **Push code to GitHub** (already done)

2. **Create Render account:**
   - Go to https://render.com
   - Sign up with GitHub

3. **Deploy from Dashboard:**
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`
   - Click "Apply"

4. **Get the backend URL:**
   - After deployment, copy the backend service URL
   - It will be something like: `https://bhagavad-gita-backend.onrender.com`

5. **Update frontend config:**
   - Update `frontend/config.js` with the correct URL
   - Commit and push changes

### Option 3: Use Alternative Backend URL

If you already deployed the backend with a different name:

1. Find your backend URL on Render dashboard
2. Update `frontend/config.js`:
```javascript
const API_BASE_URL = "https://YOUR-ACTUAL-BACKEND-URL.onrender.com";
```

## Testing the Translation

Once backend is running:

1. Open `frontend/BV/translation.html`
2. Paste a Sanskrit shloka (example):
```
धृतराष्ट्र उवाच |
धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||
```
3. Select language (English, Hindi, etc.)
4. Click "Translate"
5. Check browser console (F12) for logs

## Quick Start Script (Windows)

Use the provided `START_ALL.bat`:
```bash
START_ALL.bat
```

This will:
- Start the backend on port 8000
- Open the frontend in browser

## Troubleshooting

### Backend not starting?
- Check if Python is installed: `python --version`
- Check if dependencies are installed: `pip list`
- Check if port 8000 is free: `netstat -ano | findstr :8000`

### Still getting 404?
- Check backend logs for errors
- Verify the endpoint exists: http://127.0.0.1:8000/docs
- Check CORS settings in backend.py

### Translation not working?
- Open browser console (F12)
- Check for error messages
- Verify the shloka text is correct
- Try with a known shloka from Chapter 1

## Backend API Endpoints

- `POST /get-meaning` - Get translation of a shloka
  - Body: `{ "shloka": "sanskrit text", "language": "english" }`
  - Returns: `{ "text": "translation", "audio_url": "/audio/file.mp3" }`

- `GET /audio/{filename}` - Get audio file
- `GET /docs` - API documentation (Swagger UI)

## Supported Languages

English, Hindi, Telugu, Tamil, Kannada, Malayalam, Marathi, Bengali, Gujarati, Urdu, and 60+ more languages via Google Translate.
