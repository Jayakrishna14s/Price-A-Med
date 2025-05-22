import React, { useState, useRef, useEffect } from 'react';
import { User, Users, Pill, Calendar, CreditCard, Package, X, Send } from 'lucide-react';
import './ChatBot.css';

const predictiveQueries = [
  {
    category: 'Member Information',
    icon: User,
    queries: [
      'What is my membership ID?',
      'How do I update my personal details?',
      'Show my membership status',
      'What are my benefits?',
      'How do I download my membership card?'
    ]
  },
  {
    category: 'Dependent Information',
    icon: Users,
    queries: [
      'How do I add a dependent?',
      'View my dependents list',
      'Update dependent information',
      'Remove a dependent',
      'What documents are needed to add a dependent?'
    ]
  },
  {
    category: 'Medicine & Prescriptions',
    icon: Pill,
    queries: [
      'Check medicine coverage',
      'View my prescriptions',
      'Find nearby pharmacies',
      'How to refill a prescription?',
      'What is my prescription copay?'
    ]
  },
  {
    category: 'Appointments',
    icon: Calendar,
    queries: [
      'Schedule a new appointment',
      'View upcoming appointments',
      'Cancel/reschedule appointment',
      'Find a specialist',
      'How do I prepare for my appointment?'
    ]
  },
  {
    category: 'Billing & Claims',
    icon: CreditCard,
    queries: [
      'View my recent claims',
      'Check claim status',
      'Download EOB statements',
      'How to submit a claim?',
      'When will my claim be processed?'
    ]
  },
  {
    category: 'Orders',
    icon: Package,
    queries: [
      'Track my order',
      'View order history',
      'Cancel an order',
      'Return an item',
      'How long does delivery take?'
    ]
  }
];

const getEnhancedBotResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Member Information
  if (lowerMessage.includes('membership id')) {
    return 'Your membership ID is ENU1. You can find this on your member card or in the membership section of the app.';
  }
  
  if (lowerMessage.includes('update') && lowerMessage.includes('personal details')) {
    return 'You can update your personal details in the Profile Page. Go to "Profile" > "My Profile" to make changes.';
  }
  
  if (lowerMessage.includes('membership status')) {
    return 'Your membership is currently active through December 2024. You can upgrade your plan anytime by raising a coverage upgrade request.';
  }

  if (lowerMessage.includes('benefits')) {
    return 'Your plan includes:\n- 100% coverage for preventive care\n- 60% copay for Vital care\n- 80% copay for Wellness Plus\n- 90% copay for Health Starter.';
  }

  if (lowerMessage.includes('membership card')) {
    return 'Download your digital membership card from membership section.';
  }

  // Dependent Information
  if (lowerMessage.includes('add') && lowerMessage.includes('dependent')) {
    return 'To add a dependent:\n1) Go to "Profile" -> "My Profile"\n2) Click "Add New Dependent"\n3) Complete their information\n4) Upload required Health Conditions, Current Medications, Allergies.';
  }

  if (lowerMessage.includes('dependents list')) {
    return 'Your current dependents:\n1. Sarah Johnson (Spouse)\n2. Michael Johnson (Child, age 12)\n3. Emily Johnson (Child, age 8)';
  }

  if (lowerMessage.includes('remove a dependent')) {
    return 'To remove a dependent, raise a request to remove dependents.';
  }

  if (lowerMessage.includes('documents needed')) {
    return 'Required documents:\n- Spouse: Marriage certificate\n- Children: Birth certificate\n- Others: Proof of relationship';
  }

  // Medicine & Prescriptions
  if (lowerMessage.includes('medicine coverage')) {
    return 'Your plan covers:\n- Generic drugs: $10 copay\n- Preferred brands: $30\n- Non-preferred brands: $50';
  }

  if (lowerMessage.includes('prescriptions')) {
    return 'Your current prescriptions:\n1. Lisinopril 10mg (2 refills)\n2. Metformin 500mg (3 refills)\n3. Atorvastatin 20mg (1 refill)';
  }

  if (lowerMessage.includes('nearby pharmacies')) {
    return 'Nearby pharmacies:\n1. CVS - 1.2 miles\n2. Walgreens - 1.5 miles\n3. Rite Aid - 2.1 miles';
  }

  if (lowerMessage.includes('refill')) {
    return 'Refill options:\n1) In app: "Prescriptions" > "Refill"\n2) Call your pharmacy\n3) Use refill line: 1-800-555-6789';
  }

  if (lowerMessage.includes('copay')) {
    return 'Prescription copays:\n- Generic: $10\n- Preferred Brand: $30\n- Non-Preferred: $50\n- Specialty: 20% coinsurance';
  }

  // Appointments
  if (lowerMessage.includes('schedule') && lowerMessage.includes('appointment')) {
    return 'To schedule:\n1) Go to "Appointments"\n2) Select provider\n3) Choose date/time\n4) Confirm details';
  }

  if (lowerMessage.includes('upcoming appointments')) {
    return 'Your upcoming appointments:\n1. Dr. Smith - May 15, 2:00 PM\n2. Dental Cleaning - May 20, 10:30 AM';
  }

  if (lowerMessage.includes('cancel') || lowerMessage.includes('reschedule')) {
    return 'To cancel/reschedule:\n1) Go to "Appointments"\n2) Select appointment\n3) Choose "Reschedule" or "Cancel"\n4) Confirm changes';
  }

  if (lowerMessage.includes('find a specialist')) {
    return 'Find specialists:\n1) Search by specialty\n2) Filter by location\n3) Check availability\n4) Book appointment';
  }

  // Billing & Claims
  if (lowerMessage.includes('recent claims')) {
    return 'Recent claims:\n1. $150 - Dr. Visit (Paid)\n2. $75 - Lab Work (Processing)\n3. $40 - Prescription (Paid)';
  }

  if (lowerMessage.includes('claim status')) {
    return 'Claim status:\n- Submitted: May 1\n- Processed: May 5\n- Paid: May 7\n- Amount: $120';
  }

  if (lowerMessage.includes('submit a claim')) {
    return 'Submit claims:\n1) Download form\n2) Complete details\n3) Attach receipts\n4) Submit online/mail';
  }

  return "I'm here to help with your healthcare needs. Could you please provide more specific information?";
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      showQueries: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const userMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, userMessage]);
      setInputMessage('');
      
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getEnhancedBotResponse(inputMessage),
          sender: 'bot',
          timestamp: new Date(),
          showQueries: true
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleQueryClick = (query, category) => {
    const userMessage = {
      id: messages.length + 1,
      text: query,
      sender: 'user',
      timestamp: new Date(),
      category: category
    };
    
    setMessages([...messages, userMessage]);
    
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getEnhancedBotResponse(query),
        sender: 'bot',
        timestamp: new Date(),
        showQueries: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      <div className={`chat-container ${isOpen ? 'active' : ''}`} ref={chatContainerRef}>
        <div className="chat-header">
          <div className="chat-header-content">
            <div className="bot-icon">
              <img 
                src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png" 
                alt="PAM Bot" 
                className="bot-icon-img"
              />
            </div>
            <span>PAM Bot</span>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="chat-body">
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <div className={`message-wrapper ${message.sender === 'user' ? 'user-wrapper' : ''}`}>
                <div className="message-icon-container">
                  <div className={`message-icon ${message.sender === 'user' ? 'user-icon' : 'bot-icon'}`}>
                    {message.sender === 'user' ? (
                      <User size={20} />
                    ) : (
                      <img 
                        src="https://res.cloudinary.com/dzymyjltu/image/upload/v1737485868/pam-logo_mpxeqp.png" 
                        alt="Bot" 
                        className="bot-icon-img"
                      />
                    )}
                  </div>
                </div>
                <div className="message-content-container">
                  <div className={`message-content ${message.sender === 'user' ? 'user-message' : ''}`}>
                    <p>{message.text}</p>
                  </div>
                  
                  {message.showQueries && message.sender === 'bot' && (
                    <div className="predictive-queries-container">
                      {!selectedCategory ? (
                        <div className="query-categories">
                          {predictiveQueries.map((category) => {
                            const Icon = category.icon;
                            return (
                              <button
                                key={category.category}
                                onClick={() => setSelectedCategory(category.category)}
                                className="category-btn"
                              >
                                <Icon size={16} />
                                <span>{category.category}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="category-queries">
                          <button 
                            onClick={() => setSelectedCategory(null)}
                            className="back-btn"
                          >
                            ← Back to categories
                          </button>
                          <div className="queries-list">
                            {predictiveQueries
                              .find(cat => cat.category === selectedCategory)
                              ?.queries.map((query) => (
                                <button
                                  key={query}
                                  onClick={() => {
                                    handleQueryClick(query, selectedCategory);
                                    setSelectedCategory(null);
                                  }}
                                  className="query-btn"
                                >
                                  {query}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input">
          <textarea
            className="input-field"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={inputMessage.trim() === ''}
          >
            <Send size={16} className="icon" />
          </button>
        </div>
      </div>
      
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="icon">
          <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5 20 9.26 19.76 8 19.3L3 20L4.2 15.7C3.43 14.66 3 13.38 3 12C3 7.582 7.03 4 12 4C16.97 4 21 7.582 21 12Z" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default ChatBot;