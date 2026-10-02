# Research Finder

**Find papers. Discover patents. Explore research — all in one place.**

Research Finder is a simple web application that helps students, researchers, and research scholars quickly discover **academic papers and patents** related to a topic.

Instead of searching different platforms separately, Research Finder brings both into one clean interface.

## Features

* Search research papers using **Google Scholar**
* Discover patents using **Google Patents**
* View publication, author, citation, and patent information
* Open the original paper or patent directly
* Explore related research searches
* Search history for previous queries
* Common queries for quick searches
* Responsive design for desktop, tablet, and mobile

## How It Works

1. Enter a research topic.
2. Choose **Google Scholar** or **Google Patents**.
3. Research Finder sends the query to SerpApi.
4. The returned data is processed and displayed in a simple interface.
5. Open the original source to explore the research further.

## SerpApi Usage

SerpApi is the core search data provider used by Research Finder.

### Google Scholar

The application uses SerpApi's **Google Scholar search** to retrieve relevant academic research, including:

* Paper titles
* Authors
* Publication information
* Publication year
* Citation counts
* Research snippets
* Original source links

### Google Patents

The application uses SerpApi's **Google Patents search** to discover relevant patents, including:

* Patent titles
* Patent numbers
* Inventors
* Publication dates
* Patent summaries
* Original patent links

The application sends the user's query to the appropriate SerpApi search engine, processes the response, and presents the results in a unified interface.

This allows Research Finder to bring academic literature and patent discovery together in one application.

## Tech Stack

* Next.js
* React
* TypeScript
* SerpApi
* Browser localStorage

## Run Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd research-finder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure SerpApi

Create a `.env.local` file in the project root:

```env
SERPAPI_KEY=your_serpapi_key_here
```

Never commit this file to GitHub.

### 4. Start the application

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Security

The SerpApi key is stored on the server using environment variables and is not exposed to the browser.

The `.env.local` file is excluded from version control using `.gitignore`.

## Why Research Finder?

Early-stage research often requires searching across multiple platforms for papers and patents.

Research Finder simplifies this process by bringing both into one place:

**Search → Discover → Explore**

## Future Improvements

* Advanced search filters
* Saved research collections
* Citation generation
* PDF integration
* Research recommendations
* Exporting search results
* User accounts and cloud synchronization

## License

MIT License
