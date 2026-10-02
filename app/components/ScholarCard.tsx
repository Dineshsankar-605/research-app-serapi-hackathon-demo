'use client';

import { ScholarResult } from '@/lib/types';

interface ScholarCardProps {
  result: ScholarResult;
}

export default function ScholarCard({ result }: ScholarCardProps) {
  return (
    <div className="research-card">
      <div className="card-header">
        <h3 className="card-title">
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            {result.title}
          </a>
        </h3>
      </div>

      <div className="card-body">
        {result.authors && result.authors.length > 0 && (
          <p className="authors">
            <strong>Authors:</strong> {result.authors.join(', ')}
          </p>
        )}

        {result.publication && (
          <p className="publication">
            <strong>Publication:</strong> {result.publication}
          </p>
        )}

        {result.year && (
          <p className="year">
            <strong>Year:</strong> {result.year}
          </p>
        )}

        {result.snippet && (
          <p className="snippet">{result.snippet}</p>
        )}

        {result.citedCount !== undefined && (
          <p className="cited-count">
            <strong>Citations:</strong> {result.citedCount}
          </p>
        )}
      </div>

      <div className="card-footer">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="view-link"
        >
          View Paper →
        </a>
        {result.related && (
          <a
            href={result.related}
            target="_blank"
            rel="noopener noreferrer"
            className="related-link"
          >
            Related →
          </a>
        )}
      </div>
    </div>
  );
}
