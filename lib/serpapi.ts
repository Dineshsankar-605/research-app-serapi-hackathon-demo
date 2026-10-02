import axios from 'axios';
import { ScholarResult, PatentResult } from './types';

const SERPAPI_BASE_URL = 'https://serpapi.com/search';
const SERPAPI_KEY = process.env.SERPAPI_KEY;

if (!SERPAPI_KEY) {
  console.error('SERPAPI_KEY environment variable is not set');
}

/**
 * Remove duplicate results based on URL or ID
 */
function deduplicateResults<T extends { id?: string; url?: string }>(results: T[]): T[] {
  const seen = new Set<string>();
  const deduplicated: T[] = [];
  
  for (const result of results) {
    const key = result.url || result.id;
    if (key && seen.has(key)) {
      continue;
    }
    if (key) {
      seen.add(key);
    }
    deduplicated.push(result);
  }
  
  return deduplicated;
}

export async function searchScholar(
  query: string,
  page: number = 1
): Promise<{ results: ScholarResult[]; totalResults: number }> {
  if (!SERPAPI_KEY) {
    throw new Error('SerpApi key is not configured');
  }

  try {
    const startIndex = Math.max(0, (page - 1) * 10);
    const response = await axios.get(SERPAPI_BASE_URL, {
      params: {
        engine: 'google_scholar',
        q: query,
        api_key: SERPAPI_KEY,
        hl: 'en',
        start: startIndex,
        num: 10,
      },
    });

    const results = response.data.organic_results || [];
    const totalResults = response.data.search_information?.total_results || results.length;
    
    // Map results to ScholarResult format
    const mappedResults: ScholarResult[] = results.map((result: any, index: number) => ({
      id: `scholar-${page}-${index}-${Date.now()}`, // Unique ID including timestamp
      title: result.title || '',
      authors: result.authors || [],
      publication: result.publication || '',
      year: result.year ? parseInt(result.year) : new Date().getFullYear(),
      snippet: result.snippet || '',
      citedCount: result.cited_by?.value,
      url: result.link || '',
      related: result.related_link || undefined,
    }));

    const deduped = deduplicateResults(mappedResults);
    return {
      results: deduped,
      totalResults,
    };
  } catch (error) {
    console.error('Error searching Google Scholar:', error);
    throw error;
  }
}

export async function searchPatents(
  query: string
): Promise<{ results: PatentResult[]; totalResults: number }> {
  if (!SERPAPI_KEY) {
    throw new Error('SerpApi key is not configured');
  }

  try {
    const response = await axios.get(SERPAPI_BASE_URL, {
      params: {
        engine: 'google_patents',
        q: query,
        api_key: SERPAPI_KEY,
      },
    });

    const results = response.data.organic_results || [];
    const totalResults = response.data.search_information?.total_results || results.length;
    
    // Map results to PatentResult format
    const mappedResults: PatentResult[] = results.map((result: any, index: number) => {
      let inventorsList: string[] = [];
      if (Array.isArray(result.inventors)) {
        inventorsList = result.inventors;
      } else if (typeof result.inventor === 'string' && result.inventor.trim()) {
        inventorsList = [result.inventor.trim()];
      } else if (typeof result.inventors === 'string' && result.inventors.trim()) {
        inventorsList = [result.inventors.trim()];
      }

      return {
        id: result.patent_id || `patent-${index}-${Date.now()}`,
        title: result.title || '',
        patentNumber: result.publication_number || result.patent_number || '',
        inventors: inventorsList,
        assignee: result.assignee || undefined,
        publicationDate: result.publication_date || result.filing_date || '',
        snippet: result.snippet || '',
        url: result.patent_link || result.link || '',
        metadata: {
          status: result.status,
          type: result.type,
        },
      };
    });

    const deduped = deduplicateResults(mappedResults);
    return {
      results: deduped,
      totalResults,
    };
  } catch (error) {
    console.error('Error searching Google Patents:', error);
    throw error;
  }
}

export async function generateRelatedSearches(query: string, source: 'scholar' | 'patents'): Promise<string[]> {
  // Generate more related search variations based on the original query
  const variations = [
    query,
    `${query} research`,
    `${query} study`,
    `${query} analysis`,
    `${query} latest`,
    source === 'scholar' 
      ? `${query} machine learning`
      : `${query} technology`,
    source === 'scholar'
      ? `${query} deep learning`
      : `${query} innovation`,
    source === 'scholar'
      ? `${query} paper`
      : `${query} patent`,
  ];

  // Remove duplicates and return up to 8 variations
  return variations
    .filter((v, i, arr) => arr.indexOf(v) === i && v !== query) // Remove duplicates and original query
    .slice(0, 8); // Return up to 8 related searches
}
