# Nova Studio — Digital Product & Experience Studio

A modern, responsive, high-performance website built with semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+). Designed with a dark navy background, vibrant purple accents, and electric teal highlights.

![Nova Studio Preview Banner](https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80)

---

## 🚀 Overview

**Nova Studio** is an architectural digital product and creative engineering studio template. It serves as a ready-to-deploy frontend foundation for agencies, creative studios, freelance developers, or high-velocity engineering teams.

### 🎨 Design System & Palette

| Token | Hex / Value | Usage |
|---|---|---|
| **Background Darker** | `#060911` | Deep base, footer, contrast sections |
| **Background Primary** | `#080C16` | Main dark navy backdrop |
| **Surface Dark** | `#0D1322` | Cards, modals, drawers |
| **Card Elevate** | `#12192B` | Hover states, interactive panels |
| **Purple Accent** | `#8B5CF6` / `#7C3AED` | Primary buttons, brand glows, icons |
| **Teal Highlight** | `#00F2FE` / `#14B8A6` | Callouts, indicators, active indicators |
| **Text Primary** | `#F8FAFC` | High-contrast headings and key content |
| **Text Secondary** | `#CBD5E1` | Body copy and descriptions |

---

## ✨ Features & Architecture

1. **Responsive Navigation Bar**:
   - Fixed header with frosted glass backdrop filter (`backdrop-filter: blur(14px)`).
   - Dynamic shadow & border transition on scroll.
   - Interactive mobile drawer menu with accessibility attributes (`aria-expanded`, `aria-hidden`) and body scroll lock.
   - Active section highlighting powered by `IntersectionObserver`.

2. **Hero Section**:
   - Bold typography with multi-stop gradient text.
   - Availability status pill with glowing pulse animation.
   - Key social proof metrics bar.
   - Interactive code window mockup reflecting technical depth and craft.

3. **Core Capabilities / Services**:
   - 6 detailed capability cards with custom vector icons.
   - Responsive CSS Grid layout with hover elevation and glow effects.
   - Feature check-lists for each discipline.

4. **Projects Showcase with Live Filtering**:
   - Multi-category filter buttons (`All`, `Web Apps`, `Branding`, `SaaS & AI`).
   - Pure CSS/SVG device mockups (telemetry dashboard, audio brand visual, AI conversation prompt, fintech card).
   - Interactive Quick-View Case Study modal dialog with project metadata, challenges, tech stack, and key metrics.

5. **About Studio & Culture**:
   - Studio philosophy, values breakdown, and key performance metric cards.
   - Highlighting in-house craft, interaction budgets (<30ms), and rapid MVP delivery cycles.

6. **Process & Methodology**:
   - 4-phase structured timeline: Discovery & Strategy, Design & Prototyping, Agile Engineering, and Launch & Scale.

7. **Interactive FAQ Accordion**:
   - Expandable panels with accessible ARIA states.
   - Smooth height transitions and rotating indicator icons.

8. **Contact Section & Client-Side Validation**:
   - Form fields: Full Name, Work Email, Capability required, Estimated Budget, Project Message with real-time character counter.
   - Comprehensive regex-based email format validation and length checks.
   - Real-time error clearance upon user typing.
   - Visual success alert with input summary.
   - Floating toast notification system.
   - Prominent developer guidance note explaining how to connect production backends.

9. **Professional Footer**:
   - Studio overview, quick links, capabilities index, newsletter form validation, social channels, and copyright notice.

---

## 📁 File Structure

```text
nova-studio/
├── index.html       # Semantic HTML5 structure and accessible markup
├── style.css        # Modular CSS custom properties, responsive grid, animations
├── script.js        # Vanilla JS logic (nav, filters, modal, form validation, toast)
├── .gitignore       # Standard git ignore definitions
└── README.md        # Comprehensive documentation and setup guide
```

---

## 💻 How to Run Locally

Because the project is written in vanilla HTML, CSS, and JavaScript, it requires **zero build steps or compilation**.

### Option 1: Direct in Browser
Double-click `index.html` or drag it into any modern web browser (Chrome, Safari, Firefox, Edge, Brave).

### Option 2: Python Built-in Server (Recommended)
Open your terminal in the project directory:

```bash
# Python 3
python3 -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080) in your browser.

### Option 3: Node.js (npx serve)
```bash
npx serve .
```

### Option 4: VS Code / IDE Live Server
If using VS Code, install the **Live Server** extension, right-click `index.html`, and select **"Open with Live Server"**.

---

## 🔌 Connecting the Contact Form to a Backend

The contact form includes client-side validation, field checks, error indicators, and a success feedback state. In production, connect the form to an actual mail delivery service or backend endpoint:

### Method A: Formspree (No-code / Fast)
1. Sign up at [formspree.io](https://formspree.io) and create a form.
2. Update the `<form>` opening tag in `index.html`:
   ```html
   <form id="contactForm" class="contact-form" action="https://formspree.io/f/{YOUR_FORM_ID}" method="POST">
   ```
3. In `script.js`, replace the `setTimeout` mock in `contactForm.addEventListener('submit', ...)` with:
   ```javascript
   const formData = new FormData(contactForm);
   fetch('https://formspree.io/f/{YOUR_FORM_ID}', {
     method: 'POST',
     body: formData,
     headers: { 'Accept': 'application/json' }
   })
   .then(response => {
     if (response.ok) {
       contactForm.reset();
       showToast('Your message has been sent!');
     }
   });
   ```

### Method B: Resend / Cloudflare Workers / Node.js
If routing submissions through your own API route:
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: nameField.value.trim(),
    email: emailField.value.trim(),
    service: serviceField.value,
    budget: budgetField.value,
    message: messageInput.value.trim()
  })
});
```

---

## 🛠️ Git & GitHub Publishing Instructions

Follow these exact steps when you are ready to publish this project to your GitHub repository:

### 1. Initialize Git and Stage Files
```bash
# Navigate to the workspace directory if not already there
cd /path/to/project

# Check git status (repository already initialized with initial commit)
git status
```

### 2. Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com/new).
2. Choose a repository name (e.g. `nova-studio`).
3. Set visibility to **Public** or **Private**.
4. Leave "Add a README file", ".gitignore", and "Choose a license" **unchecked** (we already created them).
5. Click **Create repository**.

### 3. Connect Local Repository & Push
Copy your repository URL from GitHub and run:

```bash
# Add the remote repository
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# Rename main branch (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

---

## 🌐 Deploying to the Web

You can deploy this site in under 60 seconds using any of these static hosting platforms:

- **GitHub Pages**: Go to Repository Settings → Pages → Select `main` branch → Save.
- **Vercel**: Run `npx vercel` or connect via GitHub repository dashboard.
- **Netlify**: Drag and drop the folder into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub.
- **Cloudflare Pages**: Connect GitHub repository and deploy with build command left empty and output directory set to `/`.

---

## 📄 License & Attribution

Released under the **MIT License**. Free to use for personal and commercial projects. Created for Nova Studio.
