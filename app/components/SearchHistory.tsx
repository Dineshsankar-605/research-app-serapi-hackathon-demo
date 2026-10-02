'use client';

import { SearchHistoryItem } from '@/lib/types';
import { removeHistoryItem } from '@/lib/searchHistory';

interface SearchHistoryProps {
  items: SearchHistoryItem[];
  onItemClick: (query: string, source: 'scholar' | 'patents') => void;
  onRefresh: () => void;
}

export default function SearchHistory({ items, onItemClick, onRefresh }: SearchHistoryProps) {
  if (items.length === 0) {
    return null;
  }

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeHistoryItem(id);
    onRefresh();
  };

  const handleClick = (item: SearchHistoryItem) => {
    onItemClick(item.query, item.source);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="search-history-section">
      <h3>Search History</h3>
      <div className="history-list">
        {items.slice(0, 10).map((item) => (
          <div
            key={item.id}
            className="history-item"
            onClick={() => handleClick(item)}
          >
            <div className="history-content">
              <p className="history-query">{item.query}</p>
              <p className="history-meta">
                {item.source === 'scholar' ? '📄 Scholar' : '🔧 Patents'} •{' '}
                {formatDate(item.timestamp)}
              </p>
            </div>
            <button
              className="history-remove"
              onClick={(e) => handleRemove(item.id, e)}
              aria-label="Remove from history"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
