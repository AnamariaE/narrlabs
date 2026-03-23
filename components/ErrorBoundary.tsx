import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="mb-6 text-6xl">⚠️</div>
            <h2 className="mb-4">Algo salió mal / Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              {this.state.error?.message || 
                'Lo sentimos, ha ocurrido un error inesperado. / We\'re sorry, an unexpected error occurred.'}
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
            >
              Recargar página / Reload page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
