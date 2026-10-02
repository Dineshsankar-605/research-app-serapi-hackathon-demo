'use client';

interface RelatedResearchProps {
  queries: string[];
  source: 'scholar' | 'patents';
  onQueryClick: (query: string) => void;
  isLoading?: boolean;
}

export default function RelatedResearch({
  queries,
  source,
  onQueryClick,
  isLoading = false,
}: RelatedResearchProps) {
  if (!queries || queries.length === 0) {
    return null;
  }

  return (
    <div className="related-research-section">
      <h3>Related Research</h3>
      <div className="related-queries">
        {queries.map((query, index) => (
          <button
            key={`${query}-${index}`}
            className="related-query-button"
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
