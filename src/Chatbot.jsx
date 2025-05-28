// src/Chatbot.jsx
import { useState, useEffect, useRef } from 'react';

function useChatSessionId() {
  const [sessionId] = useState(() => crypto.randomUUID());
  return sessionId;
}

export default function Chatbot({ businessId = "demo", primaryColor = "#0D1B2A" }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const sessionId = useChatSessionId();

  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await fetch("https://chatbot-proxy.locail-service1.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userInput, 
          sessionId, 
          businessId 
        }),

      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "No response." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Failed to connect to chatbot." }]);
    }
  };

  return (
    <>
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            backgroundColor: primaryColor,
            color: '#fff',
            padding: '0.75rem 1rem',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            zIndex: 9999
          }}
        >
          💬 Chat
        </button>
      )}

      {isChatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          width: '300px',
          height: '400px',
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 0 12px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10000
        }}>
          <div style={{ background: primaryColor, color: '#fff', padding: '0.75rem' }}>
            <strong>Chat with us</strong>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{ float: 'right', background: 'none', border: 'none', color: 'white', fontSize: '1rem' }}
            >×</button>
          </div>

          <div style={{ flex: 1, padding: '0.5rem', overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: '0.25rem 0' }}>
                <span style={{
                  display: 'inline-block',
                  background: msg.role === "user" ? primaryColor : '#eee',
                  color: msg.role === "user" ? 'white' : '#333',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  maxWidth: '80%'
                }}>
                  {msg.content}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div>
  <div style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
    <input
      value={userInput}
      onChange={e => setUserInput(e.target.value)}
      onKeyDown={e => e.key === "Enter" && handleSend()}
      placeholder="Type a message..."
      style={{ flex: 1, padding: '0.5rem', border: 'none' }}
    />
    <button
      onClick={handleSend}
      style={{
        padding: '0.5rem',
        background: primaryColor,
        color: 'white',
        border: 'none'
      }}
    >
      ➤
    </button>
  </div>

  <div style={{
    fontSize: '0.75rem',
    textAlign: 'center',
    padding: '0.4rem 0',
    color: '#999',
    background: '#f9f9f9',
    borderTop: '1px solid #eee'
  }}>
    Powered by <strong style={{ color: '#333' }}>Locail</strong>
  </div>
</div>

        </div>
      )}
    </>
  );
}
