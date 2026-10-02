'use client';

import { useState, useEffect } from 'react';
import { ScholarResult, PatentResult, SearchSource, SearchHistoryItem } from '@/lib/types';
import { getSearchHistory, addToSearchHistory } from '@/lib/searchHistory';
import ScholarCard from './components/ScholarCard';
import PatentCard from './components/PatentCard';
import SearchHistory from './components/SearchHistory';
import CommonQueries from './components/CommonQueries';
import RelatedResearch from './components/RelatedResearch';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import Pagination from './components/Pagination';
import './globals.css';

type SearchResult = ScholarResult | PatentResult;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<SearchSource>('scholar');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [relatedSearches, setRelatedSearches] = useState<string[]>([]);
  const [lastQuery, setLastQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastSearchSource, setLastSearchSource] = useState<SearchSource>('scholar');
  const [totalResults, setTotalResults] = useState(0);
  
  const RESULTS_PER_PAGE = 10;

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const performSearch = async (query: string, source: SearchSource, page: number = 1) => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);
    if (page === 1) {
      setRelatedSearches([]);
    }
    setCurrentPage(page);
    setLastSearchSource(source);

    try {
      if (page === 1) {
        // Add to search history only on new search
        addToSearchHistory(trimmedQuery, source);
        setSearchHistory(getSearchHistory());
        setLastQuery(trimmedQuery);
      }

      // Perform search
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: trimmedQuery,
          source,
          page,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Search failed');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Search failed');
      }

      const fetchedResults = data.data?.results || [];
      setResults(fetchedResults);
      setTotalResults(data.data?.totalResults || fetchedResults.length);

      // Load related searches only on new search
      if (page === 1) {
        try {
          const relatedResponse = await fetch(
            `/api/search?query=${encodeURIComponent(trimmedQuery)}&source=${source}`
          );
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            if (relatedData.data?.relatedSearches) {
              setRelatedSearches(relatedData.data.relatedSearches);
            }
          }
        } catch (err) {
          console.error('Failed to load related searches:', err);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery, selectedSource);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch(e as any);
    }
  };

  const isSearchButtonDisabled = !searchQuery.trim() || loading;

  const handleCommonQueryClick = (query: string) => {
    setSearchQuery(query);
    performSearch(query, selectedSource);
  };

  const handleHistoryItemClick = (query: string, source: SearchSource) => {
    setSearchQuery(query);
    setSelectedSource(source);
    performSearch(query, source);
  };

  const handleRelatedQueryClick = (query: string) => {
    setSearchQuery(query);
    performSearch(query, selectedSource);
  };

  const handleRefreshHistory = () => {
    setSearchHistory(getSearchHistory());
  };

  const handleRetry = () => {
    if (lastQuery) {
      performSearch(lastQuery, selectedSource);
    }
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || loading) return;
    const queryToSearch = lastQuery || searchQuery;
    if (queryToSearch) {
      performSearch(queryToSearch, selectedSource, page);
    }
    // Scroll to top of results section
    setTimeout(() => {
      const resultsSection = document.querySelector('.results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSourceChange = (source: SearchSource) => {
    setSelectedSource(source);
    setCurrentPage(1); // Reset pagination when switching sources
  };

  const isScholarResult = (result: SearchResult): result is ScholarResult => {
    return 'authors' in result;
  };

  const isPatentResult = (result: SearchResult): result is PatentResult => {
    return 'patentNumber' in result;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Research Finder</h1>
          <p>Discover research papers and patents</p>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                className="search-input"
                placeholder="Search research papers or patents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                aria-label="Search query"
              />
              <button
                type="submit"
                className="search-button"
                disabled={isSearchButtonDisabled}
                title={isSearchButtonDisabled && !loading ? 'Enter a search query' : ''}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            <div className="source-selection">
              <div className="source-group">
                <label className={`source-label ${selectedSource === 'scholar' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="source"
                    value="scholar"
                    checked={selectedSource === 'scholar'}
                    onChange={() => handleSourceChange('scholar')}
                    disabled={loading}
                  />
                  <span>📄 Google Scholar</span>
                </label>
              </div>

              <div className="source-group">
                <label className={`source-label ${selectedSource === 'patents' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="source"
                    value="patents"
                    checked={selectedSource === 'patents'}
                    onChange={() => handleSourceChange('patents')}
                    disabled={loading}
                  />
                  <span>🔧 Google Patents</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Results section */}
        {loading && <LoadingState showSkeleton={true} skeletonCount={RESULTS_PER_PAGE} />}

        {error && (
          <ErrorState
            error={error}
            onRetry={handleRetry}
          />
        )}

        {!loading && !error && results.length === 0 && lastQuery && (
          <EmptyState query={lastQuery} hasSearched={true} />
        )}

        {!loading && !error && results.length === 0 && !lastQuery && (
          <EmptyState hasSearched={false} />
        )}

        {!loading && !error && results.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <div>
                <h2>
                  Results for "{lastQuery}"
                  <span className="result-count">
                    ({totalResults > 0 ? `${totalResults.toLocaleString()} results` : `${results.length} results`})
                  </span>
                </h2>
                <p className="results-source">
                  Source: {selectedSource === 'scholar' ? '📄 Google Scholar' : '🔧 Google Patents'}
                </p>
              </div>
            </div>
            <div className="results-list">
              {results.map((result, index) => (
                <div key={`${selectedSource}-${result.id || index}-${result.url}`} className="result-item">
                  {isScholarResult(result) ? (
                    <ScholarCard result={result} />
                  ) : isPatentResult(result) ? (
                    <PatentCard result={result} />
                  ) : null}
                </div>
              ))}
            </div>
            {selectedSource === 'scholar' && totalResults > RESULTS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalResults={Math.min(totalResults, 100)}
                resultsPerPage={RESULTS_PER_PAGE}
                onPageChange={handlePageChange}
                isLoading={loading}
              />
            )}
          </div>
        )}

        {!loading && !error && results.length > 0 && relatedSearches.length > 0 && (
          <RelatedResearch
            queries={relatedSearches}
            source={selectedSource}
            onQueryClick={handleRelatedQueryClick}
            isLoading={loading}
          />
        )}

        {/* Sidebars */}
        <div className="sidebar-container">
          <aside className="sidebar">
            <CommonQueries
              onQueryClick={handleCommonQueryClick}
              isLoading={loading}
            />
          </aside>

          <aside className="sidebar">
            <SearchHistory
              items={searchHistory}
              onItemClick={handleHistoryItemClick}
              onRefresh={handleRefreshHistory}
            />
          </aside>
        </div>
      </main>

      <footer className="app-footer">
        <p>Powered by SerpApi • Research Finder v1.0</p>
      </footer>
    </div>
  );
}
