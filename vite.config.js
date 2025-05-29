import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/chatbot-widget/", 
  plugins: [react()],
  define: {
    'process.env': {}
  },
  build: {
    outDir: 'docs', //runs from docs folder
    emptyOutDir: true,
    lib: {
      entry: 'src/widget.jsx',
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget',
      formats: ['iife']
    }
  }
});
