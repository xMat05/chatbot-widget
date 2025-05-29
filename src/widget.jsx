import React from 'react';
import ReactDOM from 'react-dom/client';
import Chatbot from './Chatbot';

function mountWidget() {
  const script = document.currentScript;
  const container = document.createElement('div');
  const shadow = container.attachShadow({ mode: 'open' });

  const widgetRoot = document.createElement('div');
  shadow.appendChild(widgetRoot);
  document.body.appendChild(container);

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
  `;
  shadow.appendChild(style);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

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
      isMobile={isMobile} // ✅ pass this prop
    />
  );
}

if (document.currentScript) {
  mountWidget();
}
