import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react';
import './chatBot.css';

const Chatbot = ({pageLabel}) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [chatVisible, setChatVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const chatContainerRef = useRef(null);

  const endpointMapping = {
    home: 'http://localhost:5000/chat/home',
    pharmacy: 'http://localhost:5000/chat/pharmacy',
    prescriptions: 'http://localhost:5000/chat/prescriptions',
    support: 'http://localhost:5000/chat/support',
    default: 'http://localhost:5000/chat',
  };

  const apiUrl = endpointMapping[pageLabel] || endpointMapping.default;

  const submitQuery = async () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput === "") return;
  
    setUserInput("");
    setIsTyping(true);
  
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, { text: trimmedInput, type: 'user' }];
      setTimeout(() => scrollToUserQuery(updatedMessages.length - 1), 100);
      return updatedMessages;
    });
  
    try {
      const response = await fetch( apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });
  
      const data = await response.json();
      
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.response, type: 'bot' }
        ]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error('Error communicating with the API:', error);
      setIsTyping(false);
    }
  };
  
  const scrollToUserQuery = (index) => {
    setTimeout(() => {
      const messageElements = document.querySelectorAll(".message-wrapper");
      if (messageElements[index]) {
        messageElements[index].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleInputChange = (e) => setUserInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitQuery();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setChatVisible(false);
      }
    };

    if (chatVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chatVisible]);

  return (
    <div className="chatbot-wrapper">
      {!chatVisible && <div className="chatbot-ripple"></div>}
  
      <button 
        className="chatbot-toggle"
        onClick={() => setChatVisible(!chatVisible)}
        aria-label="Toggle chat"
      >
        <MessageCircle className="icon" />
      </button>
  
      {chatVisible && (
        <div className="chat-container" ref={chatContainerRef}>
          <div className="chat-header">
            <div className="chat-header-content">
              <img src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png" alt="AI Assistant" className="w-8 h-8" />
              <span>AI Assistant</span>
            </div>
            <button 
              className="close-btn" 
              onClick={() => setChatVisible(false)}
              aria-label="Close chat"
            >
              <X className="icon" />
            </button>
          </div>
  
          <div className="chat-body" ref={chatBodyRef}>
            <div className="welcome-message">
              <h2>Welcome! 👋</h2>
              <p>How can I assist you today?</p>
            </div>
  
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message-wrapper ${msg.type}-wrapper`}
              >
                <div className={`message ${msg.type}-message`}>
                  <div className="message-content">
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  </div>
                </div>
              </div>
            ))}
  
            {isTyping && (
              <div className="message-wrapper bot-wrapper">
                <div className="message bot-message typing">
                  <div className="typing-indicator">
                    <Loader2 className="animate-spin" />
                  </div>
                </div>
              </div>
            )}
          </div>
  
          <div className="chat-input">
            <textarea
              value={userInput}
              placeholder="Type your message..."
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              rows={1}
              className="input-field"
            />
            <button 
              onClick={submitQuery}
              className="send-button"
              disabled={!userInput.trim()}
            >
              <Send className="icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Chatbot;