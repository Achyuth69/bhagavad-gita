@echo off
echo ========================================
echo   Bhagavad Gita - Full Application
echo ========================================
echo.
echo Starting Backend and Frontend servers...
echo.
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:5500
echo.
echo Both servers will open in separate windows
echo Close those windows to stop the servers
echo ========================================
echo.

:: Start backend in new window
start "Bhagavad Gita Backend" cmd /k "cd backend && python -m uvicorn backend:app --reload --host 127.0.0.1 --port 8000"

:: Wait 3 seconds for backend to start
timeout /t 3 /nobreak >nul

:: Start frontend in new window
start "Bhagavad Gita Frontend" cmd /k "cd frontend && python -m http.server 5500"

:: Wait 2 seconds for frontend to start
timeout /t 2 /nobreak >nul

:: Open browser
echo Opening browser...
start http://localhost:5500/Dashboard/index.html

echo.
echo ========================================
echo   Application Started Successfully!
echo ========================================
echo.
echo Backend running at: http://127.0.0.1:8000
echo Frontend running at: http://localhost:5500
echo.
echo Close the server windows to stop the application
echo.
pause
