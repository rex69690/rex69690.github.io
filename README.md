# Personal Finance Dashboard

A web-based personal finance dashboard built with Express.js and Node.js that allows you to track and manage your expenses.

## Features

- Track expenses by category (food, travel, housing, utilities, entertainment, etc.)
- Add detailed descriptions and dates for each expense
- Visualize spending patterns with interactive charts
- View all expenses in a sortable table
- Edit or delete existing expenses
- Mobile-responsive design for easy use on phones
- Money management tips and advice
- Progressive Web App (PWA) capabilities for offline use
- Modern, clean UI with smooth animations

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone the repository:
```
git clone <repository-url>
cd web-finance
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/finance-dashboard
```

4. Start the application:
```
npm start
```

For development with auto-restart:
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment Options

### Option 1: Deploy to Render.com (Free)

1. Create an account on [Render](https://render.com/)
2. Create a new Web Service and connect your GitHub repository
3. Set the following:
   - Build Command: `npm install`
   - Start Command: `node app.js`
4. Add environment variables:
   - `PORT`: 10000 (Render default)
   - `MONGODB_URI`: Your MongoDB Atlas connection string
5. Click "Create Web Service"

### Option 2: Deploy to Heroku

1. Create an account on [Heroku](https://www.heroku.com/)
2. Install the Heroku CLI and login
3. In your project directory, run:
```
heroku create your-finance-dashboard
git push heroku main
```
4. Set up environment variables:
```
heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
```

### Option 3: Deploy to Railway.app

1. Create an account on [Railway](https://railway.app/)
2. Create a new project and connect your GitHub repository
3. Add a MongoDB database from the Railway dashboard
4. Railway will automatically detect your Node.js app and deploy it

## Setting Up MongoDB Atlas (Cloud Database)

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient)
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for access from anywhere)
5. Get your connection string and replace `<username>`, `<password>`, and `<dbname>` with your details
6. Use this connection string in your deployment environment variables

## Usage

### Adding Expenses
1. Click on "Add Expense" in the navigation bar
2. Select a category (food, travel, etc.)
3. Enter a description and amount
4. Select a date (defaults to today)
5. Click "Add Expense"

### Viewing Expenses
- The dashboard shows your total expenses and a breakdown by category
- Recent expenses are displayed in a table on the dashboard
- Click "View All Expenses" to see all your expenses

### Editing/Deleting Expenses
- In the expenses list, click the edit icon to modify an expense
- Click the delete icon to remove an expense (confirmation required)

### Money Management Tips
- Access helpful financial tips by clicking on the "Money Tips" link
- Learn budgeting strategies like the 50/30/20 rule
- Discover practical ways to save money and manage your finances

## Progressive Web App Features

This application can be installed on your mobile device as a Progressive Web App (PWA):

1. Open the application in your mobile browser
2. For iOS: Tap the Share button, then "Add to Home Screen"
3. For Android: Tap the menu button, then "Add to Home Screen"

Once installed, you can use the app even when offline!

## UI Features

- Modern, clean interface with card-based design
- Responsive layout that works on all devices
- Interactive charts for visualizing expenses
- Smooth animations and transitions
- Dark header with gradient effect
- Mobile-optimized with a floating action button
- Color-coded categories for easy identification

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- EJS templating
- Bootstrap 5
- Chart.js
- Font Awesome
- Progressive Web App (PWA) capabilities

## License

ISC 