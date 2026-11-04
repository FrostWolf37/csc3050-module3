const express = require('express');
const app = express();
const PORT = 5000;

// Parse incoming JSON request bodies
app.use(express.json());

// In-memory data store (no database needed for this mini-lab)
const quotes = [
  { id: 1, quote: "Do or do not. There is no try.", author: "Yoda" },
  { id: 2, quote: "Any man who must say 'I am the king' is no true king.", author: "Tywin Lannister" },
  { id: 3, quote: "You shall not pass!", author: "Gandalf" }
];

// GET /api/quotes - Returns list of quotes with HTTP 200 OK
app.get('/api/quotes', (req, res) => {
  res.status(200).json(quotes);
});

// GET /api/quotes/:id - Returns single quote or structured 404 error
app.get('/api/quotes/:id', (req, res) => {
  const quoteId = parseInt(req.params.id, 10);
  const foundQuote = quotes.find((q) => q.id === quoteId);

  if (!foundQuote) {
    return res.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: `No quote with id ${req.params.id}`
      }
    });
  }

  res.status(200).json(foundQuote);
});

app.listen(PORT, () => {
  console.log(`Backend Express server listening at http://localhost:${PORT}`);
});