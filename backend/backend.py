from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from gtts import gTTS
from mtranslate import translate
import json
import os
import re
import unicodedata
import uuid
import time
import threading

# ---------------- CONFIG ----------------

DATA_DIR = "BhagavatGitaJsonFiles"
AUDIO_DIR = "audio"

LANG_CODES = {
    "afrikaans": "af",
    "albanian": "sq",
    "amharic": "am",
    "arabic": "ar",
    "armenian": "hy",
    "azerbaijani": "az",
    "basque": "eu",
    "belarusian": "be",
    "bengali": "bn",
    "bosnian": "bs",
    "bulgarian": "bg",
    "catalan": "ca",
    "cebuano": "ceb",
    "chinese_simplified": "zh-cn",
    "chinese_traditional": "zh-tw",
    "corsican": "co",
    "croatian": "hr",
    "czech": "cs",
    "danish": "da",
    "dutch": "nl",
    "english": "en",
    "esperanto": "eo",
    "estonian": "et",
    "filipino": "tl",
    "finnish": "fi",
    "french": "fr",
    "frisian": "fy",
    "galician": "gl",
    "georgian": "ka",
    "german": "de",
    "greek": "el",
    "gujarati": "gu",
    "haitian_creole": "ht",
    "hausa": "ha",
    "hawaiian": "haw",
    "hebrew": "he",
    "hindi": "hi",
    "hungarian": "hu",
    "icelandic": "is",
    "igbo": "ig",
    "indonesian": "id",
    "irish": "ga",
    "italian": "it",
    "japanese": "ja",
    "javanese": "jw",
    "kannada": "kn",
    "kazakh": "kk",
    "khmer": "km",
    "kinyarwanda": "rw",
    "korean": "ko",
    "kurdish": "ku",
    "kyrgyz": "ky",
    "lao": "lo",
    "latin": "la",
    "latvian": "lv",
    "lithuanian": "lt",
    "luxembourgish": "lb",
    "macedonian": "mk",
    "malagasy": "mg",
    "malay": "ms",
    "malayalam": "ml",
    "marathi": "mr",
    "mongolian": "mn",
    "myanmar": "my",
    "nepali": "ne",
    "norwegian": "no",
    "pashto": "ps",
    "persian": "fa",
    "polish": "pl",
    "portuguese": "pt",
    "punjabi": "pa",
    "romanian": "ro",
    "russian": "ru",
    "serbian": "sr",
    "sinhala": "si",
    "slovak": "sk",
    "slovenian": "sl",
    "somali": "so",
    "spanish": "es",
    "sundanese": "su",
    "swahili": "sw",
    "swedish": "sv",
    "tajik": "tg",
    "tamil": "ta",
    "telugu": "te",
    "thai": "th",
    "turkish": "tr",
    "ukrainian": "uk",
    "urdu": "ur",
    "uyghur": "ug",
    "uzbek": "uz",
    "vietnamese": "vi",
    "welsh": "cy",
    "xhosa": "xh",
    "yiddish": "yi",
    "yoruba": "yo",
    "zulu": "zu"
}

os.makedirs(AUDIO_DIR, exist_ok=True)

# ---------------- APP ----------------

app = FastAPI(
    title="Bhagavad Gita Retrieval API",
    description="Multilingual Bhagavad Gita explanation system",
    version="1.0"
)

import time
import threading

def cleanup_audio():

    while True:

        now = time.time()

        for file in os.listdir(AUDIO_DIR):

            path = os.path.join(AUDIO_DIR, file)

            if os.path.isfile(path):

                file_age = now - os.path.getmtime(path)

                # delete files older than 1 hour
                if file_age > 3600:
                    try:
                        os.remove(path)
                        print("Deleted old audio:", file)
                    except:
                        pass

        time.sleep(3600)  # run every 1 hour

cleanup_thread = threading.Thread(target=cleanup_audio, daemon=True)
cleanup_thread.start()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- REQUEST SCHEMA ----------------

class ShlokaRequest(BaseModel):
    shloka: str
    language: str

# ---------------- UTILITIES ----------------

def normalize(text: str):
    text = unicodedata.normalize("NFKD", text)
    text = text.replace("\n", " ")
    text = re.sub(r"[॥।०-९0-9\-]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def load_verses():
    verses = []
    for file in os.listdir(DATA_DIR):
        if file.endswith(".json"):
            with open(os.path.join(DATA_DIR, file), encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, list):
                    verses.extend(data)
                else:
                    verses.append(data)
    return verses

VERSES = load_verses()

# ---------------- API ----------------

@app.post("/get-meaning")
def get_meaning(payload: ShlokaRequest):

    shloka = payload.shloka.strip()
    language = payload.language.lower()

    if language not in LANG_CODES:
        return {"error": "Unsupported language"}

    norm_input = normalize(shloka)

    for verse in VERSES:

        if normalize(verse["sanskrit"]["text"]) == norm_input:

            # Translation
            if language == "english":
                text = verse["translations"]["english"]["text"]

            elif language == "hindi":
                text = verse["translations"]["hindi"]["text"]

            else:
                text = translate(
                    verse["translations"]["english"]["text"],
                    LANG_CODES[language]
                )

            # Generate audio
            filename = f"{uuid.uuid4()}.mp3"
            filepath = os.path.join(AUDIO_DIR, filename)

            try:
                tts = gTTS(text=text, lang=LANG_CODES[language])
                tts.save(filepath)
                audio_url = f"/audio/{filename}"
            except:
                audio_url = None

            return {
                "text": text,
                "audio_url": audio_url
            }

    return {"error": "Shloka not found"}

# ---------------- AUDIO ROUTE ----------------

@app.get("/audio/{filename}")
def get_audio(filename: str):
    path = os.path.join(AUDIO_DIR, filename)
    return FileResponse(path, media_type="audio/mpeg")