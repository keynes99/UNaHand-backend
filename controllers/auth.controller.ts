// Import necessary modules and libraries
import { Request, Response } from 'express';
import { authConfig } from '../config';
import nodemailer from 'nodemailer';

// Extract Auth0 configuration values from authConfig object
const { domain, clientId } = authConfig;

// Create a nodemailer transporter (this should be set up in your app.ts)
// The transporter is responsible for sending emails using your email service provider's SMTP settings.
// Replace 'your-email@example.com' and 'your-email-password' with your actual email and password.
const transporter = nodemailer.createTransport({
  service: 'your-email-service-provider', // e.g., 'Gmail'
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
});

// Function to send an email confirmation
export const sendEmailConfirmation = async (email: string, confirmationLink: string) => {
  try {
    // Create mail options for the email confirmation
    const mailOptions = {
      from: 'your-email@example.com', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Email Confirmation', // Email subject
      text: `Click the following link to confirm your email: ${confirmationLink}`, // Email body
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);

    // Return true if the email is sent successfully
    return true;
  } catch (error) {
    // If there's an error, log it and return false
    console.error(error);
    return false;
  }
};

// Function to send a password reset email
export const sendPasswordResetEmail = async (email: string, resetLink: string) => {
  try {
    // Create mail options for the password reset email
    const mailOptions = {
      from: 'your-email@example.com', // Sender's email address
      to: email, // Recipient's email address
      subject: 'Password Reset', // Email subject
      text: `Click the following link to reset your password: ${resetLink}`, // Email body
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);

    // Return true if the email is sent successfully
    return true;
  } catch (error) {
    // If there's an error, log it and return false
    console.error(error);
    return false;
  }
};
