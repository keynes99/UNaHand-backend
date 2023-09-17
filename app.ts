// Import necessary modules and libraries
import express from 'express';
import bodyParser from 'body-parser';
import AuthRoutes from './routes/auth.routes';
import UserRoutes from './routes/user.routes';
import nodemailer from 'nodemailer';
import { authConfig } from './config';

// Create an Express application
const app = express();

// Middleware for JSON parsing, CORS, and other necessary middleware

// Set up Auth0 middleware for authentication
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Extract Auth0 configuration values from authConfig object
const { domain, clientId } = authConfig;

// Create middleware for checking JSON Web Tokens (JWTs) using Auth0
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience: clientId,
  issuer: `https://${domain}/`,
  algorithms: ['RS256'],
});

// Configure nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'your-email-service-provider', // e.g., 'Gmail'
  auth: {
    user: 'your-email@example.com', // Your email address
    pass: 'your-email-password', // Your email password
  },
});

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Register API routes for authentication and user management
app.use('/auth', AuthRoutes);
app.use('/user', UserRoutes);

// Error handling middleware (you should define this middleware to handle errors gracefully)

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
