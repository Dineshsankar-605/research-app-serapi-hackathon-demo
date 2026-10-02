'use client';

import { PatentResult } from '@/lib/types';

interface PatentCardProps {
  result: PatentResult;
}

export default function PatentCard({ result }: PatentCardProps) {
  return (
    <div className="patent-card">
      <div className="card-header">
        <h3 className="card-title">
          <a href={result.url} target="_blank" rel="noopener noreferrer">
            {result.title}
          </a>
        </h3>
        {result.patentNumber && (
          <p className="patent-number">{result.patentNumber}</p>
        )}
      </div>

      <div className="card-body">
        {result.inventors && result.inventors.length > 0 && (
          <p className="inventors">
            <strong>Inventors:</strong> {result.inventors.join(', ')}
          </p>
        )}

        {result.assignee && (
          <p className="assignee">
            <strong>Assignee:</strong> {result.assignee}
          </p>
        )}

        {result.publicationDate && (
          <p className="publication-date">
            <strong>Publication Date:</strong> {result.publicationDate}
          </p>
        )}

        {result.snippet && (
          <p className="snippet">{result.snippet}</p>
        )}
      </div>

      <div className="card-footer">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="view-link"
        >
          View Patent →
        </a>
      </div>
    </div>
  );
}
