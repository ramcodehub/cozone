import React from 'react';

/**
 * Global Error Boundary - Hardened for Production
 * Prevents full-site crashes and provides a graceful fallback.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for production troubleshooting
    console.group("[CRITICAL ERROR CAUGHT]");
    console.error("Error:", error);
    console.error("Info:", errorInfo);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      // Return a clean, non-crashing fallback UI
      return (
        <div style={{ 
          padding: '20px', 
          margin: '20px',
          textAlign: 'center', 
          background: '#fff3f3', 
          borderRadius: '12px',
          border: '1px solid #ffcccc',
          color: '#d32f2f',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Something went wrong</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>
            We've isolated a component error to prevent a full site crash.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '15px',
              padding: '8px 20px',
              background: '#d32f2f',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
