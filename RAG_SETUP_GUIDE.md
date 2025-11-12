# 🤖 RAG Chat System Setup Guide

Complete guide to setting up the Retrieval-Augmented Generation (RAG) chat system for the Agentforce Roadmap portal.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Local Setup](#local-setup)
4. [Heroku Deployment](#heroku-deployment)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The RAG chat system allows users to ask natural language questions about the Agentforce Roadmap and get intelligent answers based on:

- **V1 & V2 Roadmap Items** (40 features)
- **Release Notes** (Winter '26, Summer '25, Spring '25, Winter '25)
- **Product Owners & PRD Links**
- **Feature Status & Timelines**

### Architecture

```
User Question
     ↓
OpenAI Embeddings (text-embedding-3-small)
     ↓
PostgreSQL + pgvector (Vector Similarity Search)
     ↓
Retrieve Top 5 Most Relevant Items
     ↓
OpenAI GPT-4 (Generate Answer with Context)
     ↓
Display Answer with Sources
```

---

## 📦 Prerequisites

### 1. PostgreSQL with pgvector

**Option A: Local PostgreSQL**

```bash
# macOS (Homebrew)
brew install postgresql@15
brew services start postgresql@15

# Install pgvector extension
git clone https://github.com/pgvector/pgvector.git
cd pgvector
make
make install
```

**Option B: Docker**

```bash
docker run -d \
  --name agentforce-postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=agentforce_roadmap \
  -p 5432:5432 \
  pgvector/pgvector:pg15
```

**Option C: Heroku Postgres** (for production)

```bash
heroku addons:create heroku-postgresql:essential-0 -a agentforce-roadmap
```

### 2. OpenAI API Key

Get your API key from: https://platform.openai.com/api-keys

---

## 🚀 Local Setup

### Step 1: Install Dependencies

```bash
cd ~/agentforce-roadmap
npm install
```

This installs:
- `express` - Web server
- `pg` & `pgvector` - PostgreSQL client with vector support
- `openai` - OpenAI API client
- `dotenv` - Environment variables
- `cors` & `body-parser` - API middleware

### Step 2: Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/agentforce_roadmap

# OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-api-key-here

# Server Configuration
PORT=3000
NODE_ENV=development

# Chat Configuration
MAX_CONTEXT_ITEMS=5
EMBEDDING_MODEL=text-embedding-3-small
CHAT_MODEL=gpt-4-turbo-preview
```

### Step 3: Create Database

```bash
# Create database
createdb agentforce_roadmap

# Or using psql
psql -U postgres
CREATE DATABASE agentforce_roadmap;
\q
```

### Step 4: Setup Database Schema

```bash
npm run setup-db
```

This will:
- ✅ Enable pgvector extension
- ✅ Create tables (`roadmap_items`, `release_notes`, `chat_history`)
- ✅ Create vector indexes for similarity search
- ✅ Set up triggers and views

Expected output:
```
🚀 Setting up Agentforce Roadmap database...

📝 Executing schema...
✅ Database schema created successfully!

📊 Created tables:
   - roadmap_items
   - release_notes
   - chat_history

✅ pgvector extension installed (version 0.5.1)

🎉 Database setup complete!
```

### Step 5: Ingest Data

```bash
npm run ingest-data
```

This will:
- ✅ Generate embeddings for all roadmap items (V1 & V2)
- ✅ Generate embeddings for all release notes
- ✅ Store embeddings in PostgreSQL with pgvector

Expected output:
```
🚀 Starting data ingestion for Agentforce Roadmap RAG system

📊 Ingesting roadmap data...
   Processing 40 roadmap items...
   Generating embeddings for items 1-40...
   ✅ Generated 40 embeddings
   Inserting into database...
   ✅ Inserted 40 roadmap items

📰 Ingesting release notes...
   Processing 47 features from 4 releases...
   Generating embeddings for features 1-47...
   ✅ Generated 47 embeddings
   Inserting into database...
   ✅ Inserted 47 release features

📊 Ingestion Statistics:
   Roadmap Items: 40
   Release Features: 47
   Total Documents: 87

🎉 Data ingestion complete!
```

**⏱️ Time:** ~2-3 minutes (depends on OpenAI API rate limits)

**💰 Cost:** ~$0.01 (OpenAI embeddings are very cheap)

### Step 6: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Expected output:
```
✅ Connected to PostgreSQL database
🚀 Agentforce Roadmap server running on port 3000
📍 Access at: http://localhost:3000
💬 Chat API: http://localhost:3000/api/chat
🔍 Search API: http://localhost:3000/api/search
```

### Step 7: Test the Chat

1. Open http://localhost:3000
2. Click the chat button (bottom right)
3. Ask a question: "What features are coming in Q1 2025?"
4. See the AI-powered response with sources!

---

## 🌐 Heroku Deployment

### Step 1: Add Heroku Postgres

```bash
# Add PostgreSQL addon (requires credit card, but free tier available)
heroku addons:create heroku-postgresql:essential-0 -a agentforce-roadmap

# Wait for provisioning
heroku pg:wait -a agentforce-roadmap
```

### Step 2: Enable pgvector Extension

```bash
# Connect to Heroku Postgres
heroku pg:psql -a agentforce-roadmap

# Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

# Verify
\dx vector

# Exit
\q
```

### Step 3: Set Environment Variables

```bash
# Set OpenAI API key
heroku config:set OPENAI_API_KEY=sk-your-actual-api-key-here -a agentforce-roadmap

# Set other config (optional)
heroku config:set MAX_CONTEXT_ITEMS=5 -a agentforce-roadmap
heroku config:set EMBEDDING_MODEL=text-embedding-3-small -a agentforce-roadmap
heroku config:set CHAT_MODEL=gpt-4-turbo-preview -a agentforce-roadmap

# Verify
heroku config -a agentforce-roadmap
```

### Step 4: Deploy Code

```bash
cd ~/agentforce-roadmap

# Commit new changes
git add .
git commit -m "Add RAG chat system with PostgreSQL and OpenAI"

# Push to Heroku
git push heroku main
```

### Step 5: Setup Database on Heroku

```bash
# Run setup script
heroku run npm run setup-db -a agentforce-roadmap
```

### Step 6: Ingest Data on Heroku

```bash
# Run ingestion script
heroku run npm run ingest-data -a agentforce-roadmap
```

**⚠️ Note:** This may take 3-5 minutes on Heroku's free tier.

### Step 7: Verify Deployment

```bash
# Check logs
heroku logs --tail -a agentforce-roadmap

# Open app
heroku open -a agentforce-roadmap
```

---

## 🧪 Testing

### Test API Endpoints

**1. Health Check**

```bash
curl http://localhost:3000/health
```

**2. Chat Endpoint**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What features are coming in Q1 2025?",
    "sessionId": "test-session"
  }'
```

**3. Search Endpoint**

```bash
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Slack integration",
    "limit": 5
  }'
```

### Test Queries

Try these questions in the chat:

1. **Timeline Questions:**
   - "What features are coming in Q1 2025?"
   - "Show me all completed features"
   - "What's planned for 2026?"

2. **Feature-Specific:**
   - "Tell me about Slack integration"
   - "What are the Agent Analytics capabilities?"
   - "Who owns the WhatsApp integration?"

3. **Release Notes:**
   - "What's new in Winter '26?"
   - "Tell me about Agentforce features in Summer '25"
   - "What Einstein features are available?"

4. **Status & Ownership:**
   - "Which features are in beta?"
   - "Show me features owned by Sarah Chen"
   - "Where can I find the PRD for Agent Builder?"

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'pg'"

**Solution:**
```bash
npm install
```

### Issue: "pgvector extension not found"

**Solution:**

```bash
# Connect to database
psql -d agentforce_roadmap

# Install extension
CREATE EXTENSION IF NOT EXISTS vector;

# Verify
\dx vector
```

### Issue: "OpenAI API error: Invalid API key"

**Solution:**

1. Check your API key at https://platform.openai.com/api-keys
2. Update `.env` file:
   ```env
   OPENAI_API_KEY=sk-your-actual-key-here
   ```
3. Restart server

### Issue: "Database connection failed"

**Solution:**

Check `DATABASE_URL` in `.env`:

```env
# Format: postgresql://username:password@host:port/database
DATABASE_URL=postgresql://postgres:password@localhost:5432/agentforce_roadmap
```

Test connection:
```bash
psql $DATABASE_URL
```

### Issue: "No results returned from search"

**Possible causes:**

1. **Data not ingested:** Run `npm run ingest-data`
2. **Embeddings not generated:** Check OpenAI API key
3. **Empty database:** Verify with:
   ```sql
   SELECT COUNT(*) FROM roadmap_items;
   SELECT COUNT(*) FROM release_notes;
   ```

### Issue: "Heroku deployment fails"

**Solution:**

1. Check buildpack:
   ```bash
   heroku buildpacks -a agentforce-roadmap
   # Should show: heroku/nodejs
   ```

2. Check logs:
   ```bash
   heroku logs --tail -a agentforce-roadmap
   ```

3. Verify Procfile exists:
   ```bash
   cat Procfile
   # Should show: web: node server.js
   ```

---

## 📊 Database Schema

### roadmap_items

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| item_id | INTEGER | Roadmap item ID |
| title | TEXT | Feature title |
| description | TEXT | Feature description |
| category | VARCHAR(50) | Feature category |
| status | VARCHAR(50) | Current status |
| version | VARCHAR(10) | V1 or V2 |
| owner | VARCHAR(255) | Product owner |
| prd_link | TEXT | PRD document link |
| embedding | vector(1536) | OpenAI embedding |

### release_notes

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| release_id | VARCHAR(50) | Release identifier |
| release_name | VARCHAR(255) | Release name |
| feature_title | TEXT | Feature title |
| feature_description | TEXT | Feature description |
| category | VARCHAR(100) | Feature category |
| embedding | vector(1536) | OpenAI embedding |

### chat_history

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| session_id | VARCHAR(255) | User session ID |
| user_message | TEXT | User's question |
| assistant_message | TEXT | AI response |
| context_items | JSONB | Retrieved context |
| created_at | TIMESTAMP | Message timestamp |

---

## 💡 Tips & Best Practices

### 1. Optimize Costs

- Use `text-embedding-3-small` (cheaper than `text-embedding-ada-002`)
- Cache embeddings (don't regenerate unless data changes)
- Use `gpt-3.5-turbo` for development, `gpt-4` for production

### 2. Improve Accuracy

- Increase `MAX_CONTEXT_ITEMS` for more context (but higher costs)
- Fine-tune system prompt in `rag-service.js`
- Add more metadata to embeddings

### 3. Monitor Usage

```bash
# Check OpenAI usage
# Visit: https://platform.openai.com/usage

# Check database size
heroku pg:info -a agentforce-roadmap
```

### 4. Update Data

When roadmap changes:

```bash
# Re-run ingestion
npm run ingest-data

# Or on Heroku
heroku run npm run ingest-data -a agentforce-roadmap
```

---

## 📚 Additional Resources

- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- [Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql)
- [RAG Best Practices](https://www.pinecone.io/learn/retrieval-augmented-generation/)

---

## 🎉 You're All Set!

Your RAG chat system is now ready to answer questions about the Agentforce Roadmap!

**Next Steps:**
1. Test the chat with various questions
2. Monitor OpenAI API usage
3. Customize the system prompt for better responses
4. Add more data sources as needed

**Questions?** Check the troubleshooting section or review the code in:
- `services/rag-service.js` - RAG logic
- `services/openai-service.js` - OpenAI integration
- `db/schema.sql` - Database schema
- `chat.js` - Frontend chat widget

---

**Created:** November 12, 2025  
**Version:** 4.0.0  
**Status:** Production Ready 🚀

