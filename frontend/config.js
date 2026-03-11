// API Configuration
// Update this URL after deploying your backend to Render

// PRODUCTION (Render deployment) - UPDATE THIS WITH YOUR ACTUAL BACKEND URL
// const API_BASE_URL = "https://bhagavad-gita-backend.onrender.com";

// LOCAL DEVELOPMENT - Use this for testing locally
const API_BASE_URL = "http://127.0.0.1:8000";

// Check if API is available
async function checkAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/docs`);
        if (response.ok) {
            console.log('✅ Backend API is available at:', API_BASE_URL);
            return true;
        }
    } catch (err) {
        console.error('❌ Backend API is not available at:', API_BASE_URL);
        console.log('💡 To start local backend, run: cd backend && uvicorn backend:app --reload');
        return false;
    }
}

// Auto-check on page load
if (typeof window !== 'undefined') {
    checkAPI();
}

