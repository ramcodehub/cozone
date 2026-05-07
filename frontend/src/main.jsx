import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.jsx'
import './styles/variables.css'

// [DEBUG] Global Error Tracking for Production Stability
window.addEventListener("error", (event) => {
  console.error(
    "[GLOBAL ERROR DETECTED]",
    {
      message: event.message,
      source: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    }
  );
});

window.addEventListener("unhandledrejection", (event) => {
  console.error(
    "[PROMISE ERROR DETECTED]",
    event.reason
  );
});

console.log(
  "%cCoZone Frontend Build Version:",
  "color: #00ff00; font-weight: bold;",
  __BUILD_TIMESTAMP__
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
