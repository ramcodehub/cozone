# CoZone AI Assistant Enhancements

This document outlines optional improvements that can be added to enhance the CoZone AI Assistant experience.

## Table of Contents
1. [Voice Input Enhancement](#voice-input-enhancement)
2. [Suggested Questions](#suggested-questions)
3. [Theme Customization](#theme-customization)
4. [Persistent Memory with Supabase](#persistent-memory-with-supabase)
5. [Rate Limiting](#rate-limiting)
6. [Analytics Integration](#analytics-integration)

## Voice Input Enhancement

The assistant already includes basic voice input functionality. Here are some enhancements:

### 1. Language Support
Add support for multiple languages by modifying the speech recognition initialization:

```javascript
// In ChatWindow.jsx useEffect for speech recognition
recognition.lang = 'en-US'; // Change to desired language code
```

### 2. Continuous Listening
Enable continuous listening mode for hands-free operation:

```javascript
recognition.continuous = true;
recognition.interimResults = true;
```

### 3. Voice Feedback
Add text-to-speech for bot responses:

```javascript
// In ChatWindow.jsx after adding bot message
if ('speechSynthesis' in window) {
  const utterance = new SpeechSynthesisUtterance(botMessage.text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  speechSynthesis.speak(utterance);
}
```

## Suggested Questions

Add quick-action buttons with common questions to help users get started:

### Implementation Steps:

1. Create suggested questions data:
```javascript
// In ChatWindow.jsx
const suggestedQuestions = [
  "What workspace options do you have?",
  "Show me pricing for private cabins",
  "How can I book a visit?",
  "What are your operating hours?"
];
```

2. Add to the UI below the welcome message:
```jsx
{suggestedQuestions.length > 0 && messages.length === 1 && (
  <div className={styles.suggestedQuestions}>
    {suggestedQuestions.map((question, index) => (
      <button
        key={index}
        className={styles.suggestedQuestion}
        onClick={() => setInputValue(question)}
      >
        {question}
      </button>
    ))}
  </div>
)}
```

3. Add CSS styles:
```css
.suggestedQuestions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.suggestedQuestion {
  background: var(--light-blue);
  border: 1px solid var(--sky-blue);
  border-radius: 16px;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.suggestedQuestion:hover {
  background: var(--sky-blue);
  color: white;
}
```

## Theme Customization

Allow users to switch between light and dark themes:

### Implementation:

1. Add theme state to ChatWindow:
```javascript
const [theme, setTheme] = useState('light');
```

2. Add theme toggle button in header:
```jsx
<button 
  className={styles.themeToggle}
  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
>
  {theme === 'light' ? '🌙' : '☀️'}
</button>
```

3. Update CSS to support themes:
```css
.chatWindow.light {
  --bg-color: var(--white);
  --text-color: var(--black);
}

.chatWindow.dark {
  --bg-color: #2d3748;
  --text-color: var(--white);
}
```

## Persistent Memory with Supabase

Enhance session management by storing conversations in Supabase:

### Implementation Steps:

1. Install Supabase client:
```bash
npm install @supabase/supabase-js
```

2. Create a conversations table:
```sql
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  messages JSONB[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

3. Update sessionManager.js:
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Replace in-memory storage with Supabase queries
async function saveConversation(sessionId, messages) {
  const { data, error } = await supabase
    .from('conversations')
    .upsert({
      session_id: sessionId,
      messages: messages
    }, {
      onConflict: 'session_id'
    });
    
  if (error) console.error('Error saving conversation:', error);
}

async function loadConversation(sessionId) {
  const { data, error } = await supabase
    .from('conversations')
    .select('messages')
    .eq('session_id', sessionId)
    .single();
    
  if (error) {
    console.error('Error loading conversation:', error);
    return [];
  }
  
  return data.messages || [];
}
```

## Rate Limiting

Implement rate limiting to prevent API abuse:

### Backend Implementation:

1. Install rate limiting middleware:
```bash
npm install express-rate-limit
```

2. Add to server.js:
```javascript
import rateLimit from 'express-rate-limit';

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});

app.use('/api/ai', aiLimiter);
```

3. Update error handling in aiController.js:
```javascript
if (error.code === 'ERR_TOO_MANY_REQUESTS') {
  return res.status(429).json({
    success: false,
    message: "I'm receiving too many requests right now. Please try again in a moment."
  });
}
```

## Analytics Integration

Track assistant usage for insights:

### Frontend Implementation:

1. Add analytics event tracking:
```javascript
// In ChatWindow.jsx after successful message send
if (window.gtag) {
  window.gtag('event', 'ai_message_sent', {
    'message_length': message.length,
    'session_id': sessionIdRef.current
  });
}
```

2. Add conversation metrics:
```javascript
// Track conversation length
useEffect(() => {
  if (messages.length > 10 && window.gtag) {
    window.gtag('event', 'long_conversation', {
      'message_count': messages.length,
      'session_id': sessionIdRef.current
    });
  }
}, [messages]);
```

### Backend Implementation:

1. Add logging middleware:
```javascript
// In server.js
app.use('/api/ai', (req, res, next) => {
  console.log(`AI Request: ${req.body.message}`);
  next();
});
```

2. Track popular queries:
```javascript
// In aiController.js
const popularQueries = [
  'pricing', 'booking', 'hours', 'amenities', 'location'
];

const queryType = popularQueries.find(q => 
  message.toLowerCase().includes(q)
);

if (queryType) {
  console.log(`Popular Query Type: ${queryType}`);
}
```

## Conclusion

These enhancements can significantly improve the user experience and functionality of the CoZone AI Assistant. Implement them based on your specific needs and priorities.