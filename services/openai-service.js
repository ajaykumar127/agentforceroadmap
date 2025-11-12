const OpenAI = require('openai');
require('dotenv').config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || 'text-embedding-3-small';
const CHAT_MODEL = process.env.CHAT_MODEL || 'gpt-4-turbo-preview';

/**
 * Generate embeddings for text using OpenAI
 * @param {string} text - Text to generate embeddings for
 * @returns {Promise<number[]>} - Embedding vector
 */
async function generateEmbedding(text) {
    try {
        const response = await openai.embeddings.create({
            model: EMBEDDING_MODEL,
            input: text,
            encoding_format: 'float'
        });
        
        return response.data[0].embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

/**
 * Generate embeddings for multiple texts in batch
 * @param {string[]} texts - Array of texts
 * @returns {Promise<number[][]>} - Array of embedding vectors
 */
async function generateEmbeddingsBatch(texts) {
    try {
        const response = await openai.embeddings.create({
            model: EMBEDDING_MODEL,
            input: texts,
            encoding_format: 'float'
        });
        
        return response.data.map(item => item.embedding);
    } catch (error) {
        console.error('Error generating embeddings batch:', error);
        throw error;
    }
}

/**
 * Generate chat completion using OpenAI
 * @param {Array} messages - Array of message objects
 * @param {Object} options - Additional options
 * @returns {Promise<string>} - Generated response
 */
async function generateChatCompletion(messages, options = {}) {
    try {
        const response = await openai.chat.completions.create({
            model: options.model || CHAT_MODEL,
            messages: messages,
            temperature: options.temperature || 0.7,
            max_tokens: options.maxTokens || 1000,
            top_p: options.topP || 1,
            frequency_penalty: options.frequencyPenalty || 0,
            presence_penalty: options.presencePenalty || 0
        });
        
        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error generating chat completion:', error);
        throw error;
    }
}

/**
 * Generate streaming chat completion
 * @param {Array} messages - Array of message objects
 * @param {Function} onChunk - Callback for each chunk
 * @param {Object} options - Additional options
 */
async function generateChatCompletionStream(messages, onChunk, options = {}) {
    try {
        const stream = await openai.chat.completions.create({
            model: options.model || CHAT_MODEL,
            messages: messages,
            temperature: options.temperature || 0.7,
            max_tokens: options.maxTokens || 1000,
            stream: true
        });
        
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                onChunk(content);
            }
        }
    } catch (error) {
        console.error('Error generating streaming completion:', error);
        throw error;
    }
}

module.exports = {
    generateEmbedding,
    generateEmbeddingsBatch,
    generateChatCompletion,
    generateChatCompletionStream,
    openai
};

