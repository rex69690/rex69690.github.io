# Deployment Guide for Personal Finance Dashboard

This guide provides detailed instructions for deploying your Personal Finance Dashboard application to various platforms.

## Why GitHub Pages Won't Work

GitHub Pages is designed to host static websites only. It cannot:
- Run Node.js server code
- Execute Express.js routes
- Connect to MongoDB databases
- Process server-side logic

When you deploy a Node.js application to GitHub Pages, only the static files (HTML, CSS, JS) are served, but the server-side functionality doesn't work.

## Recommended Deployment Options

### 1. Vercel (Easiest Option)

Vercel is specifically designed for Node.js applications and offers a generous free tier.

#### Step-by-Step Deployment:

1. **Create a MongoDB Atlas Database**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Set up a database user with password
   - Get your connection string from "Connect" > "Connect your application"

2. **Deploy Using the Included Script**:
   - Run the `deploy-to-vercel.bat` script included in this repository
   - Follow the prompts to log in and configure your deployment
   - When asked for environment variables, add:
     - `MONGODB_URI`: Your MongoDB Atlas connection string

3. **Manual Deployment**:
   - Install Vercel CLI: `npm install -g vercel`
   - Run `vercel login` and follow the prompts
   - In your project directory, run `vercel`
   - Configure as prompted

4. **Verify Deployment**:
   - Vercel will provide a URL for your deployed application
   - Test all functionality to ensure it works correctly

### 2. Render.com

Render is another excellent platform for Node.js applications with a free tier.

#### Step-by-Step Deployment:

1. **Create a Render Account**:
   - Sign up at [Render](https://render.com/)

2. **Create a New Web Service**:
   - Click "New" > "Web Service"
   - Connect your GitHub repository
   - Configure your service:
     - Name: `finance-dashboard` (or your preferred name)
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `node app.js`
     - Add environment variables:
       - `MONGODB_URI`: Your MongoDB Atlas connection string

3. **Deploy Your Service**:
   - Click "Create Web Service"
   - Wait for the deployment to complete

### 3. Heroku

Heroku is a popular platform for Node.js applications but requires a credit card for verification even for the free tier.

#### Step-by-Step Deployment:

1. **Create a Heroku Account**:
   - Sign up at [Heroku](https://www.heroku.com/)
   - Install the Heroku CLI: `npm install -g heroku`

2. **Prepare Your Application**:
   - Make sure you have a `Procfile` (already included in this repo)
   - Ensure your app listens on the port provided by Heroku: `process.env.PORT`

3. **Deploy Your Application**:
   - Log in to Heroku: `heroku login`
   - Create a new Heroku app: `heroku create finance-dashboard`
   - Set environment variables:
     - `heroku config:set MONGODB_URI=your_mongodb_connection_string`
   - Deploy your code: `git push heroku main`

4. **Open Your Application**:
   - Run `heroku open` to view your deployed application

### 4. Railway

Railway is a newer platform with an excellent developer experience and a free tier.

#### Step-by-Step Deployment:

1. **Create a Railway Account**:
   - Sign up at [Railway](https://railway.app/)

2. **Create a New Project**:
   - Click "New Project" > "GitHub Repo"
   - Select your repository
   - Configure your project:
     - Add environment variables:
       - `MONGODB_URI`: Your MongoDB Atlas connection string
     - Set the start command: `node app.js`

3. **Deploy Your Project**:
   - Railway will automatically deploy your application
   - You can view logs and monitor your deployment from the dashboard

## Troubleshooting Deployment Issues

### Common Issues:

1. **MongoDB Connection Errors**:
   - Ensure your MongoDB Atlas connection string is correct
   - Make sure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (allow from anywhere)
   - Check that your database user has the correct permissions

2. **Application Crashes on Startup**:
   - Check the logs on your deployment platform
   - Ensure all dependencies are listed in `package.json`
   - Verify that your `main` file is correctly specified in `package.json`

3. **Environment Variables Not Working**:
   - Double-check that you've set all required environment variables
   - Ensure variable names match exactly what your code expects

4. **Port Binding Issues**:
   - Make sure your app listens on the port provided by the platform: `process.env.PORT`

## Need Help?

If you encounter issues with deployment, check the documentation for your chosen platform:

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Heroku Documentation](https://devcenter.heroku.com/categories/nodejs-support)
- [Railway Documentation](https://docs.railway.app/) 