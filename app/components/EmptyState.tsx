'use client';

interface EmptyStateProps {
  query?: string;
  hasSearched?: boolean;
}

export default function EmptyState({ query, hasSearched = false }: EmptyStateProps) {
  if (!hasSearched && !query) {
    return (
      <div className="empty-state initial-state">
        <div className="empty-icon">📚</div>
        <h3>Welcome to Research Finder</h3>
        <p>Search for research papers on Google Scholar or patents on Google Patents.</p>
        <p>Enter a topic above to get started.</p>
      </div>
    );
  }

  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <h3>No Results Found</h3>
      {query && (
        <p>
          We couldn't find any results for <strong>"{query}"</strong>
        </p>
      )}
      <div className="empty-suggestions">
        <p>Try:</p>
        <ul>
          <li>Using more general keywords</li>
          <li>Checking your spelling</li>
          <li>Trying related terms</li>
          <li>Searching without special characters</li>
        </ul>
      </div>
    </div>
  );
}
