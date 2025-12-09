import { useState } from 'react';
import MessageBubble from './MessageBubble';

const TestTyping = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your CoZone AI Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const addTypingMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      text: "This is a test message to demonstrate the typing animation effect. It should appear character by character to simulate typing.",
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      text: "This is a user message that should appear instantly.",
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>Typing Animation Test</h1>
      <button onClick={addTypingMessage} style={{ marginRight: '10px', marginBottom: '10px' }}>
        Add Bot Message with Typing
      </button>
      <button onClick={addUserMessage}>
        Add User Message
      </button>
      
      <div style={{ marginTop: '20px', maxWidth: '500px' }}>
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
          />
        ))}
      </div>
    </div>
  );
};

export default TestTyping;