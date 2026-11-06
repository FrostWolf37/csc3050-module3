import { useState, useEffect } from 'react';

export default function QuotesList() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Relative path forwarded by the Vite proxy to http://localhost:3001/api/quotes
    fetch('/api/quotes')
      .then(async (response) => {
        if (!response.ok) {
          // If Express returned 404/500, read the error JSON from your contract
          const errorBody = await response.json().catch(() => null);
          const message = errorBody?.error?.message || `HTTP ${response.status} returned`;
          throw new Error(message);
        }
        return response.json();
      })
      .then((data) => {
        setQuotes(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // State 1: In-flight
  if (loading) {
    return <p role="status">Loading quotes...</p>;
  }

  // State 2: Request failed
  if (error) {
    return (
      <div style={{ padding: '1rem', border: '1px solid #b42318', background: '#fff5f5', borderRadius: '6px' }}>
        <p style={{ color: '#b42318', margin: 0, fontWeight: 'bold' }}>Error Loading Quotes</p>
        <p style={{ color: '#555', margin: '0.25rem 0 0' }}>{error}</p>
      </div>
    );
  }

  // State 3: Success
  return (
    <section>
      <h2>Quotes Collection</h2>
      <ul>
        {quotes.map((item) => (
          <li key={item.id} style={{ marginBottom: '0.75rem' }}>
            <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
            <cite>&mdash; {item.author}</cite>
          </li>
        ))}
      </ul>
    </section>
  );
}