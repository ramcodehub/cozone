import React from 'react';

/**
 * Enhanced Error Boundary for Deep Debugging
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // [DEBUG] Capture deep crash details
    console.group("[DEBUG] [CRITICAL COMPONENT CRASH]");
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    console.error("Component Stack:", errorInfo.componentStack);
    console.groupEnd();
    
    this.setState({ info: errorInfo });
  }

  render() {
    if (this.state.hasError) {
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
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>AI Assistant Error</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>
            A component crash was caught. Details have been logged to the console.
          </p>
          <div style={{ 
            fontSize: '11px', 
            textAlign: 'left', 
            background: '#000', 
            color: '#0f0', 
            padding: '10px', 
            marginTop: '10px',
            maxHeight: '100px',
            overflow: 'auto',
            borderRadius: '4px'
          }}>
            {this.state.error?.toString()}
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '15px',
              padding: '8px 20px',
              background: '#d32f2f',
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
