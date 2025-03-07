import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container" style={{
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '2rem'
        }}>
          <h2>Oops! Algo deu errado.</h2>
          <p>Estamos trabalhando para resolver o problema.</p>
          <button 
            onClick={() => window.location.href = '/donamariabentoart/'}
            style={{
              padding: '0.5rem 1rem',
              background: '#B76E79',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Voltar para a página inicial
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;