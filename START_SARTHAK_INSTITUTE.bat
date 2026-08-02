@echo off
TITLE Sarthak Institute — All-in-One Coaching Management System Launcher
ECHO ===============================================================================
ECHO   SARTHAK INSTITUTE COACHING MANAGEMENT SYSTEM - FULL STACK LAUNCHER
ECHO ===============================================================================
ECHO.
IF NOT EXIST "%~dp0backend\node_modules" (
    ECHO [Setup] Installing Backend dependencies (first-time setup, please wait)...
    cmd /c "cd /d "%~dp0backend" && npm install"
)
IF NOT EXIST "%~dp0frontend\node_modules" (
    ECHO [Setup] Installing Frontend dependencies (first-time setup, please wait)...
    cmd /c "cd /d "%~dp0frontend" && npm install"
)
ECHO.
ECHO [1/3] Starting Backend API Server (Port 5000)...
start "Sarthak Institute - Backend API Server (Port 5000)" /MIN cmd /k "cd /d "%~dp0backend" && npm start"
ECHO.
ECHO [2/3] Starting Frontend React Vite Server (Port 5173)...
start "Sarthak Institute - Frontend React Website (Port 5173)" /MIN cmd /k "cd /d "%~dp0frontend" && npm run dev"
ECHO.
ECHO [3/3] Opening Sarthak Institute in your default browser...
ping 127.0.0.1 -n 5 > nul
start http://localhost:5173
ECHO.
ECHO ===============================================================================
ECHO   ALL SERVERS RUNNING ALIVE! Look for the "Demo Explorer" button in browser!
ECHO ===============================================================================
