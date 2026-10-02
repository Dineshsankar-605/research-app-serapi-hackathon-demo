'use client';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  const getHelpfulMessage = (errorMsg: string): string => {
    if (errorMsg.toLowerCase().includes('network')) {
      return 'Please check your internet connection and try again.';
    }
    if (errorMsg.toLowerCase().includes('timeout')) {
      return 'The search took too long. Please try again with a more specific query.';
    }
    if (errorMsg.toLowerCase().includes('rate limit')) {
      return 'Too many searches recently. Please wait a moment and try again.';
    }
    return 'Please try again or try a different search query.';
  };

  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <h3>Search Failed</h3>
      <p className="error-message">{error}</p>
      <p className="error-help">{getHelpfulMessage(error)}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          🔄 Try Again
        </button>
      )}
    </div>
  );
}
