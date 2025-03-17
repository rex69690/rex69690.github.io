@echo off
echo ===== Deploying Finance Dashboard to Vercel =====
echo.
echo This script will help you deploy your application to Vercel.
echo Make sure you have the Vercel CLI installed.
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
) else (
    echo Vercel CLI is already installed.
)

echo.
echo Please make sure you have:
echo 1. Created a MongoDB Atlas account and database
echo 2. Have your MongoDB connection string ready
echo.
pause

REM Login to Vercel if needed
vercel whoami >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Please log in to Vercel:
    vercel login
)

echo.
echo Starting deployment...
echo.
vercel

echo.
echo If deployment was successful, your app is now live!
echo You can manage your deployment at https://vercel.com/dashboard
echo.
pause 