import { NextRequest, NextResponse } from 'next/server';
import { searchScholar, searchPatents, generateRelatedSearches } from '@/lib/serpapi';
import { ApiResponse } from '@/lib/types';

// Input validation
function validateSearchQuery(query: string): { valid: boolean; error?: string } {
  if (!query || typeof query !== 'string') {
    return { valid: false, error: 'Query is required' };
  }

  const trimmed = query.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Query cannot be empty' };
  }

  if (trimmed.length > 500) {
    return { valid: false, error: 'Query is too long (max 500 characters)' };
  }

  return { valid: true };
}

function validateSource(source: string): { valid: boolean; error?: string } {
  if (!['scholar', 'patents'].includes(source)) {
    return { valid: false, error: 'Invalid source. Must be "scholar" or "patents"' };
  }
  return { valid: true };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { query, source = 'scholar', page = 1 } = body;

    // Validate input
    const queryValidation = validateSearchQuery(query);
    if (!queryValidation.valid) {
      return NextResponse.json(
        { success: false, error: queryValidation.error } as ApiResponse,
        { status: 400 }
      );
    }

    const sourceValidation = validateSource(source);
    if (!sourceValidation.valid) {
      return NextResponse.json(
        { success: false, error: sourceValidation.error } as ApiResponse,
        { status: 400 }
      );
    }

    const pageNum = typeof page === 'number' && page > 0 ? Math.floor(page) : 1;

    // Perform search based on source
    let results;
    let totalResults = 0;
    if (source === 'scholar') {
      const scholarData = await searchScholar(query, pageNum);
      results = scholarData.results;
      totalResults = scholarData.totalResults;
    } else {
      const patentData = await searchPatents(query);
      results = patentData.results;
      totalResults = patentData.totalResults;
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          results,
          query,
          source,
          page: pageNum,
          timestamp: new Date().toISOString(),
          resultCount: results.length,
          totalResults,
        },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Search API error:', error);

    // Don't expose sensitive error details
    const message = error instanceof Error ? error.message : 'An error occurred during search';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Search failed. Please try again.',
        message: process.env.NODE_ENV === 'development' ? message : undefined,
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// GET handler for related searches
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const source = (searchParams.get('source') || 'scholar') as 'scholar' | 'patents';

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' } as ApiResponse,
        { status: 400 }
      );
    }

    const relatedSearches = await generateRelatedSearches(query, source);

    return NextResponse.json(
      {
        success: true,
        data: { relatedSearches, query, source },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error('Related searches error:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to generate related searches' } as ApiResponse,
      { status: 500 }
    );
  }
}
