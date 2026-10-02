import { SearchHistoryItem, SearchSource } from './types';

const STORAGE_KEY = 'research_finder_history';
const MAX_HISTORY_ITEMS = 20;

export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading search history:', error);
    return [];
  }
}

export function addToSearchHistory(query: string, source: SearchSource): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const history = getSearchHistory();
    const newItem: SearchHistoryItem = {
      id: `${source}-${Date.now()}`,
      query,
      source,
      timestamp: Date.now(),
    };

    // Remove duplicate queries
    const filtered = history.filter(item => !(item.query === query && item.source === source));
    
    // Add new item to the beginning
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving to search history:', error);
  }
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
}

export function removeHistoryItem(id: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const history = getSearchHistory();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing history item:', error);
  }
}
