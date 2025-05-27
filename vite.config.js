import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/chatbot-widget/", // ✅ must match your repo name for GitHub Pages
  plugins: [react()],
  define: {
    'process.env': {}, // 🛠️ shim process.env to avoid undefined errors
  },
  build: {
    lib: {
      entry: 'src/widget.jsx',
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget',
      formats: ['iife']
    }
  }
});
