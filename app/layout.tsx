import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Finder - Discover Papers and Patents',
  description: 'Search Google Scholar and Google Patents with ease. Find research papers, patents, and related resources.',
  keywords: ['research', 'scholar', 'patents', 'papers', 'search'],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
