# 🚀 Deployment Guide

## Quick Deploy to Render.com (Recommended)

### Prerequisites
- GitHub account
- Your code pushed to GitHub (✅ Already done!)

### Steps:

#### 1. Sign Up on Render
- Go to https://render.com
- Click "Get Started for Free"
- Sign up with your GitHub account

#### 2. Create Backend Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `Achyuth69/bhagavad-gita`
3. Configure:
   - **Name**: `bhagavad-gita-backend`
   - **Region**: Singapore (closest to India)
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Environment**: `Docker` (IMPORTANT: Select Docker, not Python!)
   - **Dockerfile Path**: `./Dockerfile`
   - **Plan**: Free
4. Click "Create Web Service"
5. Wait 5-10 minutes for deployment
6. Copy your backend URL (e.g., `https://bhagavad-gita-backend.onrender.com`)

#### 3. Create Frontend Service
1. Click "New +" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name**: `bhagavad-gita-frontend`
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Build Command**: Leave empty
   - **Publish Directory**: `frontend`
4. Click "Create Static Site"
5. Your frontend URL: `https://bhagavad-gita-frontend.onrender.com`

#### 4. Update Frontend API URL
After backend is deployed:

1. Copy your backend URL from Render (e.g., `https://bhagavad-gita-backend.onrender.com`)
2. Open `frontend/config.js`
3. Update the `API_BASE_URL` with your backend URL:
   ```javascript
   const API_BASE_URL = "https://your-backend-url.onrender.com";
   ```
4. Commit and push:
   ```bash
   git add frontend/config.js
   git commit -m "Update API URL to production backend"
   git push origin main
   ```

#### 5. Test Your Deployment
- Visit your frontend URL
- Try translating a shloka
- Check if audio works

---

## Alternative: Railway.app

### Steps:
1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect Python
6. Add environment variable if needed
7. Deploy!

**Start Command**: `cd backend && uvicorn backend:app --host 0.0.0.0 --port $PORT`

---

## Alternative: Vercel (Frontend) + Render (Backend)

### Frontend on Vercel:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Deploy!

### Backend on Render:
Follow steps from "Create Backend Service" above

---

## Alternative: PythonAnywhere

### Steps:
1. Sign up at https://www.pythonanywhere.com
2. Create a new web app
3. Choose Python 3.10
4. Upload your code or clone from GitHub
5. Configure WSGI file for FastAPI
6. Set up static files mapping

---

## Important Notes

### Environment Variables
No sensitive keys needed for this project!

### Free Tier Limitations
- **Render Free**: 
  - Services sleep after 15 min of inactivity
  - 750 hours/month
  - Slower cold starts
  
- **Railway Free**: 
  - $5 credit/month
  - ~500 hours runtime

- **Vercel Free**: 
  - Unlimited bandwidth
  - 100GB bandwidth/month

### Production Checklist
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Frontend API calls point to production backend
- [ ] CORS configured correctly
- [ ] Test translation functionality
- [ ] Test audio generation
- [ ] Test on mobile devices

---

## Troubleshooting

### Backend Issues
- Check logs in Render dashboard
- Verify all dependencies in requirements.txt
- Check if port binding is correct ($PORT variable)

### Frontend Issues
- Verify API endpoint URL is correct
- Check browser console for CORS errors
- Ensure static files are served correctly

### Audio Not Working
- Check if gTTS is working in production
- Verify audio directory permissions
- Check if audio files are being generated

---

## Cost Estimate

### Free Tier (Recommended for Starting)
- Render: FREE (with limitations)
- Railway: FREE $5 credit/month
- Vercel: FREE

### Paid Tier (For Production)
- Render: $7/month per service
- Railway: $5/month + usage
- Vercel: $20/month (Pro)

---

## Support

If you face issues:
1. Check Render/Railway logs
2. Verify GitHub repository is up to date
3. Check CORS configuration
4. Test API endpoints directly

---

**Ready to deploy? Start with Render.com - it's the easiest!**
