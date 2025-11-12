-- Agentforce Roadmap Database Schema with pgvector for RAG

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Table for storing roadmap items with embeddings
CREATE TABLE IF NOT EXISTS roadmap_items (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50),
    status VARCHAR(50),
    period VARCHAR(50),
    quarter VARCHAR(50),
    date VARCHAR(50),
    owner VARCHAR(255),
    prd_link TEXT,
    version VARCHAR(10) NOT NULL, -- 'v1' or 'v2'
    overview TEXT,
    key_features TEXT[], -- Array of features
    impact TEXT,
    technical_details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    embedding vector(1536) -- OpenAI embedding dimension
);

-- Table for storing release notes with embeddings
CREATE TABLE IF NOT EXISTS release_notes (
    id SERIAL PRIMARY KEY,
    release_id VARCHAR(50) NOT NULL,
    release_name VARCHAR(255) NOT NULL,
    release_date VARCHAR(50),
    version VARCHAR(50),
    summary TEXT,
    category VARCHAR(100),
    feature_id VARCHAR(100),
    feature_title TEXT NOT NULL,
    feature_status VARCHAR(50),
    feature_description TEXT,
    feature_overview TEXT,
    capabilities TEXT[],
    use_cases TEXT[],
    availability TEXT,
    documentation_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    embedding vector(1536)
);

-- Table for storing chat history
CREATE TABLE IF NOT EXISTS chat_history (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    user_message TEXT NOT NULL,
    assistant_message TEXT NOT NULL,
    context_items JSONB, -- Store retrieved context
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for vector similarity search
CREATE INDEX IF NOT EXISTS roadmap_items_embedding_idx 
    ON roadmap_items USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);

CREATE INDEX IF NOT EXISTS release_notes_embedding_idx 
    ON release_notes USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 100);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS roadmap_items_version_idx ON roadmap_items(version);
CREATE INDEX IF NOT EXISTS roadmap_items_status_idx ON roadmap_items(status);
CREATE INDEX IF NOT EXISTS roadmap_items_category_idx ON roadmap_items(category);
CREATE INDEX IF NOT EXISTS release_notes_release_id_idx ON release_notes(release_id);
CREATE INDEX IF NOT EXISTS chat_history_session_id_idx ON chat_history(session_id);
CREATE INDEX IF NOT EXISTS chat_history_created_at_idx ON chat_history(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_roadmap_items_updated_at BEFORE UPDATE ON roadmap_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_release_notes_updated_at BEFORE UPDATE ON release_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- View for combined search across all content
CREATE OR REPLACE VIEW all_content AS
SELECT 
    'roadmap' as content_type,
    id,
    item_id as reference_id,
    title,
    description,
    category,
    status,
    version,
    embedding
FROM roadmap_items
UNION ALL
SELECT 
    'release' as content_type,
    id,
    release_id as reference_id,
    feature_title as title,
    feature_description as description,
    category,
    feature_status as status,
    release_name as version,
    embedding
FROM release_notes;

