const { query } = require('../db/connection');
const { generateEmbedding, generateChatCompletion } = require('./openai-service');

const MAX_CONTEXT_ITEMS = parseInt(process.env.MAX_CONTEXT_ITEMS) || 5;

/**
 * Search for similar content using vector similarity
 * @param {string} queryText - User's query
 * @param {number} limit - Number of results to return
 * @returns {Promise<Array>} - Array of similar items
 */
async function searchSimilarContent(queryText, limit = MAX_CONTEXT_ITEMS) {
    try {
        // Generate embedding for the query
        const queryEmbedding = await generateEmbedding(queryText);
        
        // Search in roadmap items
        const roadmapResults = await query(`
            SELECT 
                'roadmap' as content_type,
                item_id,
                title,
                description,
                category,
                status,
                period,
                quarter,
                owner,
                prd_link,
                version,
                overview,
                key_features,
                impact,
                1 - (embedding <=> $1::vector) as similarity
            FROM roadmap_items
            WHERE embedding IS NOT NULL
            ORDER BY embedding <=> $1::vector
            LIMIT $2
        `, [JSON.stringify(queryEmbedding), Math.ceil(limit / 2)]);
        
        // Search in release notes
        const releaseResults = await query(`
            SELECT 
                'release' as content_type,
                release_id,
                release_name,
                feature_title as title,
                feature_description as description,
                category,
                feature_status as status,
                capabilities,
                use_cases,
                documentation_url,
                1 - (embedding <=> $1::vector) as similarity
            FROM release_notes
            WHERE embedding IS NOT NULL
            ORDER BY embedding <=> $1::vector
            LIMIT $2
        `, [JSON.stringify(queryEmbedding), Math.ceil(limit / 2)]);
        
        // Combine and sort by similarity
        const allResults = [
            ...roadmapResults.rows,
            ...releaseResults.rows
        ].sort((a, b) => b.similarity - a.similarity).slice(0, limit);
        
        return allResults;
    } catch (error) {
        console.error('Error searching similar content:', error);
        throw error;
    }
}

/**
 * Generate context string from retrieved items
 * @param {Array} items - Retrieved items
 * @returns {string} - Formatted context
 */
function formatContext(items) {
    if (!items || items.length === 0) {
        return 'No relevant information found in the roadmap.';
    }
    
    let context = 'Here is relevant information from the Agentforce Roadmap:\n\n';
    
    items.forEach((item, index) => {
        context += `[${index + 1}] `;
        
        if (item.content_type === 'roadmap') {
            context += `**${item.title}**\n`;
            context += `Version: ${item.version.toUpperCase()}\n`;
            context += `Status: ${item.status}\n`;
            context += `Category: ${item.category}\n`;
            context += `Period: ${item.period || item.quarter}\n`;
            if (item.owner) context += `Owner: ${item.owner}\n`;
            if (item.description) context += `Description: ${item.description}\n`;
            if (item.overview) context += `Overview: ${item.overview}\n`;
            if (item.key_features && item.key_features.length > 0) {
                context += `Key Features: ${item.key_features.join(', ')}\n`;
            }
            if (item.impact) context += `Impact: ${item.impact}\n`;
            if (item.prd_link) context += `PRD: ${item.prd_link}\n`;
        } else if (item.content_type === 'release') {
            context += `**${item.title}** (${item.release_name})\n`;
            context += `Status: ${item.status}\n`;
            context += `Category: ${item.category}\n`;
            if (item.description) context += `Description: ${item.description}\n`;
            if (item.capabilities && item.capabilities.length > 0) {
                context += `Capabilities: ${item.capabilities.join(', ')}\n`;
            }
            if (item.use_cases && item.use_cases.length > 0) {
                context += `Use Cases: ${item.use_cases.join(', ')}\n`;
            }
            if (item.documentation_url) context += `Documentation: ${item.documentation_url}\n`;
        }
        
        context += `Relevance: ${(item.similarity * 100).toFixed(1)}%\n\n`;
    });
    
    return context;
}

/**
 * Generate answer using RAG
 * @param {string} userQuestion - User's question
 * @param {string} sessionId - Session ID for chat history
 * @returns {Promise<Object>} - Answer and context
 */
async function generateAnswer(userQuestion, sessionId = 'default') {
    try {
        // Retrieve similar content
        const similarItems = await searchSimilarContent(userQuestion);
        
        // Format context
        const context = formatContext(similarItems);
        
        // Build system prompt
        const systemPrompt = `You are an AI assistant for the Agentforce Roadmap portal. Your role is to help users understand the roadmap, features, release notes, and timelines.

Guidelines:
- Answer questions based ONLY on the provided context from the roadmap
- Be specific and cite information from the context
- If the context doesn't contain enough information, say so clearly
- Provide feature names, timelines, owners, and links when available
- Be concise but informative
- Use a professional and helpful tone
- Format your responses with markdown for better readability

Context Information:
${context}`;

        // Generate response
        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userQuestion }
        ];
        
        const answer = await generateChatCompletion(messages, {
            temperature: 0.7,
            maxTokens: 800
        });
        
        // Save to chat history
        await saveChatHistory(sessionId, userQuestion, answer, similarItems);
        
        return {
            answer,
            context: similarItems,
            sources: similarItems.length
        };
    } catch (error) {
        console.error('Error generating answer:', error);
        throw error;
    }
}

/**
 * Save chat interaction to history
 * @param {string} sessionId - Session ID
 * @param {string} userMessage - User's message
 * @param {string} assistantMessage - Assistant's response
 * @param {Array} contextItems - Retrieved context items
 */
async function saveChatHistory(sessionId, userMessage, assistantMessage, contextItems) {
    try {
        await query(`
            INSERT INTO chat_history (session_id, user_message, assistant_message, context_items)
            VALUES ($1, $2, $3, $4)
        `, [sessionId, userMessage, assistantMessage, JSON.stringify(contextItems)]);
    } catch (error) {
        console.error('Error saving chat history:', error);
        // Don't throw - chat history is not critical
    }
}

/**
 * Get chat history for a session
 * @param {string} sessionId - Session ID
 * @param {number} limit - Number of messages to retrieve
 * @returns {Promise<Array>} - Chat history
 */
async function getChatHistory(sessionId, limit = 10) {
    try {
        const result = await query(`
            SELECT user_message, assistant_message, created_at
            FROM chat_history
            WHERE session_id = $1
            ORDER BY created_at DESC
            LIMIT $2
        `, [sessionId, limit]);
        
        return result.rows.reverse();
    } catch (error) {
        console.error('Error getting chat history:', error);
        return [];
    }
}

module.exports = {
    searchSimilarContent,
    formatContext,
    generateAnswer,
    getChatHistory
};

