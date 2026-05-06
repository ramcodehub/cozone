import React from 'react';

/**
 * ErrorBoundary Component - Prevents the entire app from crashing if the assistant fails
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("[Assistant Error Boundary]:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for when the assistant crashes
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          background: '#fff', 
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #eee',
          fontFamily: 'Inter, sans-serif'
        }}>
          <h3 style={{ color: '#ff4d4f', marginBottom: '10px' }}>Assistant Unavailable</h3>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
            We encountered an issue with the AI assistant UI.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '8px 16px',
              background: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Reset Assistant
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
