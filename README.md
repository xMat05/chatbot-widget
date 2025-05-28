# Locail Chatbot Widget 🤖💬  
An embeddable AI assistant widget for websites – powered by OpenAI and n8n workflows.

---

## 🔧 Overview

This repository contains a lightweight chatbot widget built with React and Vite, designed to be embedded on any website via a single `<script>` tag. It is customizable via data attributes and requires no framework dependencies on the client side.

---

## 🚀 How to Use

### Embed the Script

Add the following to your website's `<body>`:

```html
<script 
  src="https://xmat05.github.io/chatbot-widget/chatbot-widget.iife.js"
  data-business-id="demo"
  data-primary-color="#34aebd"
  data-secondary-color="#ffffff"
  data-chat-background="#f9f9f9"
  data-position="right"         <!-- left | center | right -->
  data-design="rounded"         <!-- rounded | square -->
  async>
</script>
```

---

### Script Tag Options

| Attribute              | Description                                      |
|------------------------|--------------------------------------------------|
| `data-business-id`     | Your unique business ID                          |
| `data-primary-color`   | Header and button background color               |
| `data-secondary-color` | Text and icon color inside the chat              |
| `data-chat-background` | Main background color of the chat window         |
| `data-position`        | Button alignment: `left`, `center`, `right`      |
| `data-design`          | Shape of the widget: `rounded` or `square`       |

---

## 🧩 Features

- Configurable via script tag attributes
- Chat window with top drag-resize functionality
- Auto-typing indicator with delayed assistant response
- One-line embeddable deployment (IIFE format)
- Fully responsive and lightweight

---

## ⚙️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Cloudflare Workers (proxy) → n8n (workflow logic)
- **Export Format**: IIFE (Immediately Invoked Function Expression)

---

## 📂 Folder Structure

```
├── src/
│   ├── Chatbot.jsx        # Core widget component
│   ├── widget.jsx         # Script entry point (reads script attributes)
│   └── index.css          # Optional base styles
├── dist/                  # Production bundle (chatbot-widget.iife.js)
├── public/
├── index.html             # Testing sandbox for development
├── vite.config.js         # Vite config for IIFE export
├── README.md
```

---

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build IIFE bundle
npm run build

# Optional: Deploy to GitHub Pages
npm run deploy
```

---

## 📦 Build Output

The build will output the embeddable script at:

```
dist/chatbot-widget.iife.js
```

Use this as the `src` in your script tag.

---
