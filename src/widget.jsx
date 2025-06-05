import React from 'react';
import ReactDOM from 'react-dom/client';
import Chatbot from './Chatbot';

/**
 * Dynamically mounts the chatbot widget to the DOM.
 * Called only when <script> is executed on client website.
 */
function mountWidget() {
  const script = document.currentScript; // The <script> tag invoking this file

  // Create an isolated container and attach Shadow DOM for CSS encapsulation
  const container = document.createElement('div');
  const shadow = container.attachShadow({ mode: 'open' });

   // Create a root element for React to render into and append it to Shadow DOM
  const widgetRoot = document.createElement('div');
  shadow.appendChild(widgetRoot);
  document.body.appendChild(container); // Attach container to the main DOM

  // Inject custom font and base widget styling inside Shadow DOM
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
    * {
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }
    input, textarea {
      background-color: #ffffff !important;
      color: #333 !important;
      font-size: 1rem;
      padding: 0.5rem;
      border: none;
      outline: none;
    }
    button {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
    }
    @keyframes bounce {
      0%   { transform: scale(1); }
      20%  { transform: scale(1.02); }
      50%  { transform: scale(0.98); }
      100% { transform: scale(1); }
    }
    .bounce {
      animation: bounce 0.3s ease;
    }  
    .chat-message {
      display: inline-block;
      max-width: 75%;
      white-space: pre-wrap;
      word-break: break-word;
      padding: 0.5rem;
      border-radius: 12px;
      font-weight: 400;
    }

  `;
  shadow.appendChild(style); // Scoped styles ensure no conflict with host site CSS

  // Responsive detection (useful for changing button size/font etc.)
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

   // Bootstrap the Chatbot component using React createRoot API
  const root = ReactDOM.createRoot(widgetRoot);
  root.render(
    <Chatbot
      businessId={script.dataset.businessId}
      primaryColor={script.dataset.primaryColor}
      secondaryColor={script.dataset.secondaryColor}
      chatBackground={script.dataset.chatBackground}
      position={script.dataset.position}
      design={script.dataset.design}
      headerText={script.dataset.headerText}
      buttonText={script.dataset.buttonText}
      openingMessage={script.dataset.openingMessage}
      isMobile={isMobile}
    />
  );
}

// Only run in a browser context, and when script is properly loaded
if (document.currentScript) {
  mountWidget();
}
