import React from 'react';
import { createRoot } from 'react-dom/client';
import Chatbot from './Chatbot.jsx';

const script = document.currentScript;
const businessId = script?.dataset?.businessId || "demo";
const primaryColor = script?.dataset?.primaryColor || "#0D1B2A";
const secondaryColor = script?.dataset?.secondaryColor || "#ffffff";
const chatBackground = script?.dataset?.chatBackground || "#ffffff";
const position = script?.dataset?.position || "right";
const design = script?.dataset?.design || "rounded";

const container = document.createElement('div');
container.id = "chatbot-widget-container";
document.body.appendChild(container);

const shadow = container.attachShadow({ mode: 'open' });
const shadowDiv = document.createElement('div');
shadow.appendChild(shadowDiv);

const root = createRoot(shadowDiv);
root.render(
  <Chatbot
    businessId={businessId}
    primaryColor={primaryColor}
    secondaryColor={secondaryColor}
    chatBackground={chatBackground}
    position={position}
    design={design}
  />
);
