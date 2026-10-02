# Research Finder

A modern web application for discovering research papers and patents using Google Scholar and Google Patents.

## Features

- **Dual Search**: Search Google Scholar and Google Patents
- **Smart Results**: Rich formatting with citations, authors, publication info, and more
- **Related Research**: Discover related searches automatically
- **Search History**: Keep track of your searches locally
- **Common Queries**: Quick-access buttons for popular searches
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Fast & Secure**: Server-side API key handling, no exposure to browser

## Tech Stack

- **Framework**: Next.js 14+ with TypeScript
- **Frontend**: React 18 with modern CSS
- **Backend**: Next.js API Routes
- **Search API**: SerpApi (Google Scholar & Google Patents)
- **Storage**: Browser localStorage for search history

## Prerequisites

- Node.js 16+ and npm/yarn
- A SerpApi API key (get one at https://serpapi.com)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
SERPAPI_KEY=your_serpapi_key_here
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/mnt/project/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.ts          # Search API endpoint
│   ├── components/
│   │   ├── ScholarCard.tsx        # Research paper card
│   │   ├── PatentCard.tsx         # Patent card
│   │   ├── SearchHistory.tsx      # Search history sidebar
│   │   ├── CommonQueries.tsx      # Quick query buttons
│   │   ├── RelatedResearch.tsx    # Related searches
│   │   ├── LoadingState.tsx       # Loading indicator
│   │   ├── ErrorState.tsx         # Error display
│   │   └── EmptyState.tsx         # No results display
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main app component
├── lib/
│   ├── types.ts                   # TypeScript type definitions
│   ├── serpapi.ts                 # SerpApi integration
│   └── searchHistory.ts           # Search history management
├── .env.local                     # Environment variables (not in git)
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── next.config.js                 # Next.js config
└── README.md                      # This file
```

## API Routes

### POST /api/search

Performs a search using SerpApi.

**Request**:
```json
{
  "query": "machine learning",
  "source": "scholar"  // or "patents"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "scholar-0",
        "title": "...",
        "authors": ["Author 1"],
        "publication": "Journal Name",
        "year": 2024,
        "snippet": "...",
        "citedCount": 42,
        "url": "https://..."
      }
    ],
    "query": "machine learning",
    "source": "scholar",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### GET /api/search

Generates related search suggestions.

**Parameters**:
- `query`: Search query string
- `source`: "scholar" or "patents"

**Response**:
```json
{
  "success": true,
  "data": {
    "relatedSearches": [
      "machine learning",
      "machine learning research",
      "machine learning study",
      "machine learning analysis",
      "machine learning technology"
    ],
    "query": "machine learning",
    "source": "scholar"
  }
}
```

## Usage Guide

### Basic Search

1. Enter a search query in the search bar
2. Select "Google Scholar" or "Google Patents"
3. Click "Search" or press Enter
4. Results will display with detailed information

### Common Queries

Click any button in the "Common Queries" section to instantly search for popular topics.

### Search History

Your search history is automatically saved locally. Click any previous search to run it again. Use the ✕ button to remove individual searches.

### Related Research

After a search, explore related variations to discover more relevant results.

## Security Considerations

- ✅ API key is stored only on the server (`.env.local`)
- ✅ Never expose `SERPAPI_KEY` to the frontend
- ✅ Input validation on all API requests
- ✅ Error messages don't leak sensitive information
- ✅ Never commit `.env.local` to version control

## Testing

### Test Google Scholar Search

1. Search: "machine learning underwater object detection"
2. Verify results show papers with titles, authors, citations

### Test Google Patents Search

1. Search: "solar panel efficiency"
2. Verify results show patents with numbers, inventors, dates

### Test Common Queries

1. Click any "Common Queries" button
2. Verify search runs immediately with new source

### Test Search History

1. Perform multiple searches
2. Verify searches appear in "Search History"
3. Click a history item to re-run search
4. Click ✕ to remove from history

### Test Error Handling

1. Try searching with empty query
2. Verify error message displays
3. Fix query and click "Try Again"

### Test Responsive Design

1. Resize browser window
2. Test on mobile device
3. Verify layout adapts properly

## Troubleshooting

### "Search failed" error

- **Cause**: Invalid or missing SerpApi key
- **Solution**: 
  1. Verify `.env.local` contains `SERPAPI_KEY`
  2. Check the key at https://serpapi.com/dashboard
  3. Restart the dev server

### "Query cannot be empty" error

- **Cause**: Submitting blank search
- **Solution**: Enter at least one character

### No results found

- **Cause**: Query returned no matches from Google Scholar/Patents
- **Solution**: Try different keywords or more general terms

### Slow searches

- **Cause**: Network or SerpApi rate limiting
- **Solution**: Wait a moment and try again

### localStorage errors

- **Cause**: Browser privacy mode or old browsers
- **Solution**: Search history will work when privacy mode is disabled

## API Rate Limiting

SerpApi has rate limits based on your subscription:
- Free tier: ~100 requests/month
- Paid tiers: Higher limits available

## Performance Tips

- Use specific keywords for better results
- Related searches are only generated for successful queries
- Search history stores up to 20 most recent searches
- Results are cached during the session

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Advanced filtering (publication year, citation count)
- [ ] Saved research collections
- [ ] PDF download integration
- [ ] Research paper recommendations
- [ ] Citation format generation (APA, MLA, Chicago)
- [ ] User accounts and cloud sync
- [ ] Dark mode theme
- [ ] Export search results

## License

MIT

## Support

For issues or questions, please refer to:
- [SerpApi Documentation](https://serpapi.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## Contributing

Pull requests are welcome. For major changes, please open an issue first.
