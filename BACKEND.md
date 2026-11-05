# Nova Studio — Backend Architecture & Email Dispatch Setup

This guide provides the complete backend details for **Nova Studio**, ensuring every client project inquiry is reliably dispatched and received in your primary inbox: **`jkingsonisrael@gmail.com`**.

---

## 1. Why Did the Previous Form Not Reach Your Gmail?

When you tested the form on the live site, you saw:
> *"Inquiry Ready for Direct Dispatch! Thank you, kingson. Click below to send your prepared brief directly to jkingsonisrael@gmail.com"*

Here is the exact technical explanation:
1. **GitHub Pages is a 100% Static Host**: GitHub Pages only serves static `.html`, `.css`, and `.js` files. It has no server runtime to execute backend email dispatch code.
2. **Third-Party FormSubmit Outage**: The third-party service (`formsubmit.co`) previously configured on static sites encountered Cloudflare `HTTP 522 (Connection Timed Out)` errors. When the API call timed out, the site fell back to client-side dispatch.
3. **Desktop Mail App Requirement for `mailto:`**: When relying solely on native `mailto:` links, the operating system attempts to open a desktop client (such as Apple Mail or Outlook). If an email account is not configured in that local desktop client, no email is sent.

---

## 2. The Solution: Dual-Engine Delivery

To ensure 100% deliverability both locally and on production, Nova Studio now features a **dual-engine architecture**:

```
[ Client submits Project Brief ]
               │
               ▼
   Is Backend API reachable?
        ├──► YES: Dispatched silently via Gmail SMTP to jkingsonisrael@gmail.com
        │         (Requires server.py or server.js running locally or deployed)
        │
        └──► NO (Static GitHub Pages): 
                  1. Formats complete project brief with INR budget (₹)
                  2. Triggers direct Gmail Web Compose (mail.google.com)
                  3. Displays 1-click dispatch buttons:
                     • ✉️ Send via Gmail Web (Opens in browser)
                     • 📧 Open Default Mail Client
                     • 💬 Send via WhatsApp
```

---

## 3. Dedicated Backend Options

Two production-ready backends have been included in your workspace:

### Option A: Python 3 Backend (`server.py`) — Recommended for Mac
- **Zero dependencies** — uses Python's built-in `http.server`, `smtplib`, and `email` packages.
- Pre-installed on macOS (`/usr/bin/python3`).

#### How to Run:
```bash
# 1. (Optional) Set your 16-character Google App Password for live SMTP dispatch
export GMAIL_USER="jkingsonisrael@gmail.com"
export GMAIL_APP_PASSWORD="xxxx xxxx xxxx xxxx"

# 2. Start the server
python3 server.py
```
- Open `http://localhost:5000` in your browser.
- Submitting the contact form will now deliver emails directly into your Gmail inbox via Google's official SMTP servers (`smtp.gmail.com:587`).
- If `GMAIL_APP_PASSWORD` is not set, the server logs every incoming brief directly to the terminal.

---

### Option B: Node.js Express Backend (`server.js`)
If you prefer running on Node.js:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your Google App Password

# 3. Start the server
npm start
```

---

## 4. How to Generate a Google App Password (60 Seconds)

To allow the Python or Node backend to deliver emails directly through Google's SMTP servers:

1. Go to your **[Google Account Security Settings](https://myaccount.google.com/security)**.
2. Ensure **2-Step Verification** is turned ON.
3. In the search bar at the top of the Google Account page, search for **App passwords**.
4. Create a new app password:
   - App Name: `Nova Studio Portfolio`
5. Google will display a **16-letter code** (e.g. `abcd efgh ijkl mnop`).
6. Copy this code and set it as your `GMAIL_APP_PASSWORD`:
   ```bash
   export GMAIL_APP_PASSWORD="abcdefghijklmnop"
   ```

---

## 5. Free Cloud Deployment (24/7 Live Backend)

To have your backend running 24/7 on the internet for free so GitHub Pages can call it:

### Deploying to Render.com (Free Tier):
1. Create a free account at [render.com](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository: `https://github.com/kingson-starboy/unknow---uk`.
4. Configure settings:
   - **Environment**: `Python 3`
   - **Build Command**: `# none needed`
   - **Start Command**: `python3 server.py`
5. In **Environment Variables**, add:
   - `GMAIL_USER`: `jkingsonisrael@gmail.com`
   - `GMAIL_APP_PASSWORD`: `your-16-character-password`
   - `PORT`: `10000`
6. Click **Deploy Web Service**.
7. Render will provide a free HTTPS URL (e.g., `https://nova-studio-backend.onrender.com`).
8. In `script.js`, update the backend endpoint array:
   ```javascript
   const backendEndpoints = [
     'https://your-service-name.onrender.com/api/contact',
     '/api/contact'
   ];
   ```

---

## 6. Currency Updates to Indian Rupees (₹ INR)

All currency displays across the entire website have been updated to **Indian Rupees (₹)**:
- **Project Balances**: `₹8,42,300` on FinTech cards, `₹135 Cr ARR` in AI models, `₹130 Cr` Series A funding, `₹330 Cr` transaction volume.
- **Scope Estimator**:
  - Full-Stack Web App: `₹1,50,000` base
  - Marketing Platform & Brand: `₹60,000` base
  - AI & Agentic Solution: `₹2,00,000` base
  - Add-on feature chips: `+₹25k`, `+₹30k`, `+₹35k`, `+₹25k`
  - Total ballpark preview: `₹1,75,000 – ₹2,20,000` (dynamic Indian numbering format: `1,75,000`)
- **Contact Form Budget Dropdown**:
  - `₹25,000 – ₹75,000`
  - `₹75,000 – ₹1,50,000`
  - `₹1,50,000 – ₹3,50,000`
  - `₹3,50,000+`
