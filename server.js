const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname), {
    index: 'spectrum.html'
}));

// API endpoint: return env vars to the client
app.get('/api/env', (req, res) => {
    res.json({
        GROQ_API_KEY: process.env.GROQ_API_KEY || '',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || ''
    });
});

// Fallback: serve spectrum.html for any unknown route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'spectrum.html'));
});

app.listen(PORT, () => {
    console.log(`TinySA Ultra running on port ${PORT}`);
});
