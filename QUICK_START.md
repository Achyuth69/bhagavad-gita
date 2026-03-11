# 🚀 Quick Start Guide

Get the Bhagavad Gita Translation Dashboard running in 5 minutes!

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser

## Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 2: Start Backend Server

```bash
cd backend
python -m uvicorn backend:app --reload --host 127.0.0.1 --port 8000
```

The backend will be available at: `http://127.0.0.1:8000`

## Step 3: Start Frontend Server

Open a new terminal:

```bash
cd frontend
python -m http.server 5500
```

The frontend will be available at: `http://localhost:5500`

## Step 4: Open in Browser

Navigate to: `http://localhost:5500/Dashboard/index.html`

## Quick Start (Windows)

Double-click `START_ALL.bat` to start both servers automatically!

## Troubleshooting

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

## Next Steps

- Read the full [README.md](README.md) for detailed information
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Explore the API documentation at `http://localhost:8000/docs`

---

**Happy translating! 🙏**
