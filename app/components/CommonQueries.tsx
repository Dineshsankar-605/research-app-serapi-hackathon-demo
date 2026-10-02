'use client';

interface CommonQueriesProps {
  onQueryClick: (query: string) => void;
  isLoading?: boolean;
}

const COMMON_QUERIES = [
  'machine learning',
  'artificial intelligence',
  'quantum computing',
  'renewable energy',
  'climate change',
  'blockchain',
  'neural networks',
  'data science',
];

export default function CommonQueries({ onQueryClick, isLoading = false }: CommonQueriesProps) {
  return (
    <div className="common-queries-section">
      <h3>Common Queries</h3>
      <div className="queries-grid">
        {COMMON_QUERIES.map((query) => (
          <button
            key={query}
            className="query-button"
            onClick={() => onQueryClick(query)}
            disabled={isLoading}
            title={query}
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
}
