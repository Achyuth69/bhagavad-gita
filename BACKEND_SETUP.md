# Backend Setup Guide

Complete guide for setting up the FastAPI backend server.

## Overview

The backend is a FastAPI application that provides:
- Multilingual translation API
- Text-to-speech audio generation
- Verse retrieval from Bhagavad Gita JSON files

## Requirements

- Python 3.8+
- pip package manager
- Internet connection (for translation services)

## Installation

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Verify Installation

```bash
python -c "import fastapi, gtts, mtranslate; print('All packages installed!')"
```

## Running the Backend

### Development Mode (with auto-reload)

```bash
cd backend
python -m uvicorn backend:app --reload --host 127.0.0.1 --port 8000
```

### Production Mode

```bash
cd backend
python -m uvicorn backend:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### 1. Get Meaning by Sanskrit Text

**POST** `/get-meaning`

Request body:
```json
{
  "shloka": "Sanskrit text here",
  "language": "english"
}
```

Response:
```json
{
  "text": "Translated meaning",
  "audio_url": "/audio/filename.mp3"
}
```

### 2. Get Audio File

**GET** `/audio/{filename}`

Returns the generated audio file.

### 3. API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation.

## Configuration

### Supported Languages

The backend supports 100+ languages including:
- English, Hindi, Telugu, Tamil, Kannada, Malayalam
- Spanish, French, German, Italian, Portuguese
- Chinese, Japanese, Korean, Arabic
- And many more!

### Audio Cleanup

Audio files are automatically deleted after 1 hour to save disk space.

## Data Files

The backend uses JSON files in `backend/BhagavatGitaJsonFiles/` containing:
- Sanskrit verses
- English translations
- Hindi translations
- Chapter and verse metadata

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 8000 (Linux/Mac)
lsof -ti:8000 | xargs kill -9
```

### Translation Not Working

- Check internet connection
- Verify mtranslate package is installed
- Check API logs for errors

### Audio Generation Failing

- Verify gTTS package is installed
- Check internet connection (gTTS requires internet)
- Ensure audio directory has write permissions

## Environment Variables

Optional environment variables:

```bash
# Set log level
export FASTMCP_LOG_LEVEL=ERROR

# Set custom port
export PORT=8000
```

## Testing

Test the API using curl:

```bash
curl -X POST "http://localhost:8000/get-meaning" \
  -H "Content-Type: application/json" \
  -d '{"shloka":"धृतराष्ट्र उवाच","language":"english"}'
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.

---

**Backend setup complete! 🚀**
