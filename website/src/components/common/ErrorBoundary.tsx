import { Component, ErrorInfo, ReactNode } from 'react';
import { WarningCircle } from '@phosphor-icons/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-hairline)',
          borderRadius: 'var(--radius-lg)',
          margin: '2rem auto',
          maxWidth: '600px'
        }}>
          <WarningCircle size={40} color="var(--color-ash)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-ink)', marginBottom: '0.5rem' }}>
            Unable to render this section
          </h2>
          <p style={{ color: 'var(--color-mute)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            {this.state.error?.message || 'An unexpected error occurred while displaying content.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-secondary"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
