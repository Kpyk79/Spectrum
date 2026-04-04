const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Визначаємо головний файл (index.html або spectrum.html)
const getIndexFile = () => {
    if (fs.existsSync(path.join(__dirname, 'index.html'))) return 'index.html';
    if (fs.existsSync(path.join(__dirname, 'spectrum.html'))) return 'spectrum.html';
    return null;
};

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint: return env vars to the client
app.get('/api/env', (req, res) => {
    res.json({
        GROQ_API_KEY: (process.env.GROQ_API_KEY || '').trim(),
        GEMINI_API_KEY: (process.env.GEMINI_API_KEY || '').trim()
    });
});

// Fallback: serve the main HTML file
app.get('*', (req, res) => {
    const mainFile = getIndexFile();
    if (mainFile) {
        res.sendFile(path.join(__dirname, mainFile));
    } else {
        res.status(404).send('Головний файл (index.html або spectrum.html) не знайдено в репозиторії.');
    }
});

app.listen(PORT, () => {
    console.log(`TinySA Ultra running on port ${PORT}`);
});
