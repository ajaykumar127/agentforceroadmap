const express = require('express');
const path = require('path');
const app = express();

// Set port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404s - send back to index.html (for client-side routing if needed)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Agentforce Roadmap server running on port ${PORT}`);
    console.log(`📍 Access at: http://localhost:${PORT}`);
});

