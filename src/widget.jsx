// src/widget.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import Chatbot from './Chatbot.jsx';

const script = document.currentScript;
const businessId = script?.dataset?.businessId || "demo";
const primaryColor = script?.dataset?.primaryColor || "#0D1B2A";

// Create mount point
const container = document.createElement('div');
container.id = "chatbot-widget-container";
document.body.appendChild(container);

// Optional Shadow DOM
const shadow = container.attachShadow({ mode: 'open' });
const shadowDiv = document.createElement('div');
shadow.appendChild(shadowDiv);

// Render chatbot
const root = createRoot(shadowDiv);
root.render(<Chatbot businessId={businessId} primaryColor={primaryColor} />);
