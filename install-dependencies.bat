@echo off
echo Installing dependencies for Personal Finance Dashboard...
call npm install express body-parser ejs mongoose dotenv method-override
call npm install nodemon --save-dev
echo Dependencies installation completed!
pause 