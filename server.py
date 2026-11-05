#!/usr/bin/env python3
"""
Nova Studio — Dedicated Backend Server (Python 3)
Receives contact inquiries and dispatches emails directly to jkingsonisrael@gmail.com

No external dependencies needed — runs with built-in Python standard libraries!
Run with:
    python3 server.py
"""

import http.server
import socketserver
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

PORT = int(os.environ.get("PORT", 5000))
RECIPIENT_EMAIL = "jkingsonisrael@gmail.com"

# SMTP Configuration (Configure via environment variables or replace below)
SMTP_SERVER = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", 587))
GMAIL_USER = os.environ.get("GMAIL_USER", "jkingsonisrael@gmail.com")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "")  # 16-character Google App Password

class NovaStudioHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable Cross-Origin Resource Sharing (CORS)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {"status": "healthy", "service": "Nova Studio Mail Gateway", "recipient": RECIPIENT_EMAIL}
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            # Serve static files (index.html, style.css, script.js)
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/contact':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)

            try:
                data = json.loads(post_data.decode('utf-8'))
                name = data.get('name', 'Anonymous')
                email = data.get('email', 'No email provided')
                service = data.get('service', 'Not specified')
                budget = data.get('budget', 'Not specified')
                message = data.get('message', '')

                # 1. Format the email
                subject = f"New Nova Studio Project Inquiry from {name}"
                body = f"""
Hello Kingson,

You have received a new project brief from the Nova Studio website:

--------------------------------------------------
CLIENT INFORMATION
--------------------------------------------------
Name:             {name}
Email:            {email}
Service Required: {service}
Estimated Budget: {budget} (₹ INR)

--------------------------------------------------
PROJECT OVERVIEW
--------------------------------------------------
{message}

--------------------------------------------------
Sent from Nova Studio Backend Gateway.
"""

                # 2. Attempt to send via Gmail SMTP if App Password is provided
                email_sent = False
                smtp_error = None

                if GMAIL_APP_PASSWORD:
                    try:
                        msg = MIMEMultipart()
                        msg['From'] = GMAIL_USER
                        msg['To'] = RECIPIENT_EMAIL
                        msg['Reply-To'] = email
                        msg['Subject'] = subject
                        msg.attach(MIMEText(body, 'plain'))

                        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
                        server.starttls()
                        server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
                        server.send_message(msg)
                        server.quit()
                        email_sent = True
                        print(f" [SUCCESS] Email dispatched to {RECIPIENT_EMAIL} for inquiry from {name}")
                    except Exception as e:
                        smtp_error = str(e)
                        print(f" [SMTP ERROR] Could not send via Gmail SMTP: {e}")
                else:
                    print(f" [LOG] GMAIL_APP_PASSWORD not set. Logging inquiry to console:\n{body}")

                # 3. Respond with JSON
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                
                res = {
                    "success": True,
                    "message": f"Inquiry for {name} processed successfully.",
                    "email_dispatched": email_sent,
                    "recipient": RECIPIENT_EMAIL
                }
                if smtp_error:
                    res["smtp_notice"] = f"SMTP configuration notice: {smtp_error}. Check BACKEND.md to configure Google App Password."

                self.wfile.write(json.dumps(res).encode('utf-8'))

            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    print("=" * 60)
    print("  NOVA STUDIO — BACKEND API SERVER")
    print(f"  Target Recipient: {RECIPIENT_EMAIL}")
    print(f"  Listening on:     http://localhost:{PORT}")
    print(f"  API Health check: http://localhost:{PORT}/api/health")
    print(f"  Contact Endpoint: http://localhost:{PORT}/api/contact")
    print("=" * 60)
    
    with socketserver.TCPServer(("", PORT), NovaStudioHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
