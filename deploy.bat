@echo off
title SOHAM GURAV - Automated Portfolio Deployment
color 0b
cls
echo ======================================================================
echo           SOHAM GURAV PERSONAL PORTFOLIO - AUTOMATED DEPLOYMENT
echo ======================================================================
echo.
echo Target Project: C:\Users\SOHAM\.gemini\antigravity\scratch
echo Production Directory: dist (Pre-built with full SEO and Schema)
echo.
echo Choose your preferred automated deployment method:
echo.
echo   [1] Vercel CLI (Recommended - 1-Click Browser Login, Live in 30s)
echo   [2] Netlify CLI (Direct Production Upload of dist, Live in 20s)
echo   [3] Push Code to GitHub Repository
echo   [4] Rebuild Production Bundle (npm run build)
echo   [0] Exit
echo.
set /p choice="Enter choice [1, 2, 3, 4, or 0]: "

if "%choice%"=="1" goto VERCEL
if "%choice%"=="2" goto NETLIFY
if "%choice%"=="3" goto GITHUB
if "%choice%"=="4" goto REBUILD
if "%choice%"=="0" goto EXIT
goto INVALID

:VERCEL
cls
echo ======================================================================
echo           DEPLOYING TO VERCEL VIA VERCEL CLI
echo ======================================================================
echo.
echo Launching Vercel CLI...
echo If this is your first time, a browser window will open to authenticate.
echo Simply click "Log in" or "Continue with GitHub".
echo.
cd /d "C:\Users\SOHAM\.gemini\antigravity\scratch"
call npx --yes vercel --prod
echo.
echo ======================================================================
echo Deployment process finished!
echo If your public URL is displayed above, copy it to test on your phone.
echo ======================================================================
pause
goto EXIT

:NETLIFY
cls
echo ======================================================================
echo           DEPLOYING TO NETLIFY VIA NETLIFY CLI
echo ======================================================================
echo.
echo Uploading pre-built dist folder directly to Netlify...
echo If prompted, your browser will open to grant permission.
echo.
cd /d "C:\Users\SOHAM\.gemini\antigravity\scratch"
call npx --yes netlify-cli deploy --prod --dir=dist
echo.
echo ======================================================================
echo Deployment process finished!
echo Check the Live Website URL printed above.
echo ======================================================================
pause
goto EXIT

:GITHUB
cls
echo ======================================================================
echo           PUSHING PORTFOLIO TO GITHUB
echo ======================================================================
echo.
set /p ghuser="Enter your GitHub username (e.g. guravsoham8855 or Soham-Gurav): "
if "%ghuser%"=="" set ghuser=guravsoham8855

cd /d "C:\Users\SOHAM\.gemini\antigravity\scratch"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/%ghuser%/portfolio.git
echo Remote set to: https://github.com/%ghuser%/portfolio.git
echo Pushing to branch main...
git push -u origin main
echo.
if %errorlevel% neq 0 (
    echo Note: If the push failed, please make sure the repository 'portfolio'
    echo is created at https://github.com/new
) else (
    echo Successfully pushed to GitHub!
)
pause
goto EXIT

:REBUILD
cls
echo Rebuilding production bundle...
cd /d "C:\Users\SOHAM\.gemini\antigravity\scratch"
call npm run build
echo Build completed!
pause
goto EXIT

:INVALID
echo Invalid choice. Exiting.
pause

:EXIT
