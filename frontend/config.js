// API Configuration
// Update this URL after deploying your backend to Render

// PRODUCTION (Render deployment)
const API_BASE_URL = "https://bhagavad-gita-backend.onrender.com";

// LOCAL DEVELOPMENT (uncomment to use local backend)
// const API_BASE_URL = "http://127.0.0.1:8000";

// Check if API is available
async function checkAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/docs`);
        if (response.ok) {
            console.log('✅ Backend API is available');
            return true;
        }
    } catch (err) {
        console.error('❌ Backend API is not available:', err.message);
        console.log('💡 To use local backend, update config.js and run: cd backend && uvicorn backend:app --reload');
        return false;
    }
}

// Auto-check on page load
if (typeof window !== 'undefined') {
    checkAPI();
}

