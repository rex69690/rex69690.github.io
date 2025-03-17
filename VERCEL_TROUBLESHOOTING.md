# Vercel Deployment Troubleshooting Guide

This guide addresses common issues when deploying Node.js applications to Vercel, particularly focusing on timeout errors.

## Fixing the "504: GATEWAY_TIMEOUT" Error

If you're seeing this error:

```
504: GATEWAY_TIMEOUT
Code: FUNCTION_INVOCATION_TIMEOUT
ID: bom1::lt57v-1742212301253-227f45ab29f1
```

This means your serverless function is taking too long to execute and Vercel is terminating it. Here's how to fix it:

### Solution 1: Optimize Database Connections

The most common cause of timeouts is slow database connections. We've already updated the `app.js` file to use connection pooling and caching, which should help.

### Solution 2: Increase Function Timeout in Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on "Settings"
4. Go to "Functions"
5. Increase the "Max Duration" to 60 seconds (maximum allowed on free tier)
6. Save your changes
7. Redeploy your application

### Solution 3: Use the Optimized vercel.json

We've updated the `vercel.json` file to include:
- Increased function timeout (maxDuration: 60)
- Increased memory allocation (memory: 1024)
- Optimized routing

Make sure this file is included in your deployment.

### Solution 4: Check MongoDB Atlas Configuration

1. **Whitelist IP Addresses**:
   - In MongoDB Atlas, go to "Network Access"
   - Add `0.0.0.0/0` to allow connections from anywhere (including Vercel)

2. **Check Database User**:
   - Ensure your database user has the correct permissions
   - Verify username and password in your connection string

3. **Use Connection Pooling**:
   - In your MongoDB Atlas connection string, add `?retryWrites=true&w=majority&poolSize=10`
   - This enables connection pooling which is more efficient for serverless

### Solution 5: Add a Warm-up Function

Serverless functions can be "cold" when not used for a while. Add this to your `routes/index.js`:

```javascript
// Add this route to keep the function warm
router.get('/api/warmup', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
```

Then set up a cron job or use a service like [UptimeRobot](https://uptimerobot.com/) to ping this endpoint every 5 minutes.

### Solution 6: Split Your Application

If your application is complex, consider splitting it into smaller functions:

1. Create separate API routes for different features
2. Use Vercel's API routes feature to create multiple smaller functions
3. Keep database operations minimal and efficient

## Checking Logs for Errors

To diagnose issues, check your Vercel deployment logs:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on "Deployments"
4. Select your latest deployment
5. Click on "Functions" to see function logs
6. Look for error messages or slow operations

## Additional Optimization Tips

1. **Minimize Dependencies**:
   - Remove unused npm packages
   - Use lightweight alternatives where possible

2. **Optimize Database Queries**:
   - Add proper indexes to your MongoDB collections
   - Limit the amount of data returned in queries

3. **Use Caching**:
   - Implement Redis or Vercel's Edge Cache for frequently accessed data
   - Cache expensive computations or database results

4. **Consider Serverless Limitations**:
   - Serverless functions are best for quick, stateless operations
   - Long-running processes should be moved to background workers

5. **Use Vercel's Edge Network**:
   - Deploy static assets to Vercel's Edge Network
   - Use API routes for dynamic content

## Need More Help?

If you're still experiencing issues after trying these solutions:

1. Check [Vercel's Documentation](https://vercel.com/docs)
2. Visit [Vercel's Support Forum](https://github.com/vercel/vercel/discussions)
3. Consider upgrading to a paid plan for higher limits and better support 