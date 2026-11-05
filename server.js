/**
 * Nova Studio — Dedicated Backend Server (Node.js & Express)
 * Receives contact inquiries and dispatches emails directly to jkingsonisrael@gmail.com
 *
 * Install dependencies:
 *    npm install
 * Run:
 *    npm start
 */

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'jkingsonisrael@gmail.com';

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Setup Nodemailer Transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'jkingsonisrael@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD || '' // 16-character Google App Password
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Nova Studio Backend',
    recipient: RECIPIENT_EMAIL
  });
});

// Contact dispatch endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const mailOptions = {
    from: `"Nova Studio Leads" <${process.env.GMAIL_USER || 'jkingsonisrael@gmail.com'}>`,
    to: RECIPIENT_EMAIL,
    replyTo: email,
    subject: `New Nova Studio Project Inquiry from ${name}`,
    text: `
Hello Kingson,

You have received a new project brief from the Nova Studio website:

Client Information:
- Name: ${name}
- Email: ${email}
- Service: ${service || 'Not specified'}
- Estimated Budget: ${budget || 'Not specified'} (₹ INR)

Project Overview:
${message}

---
Sent via Nova Studio Backend Gateway.
    `,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #080C16; color: #F8FAFC; border-radius: 12px;">
        <h2 style="color: #00F2FE; margin-top: 0;">New Project Inquiry</h2>
        <p style="color: #94A3B8;">A new client brief was submitted through your Nova Studio portfolio.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #121A2E; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94A3B8;">Name:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: bold; color: #F8FAFC;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94A3B8;">Email:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #00F2FE;"><a href="mailto:${email}" style="color: #00F2FE;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94A3B8;">Capability:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #F8FAFC;">${service || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); color: #94A3B8;">Budget:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: bold; color: #10B981;">${budget || 'Not specified'} (₹ INR)</td>
          </tr>
        </table>

        <div style="background: #0E1424; padding: 18px; border-radius: 8px; border-left: 4px solid #8B5CF6;">
          <h4 style="margin: 0 0 8px 0; color: #A78BFA;">Project Overview:</h4>
          <p style="margin: 0; line-height: 1.6; color: #CBD5E1; white-space: pre-wrap;">${message}</p>
        </div>

        <p style="font-size: 12px; color: #64748B; margin-top: 24px; text-align: center;">
          Nova Studio &middot; Direct Lead Notification System
        </p>
      </div>
    `
  };

  if (!process.env.GMAIL_APP_PASSWORD) {
    console.log('[LOG ONLY] GMAIL_APP_PASSWORD is not set in .env. Logging message:');
    console.log(mailOptions.text);
    return res.json({
      success: true,
      email_dispatched: false,
      message: 'Inquiry logged successfully (Configure GMAIL_APP_PASSWORD to send live email).'
    });
  }

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[SUCCESS] Email sent to ${RECIPIENT_EMAIL} from ${name}`);
    res.json({
      success: true,
      email_dispatched: true,
      message: 'Inquiry sent directly to jkingsonisrael@gmail.com'
    });
  } catch (error) {
    console.error('[ERROR] Failed to send email via SMTP:', error);
    res.status(500).json({
      success: false,
      error: 'SMTP sending error: ' + error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Nova Studio Backend running on http://localhost:${PORT}`);
  console.log(`Recipient Email: ${RECIPIENT_EMAIL}`);
});
