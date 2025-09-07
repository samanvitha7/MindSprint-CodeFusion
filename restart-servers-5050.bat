@echo off
echo =============================================
echo    Smart Waste Classifier - Port 5050
echo =============================================
echo.
echo Starting servers on port 5050...
echo.

echo [1/2] Starting Backend Server (Port 5050)...
cd /d "C:\Users\mhask\Desktop\Mind sprint 3\1\backend"
start "Backend Server" cmd /k "npm run dev"

echo.
echo [2/2] Starting Frontend Server...
cd /d "C:\Users\mhask\Desktop\Mind sprint 3\1\frontend" 
start "Frontend Server" cmd /k "npm run dev"

echo.
echo =============================================
echo Both servers are starting...
echo Backend: http://localhost:5050
echo Frontend: http://localhost:5173 (or as shown)
echo =============================================
echo.
echo Press any key to exit this script...
pause >nul
