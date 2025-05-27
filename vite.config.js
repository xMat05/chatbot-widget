import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // 🛠️ shim process.env to an empty object
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
