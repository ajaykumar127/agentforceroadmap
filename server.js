const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { generateAnswer, getChatHistory, searchSimilarContent } = require('./services/rag-service');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Chat API endpoints
app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        const session = sessionId || `session-${Date.now()}`;
        
        console.log(`💬 Chat request: "${message}" (session: ${session})`);
        
        // Generate answer using RAG
        const result = await generateAnswer(message, session);
        
        res.json({
            answer: result.answer,
            sources: result.sources,
            context: result.context,
            sessionId: session
        });
        
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ 
            error: 'Failed to generate response',
            message: error.message 
        });
    }
});

// Get chat history
app.get('/api/chat/history/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        
        const history = await getChatHistory(sessionId, limit);
        
        res.json({ history });
        
    } catch (error) {
        console.error('Error getting chat history:', error);
        res.status(500).json({ 
            error: 'Failed to retrieve chat history',
            message: error.message 
        });
    }
});

// Search endpoint (for testing)
app.post('/api/search', async (req, res) => {
    try {
        const { query, limit } = req.body;
        
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }
        
        const results = await searchSimilarContent(query, limit || 5);
        
        res.json({ results });
        
    } catch (error) {
        console.error('Error in search endpoint:', error);
        res.status(500).json({ 
            error: 'Search failed',
            message: error.message 
        });
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Agentforce Roadmap server running on port ${PORT}`);
    console.log(`📍 Access at: http://localhost:${PORT}`);
    console.log(`💬 Chat API: http://localhost:${PORT}/api/chat`);
    console.log(`🔍 Search API: http://localhost:${PORT}/api/search`);
});
