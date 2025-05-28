import { useState, useEffect, useRef } from 'react';

function useChatSessionId() {
  const [sessionId] = useState(() => crypto.randomUUID());
  return sessionId;
}

export default function Chatbot({
  businessId = "demo",
  primaryColor = "#0D1B2A",
  secondaryColor = "#ffffff",
  chatBackground = "#ffffff",
  position = "right", // left, center, right
  design = "rounded"  // rounded, square
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatWidth, setChatWidth] = useState(300);
  const [chatHeight, setChatHeight] = useState(400);

  const sessionId = useChatSessionId();
  const chatEndRef = useRef(null);

  // Load Inter font globally (critical for embedding)
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: "user", content: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://chatbot-proxy.locail-service1.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput, sessionId, businessId }),
      });

      const data = await response.json();
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: data.reply || "No response. Please call or email."
        }]);
        setIsTyping(false);
      }, 1000);
    } catch {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "⚠️ Failed to connect to chatbot. Please call or email."
      }]);
      setIsTyping(false);
    }
  };

  const startResize = (e, direction) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = chatWidth;
    const startHeight = chatHeight;

    const doResize = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      if (direction === 'top-left') {
        setChatWidth(Math.max(250, startWidth - deltaX));
        setChatHeight(Math.max(300, startHeight - deltaY));
      } else if (direction === 'top-right') {
        setChatWidth(Math.max(250, startWidth + deltaX));
        setChatHeight(Math.max(300, startHeight - deltaY));
      } else if (direction === 'top-middle') {
        setChatHeight(Math.max(300, startHeight - deltaY));
        setChatWidth(Math.max(250, startWidth - deltaY * 2)); // expands horizontally
      }
    };

    const stopResize = () => {
      window.removeEventListener('mousemove', doResize);
      window.removeEventListener('mouseup', stopResize);
    };

    window.addEventListener('mousemove', doResize);
    window.addEventListener('mouseup', stopResize);
  };

  const dragHandleStyle = (() => {
    const base = {
      position: 'absolute',
      width: '20px',
      height: '20px',
      zIndex: 10001,
    };
    if (position === 'right') {
      return { ...base, top: 0, left: 0, cursor: 'nwse-resize' };
    } else if (position === 'left') {
      return { ...base, top: 0, right: 0, cursor: 'nesw-resize' };
    } else {
      return { ...base, top: 0, left: '50%', transform: 'translateX(-50%)', cursor: 'ns-resize' };
    }
  })();

  const boxRadius = design === 'rounded' ? '10px' : '0px';

  const triggerStyle = {
    position: 'fixed',
    bottom: '1rem',
    ...(position === 'left' ? { left: '1rem' } : position === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { right: '1rem' }),
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    padding: '0.75rem 1rem',
    border: 'none',
    borderRadius: design === 'rounded' ? '20px' : '4px',
    cursor: 'pointer',
    zIndex: 9999
  };

  return (
    <>
      {!isChatOpen && (
        <button onClick={() => {
          setIsChatOpen(true);
          setMessages([{ role: "assistant", content: "How can I assist you today?" }]);
        }} style={triggerStyle}>
          💬 Chat
        </button>
      )}

      {isChatOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            ...(position === 'left' ? { left: '1rem' } : position === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { right: '1rem' }),
            width: `${chatWidth}px`,
            height: `${chatHeight}px`,
            background: chatBackground,
            borderRadius: boxRadius,
            boxShadow: '0 0 12px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10000,
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <div style={{
            background: primaryColor,
            color: secondaryColor,
            padding: '0.75rem',
            fontWeight: 500
          }}>
            <strong>Chat with us!</strong>
            <button
              aria-label="Close chat"
              title="Close"
              onClick={() => setIsChatOpen(false)}
              style={{
                float: 'right',
                background: 'none',
                border: 'none',
                color: secondaryColor,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >×</button>
          </div>

          <div style={{ flex: 1, padding: '0.5rem', overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: '0.25rem 0' }}>
                <span style={{
                  display: 'inline-block',
                  background: msg.role === "user" ? primaryColor : '#eee',
                  color: msg.role === "user" ? secondaryColor : '#333',
                  padding: '0.5rem',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  fontWeight: 400
                }}>
                  {msg.content}
                </span>
              </div>
            ))}
            {isTyping && (
              <div style={{ fontStyle: 'italic', color: '#aaa', padding: '0.25rem 0' }}>Typing...</div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div>
            <div style={{ display: 'flex', borderTop: '1px solid #ddd' }}>
              <input
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: 'none',
                  fontFamily: "'Inter', sans-serif"
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  padding: '0.5rem',
                  background: primaryColor,
                  color: secondaryColor,
                  border: 'none',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400
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
              borderTop: '1px solid #eee',
              fontWeight: 300
            }}>
              Powered by <strong style={{ color: '#333' }}>Locail</strong>
            </div>
          </div>

          <div
            onMouseDown={(e) =>
              startResize(e,
                position === 'left' ? 'top-right' :
                position === 'right' ? 'top-left' :
                'top-middle')
            }
            style={dragHandleStyle}
          />
        </div>
      )}
    </>
  );
}
