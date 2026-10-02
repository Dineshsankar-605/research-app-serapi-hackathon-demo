export type SearchSource = 'scholar' | 'patents';

export interface ScholarResult {
  id: string;
  title: string;
  authors: string[];
  publication: string;
  year: number;
  snippet: string;
  citedCount?: number;
  url: string;
  related?: string;
}

export interface PatentResult {
  id: string;
  title: string;
  patentNumber: string;
  inventors: string[];
  assignee?: string;
  publicationDate: string;
  snippet: string;
  url: string;
  metadata?: Record<string, unknown>;
}

export interface SearchResult {
  type: 'scholar' | 'patent';
  data: ScholarResult | PatentResult;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  source: SearchSource;
  timestamp: number;
}

export interface RelatedSearch {
  query: string;
  source: SearchSource;
}
