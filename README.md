# 🚀 Agentforce Roadmap Portal

An interactive, AI-powered roadmap portal for Agentforce features with intelligent RAG (Retrieval-Augmented Generation) chat capabilities.

![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.x-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ✨ Features

### 📊 Roadmap Views
- **V1 Core Roadmap** - 17 essential features
- **V2 Extended Roadmap** - 40 comprehensive features with product owners & PRD links
- **Customer Facing Release Notes** - Winter '26, Summer '25, Spring '25, Winter '25
- **Multiple View Modes** - Timeline, Grid, and List views
- **Advanced Filtering** - By category, status, and quarter
- **Search Functionality** - Find features instantly

### 🤖 AI-Powered Chat (NEW!)
- **RAG Architecture** - Retrieval-Augmented Generation with PostgreSQL + pgvector
- **Natural Language Queries** - Ask questions in plain English
- **Contextual Answers** - AI responses based on actual roadmap data
- **Source Citations** - See which features informed each answer
- **Chat History** - Persistent conversation tracking
- **Smart Suggestions** - Quick question prompts

### 🎨 Modern UI/UX
- **Professional Theme** - Clean, modern design system
- **Dark/Light Mode** - Toggle with persistent preference
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Polished user experience
- **Accessible** - WCAG compliant

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Static)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ HTML/CSS │  │ Roadmap  │  │ Release  │  │   Chat   │   │
│  │   UI     │  │   Data   │  │  Notes   │  │  Widget  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓ API Calls
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Express.js)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              RAG Service Layer                        │  │
│  │  • Query Processing  • Context Retrieval             │  │
│  │  • Answer Generation • History Management            │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────┬─────────────────────────┬──────────────────────┘
             │                         │
             ↓                         ↓
┌────────────────────────┐  ┌──────────────────────────┐
│  PostgreSQL + pgvector │  │     OpenAI API           │
│  • Vector Embeddings   │  │  • text-embedding-3-small│
│  • Similarity Search   │  │  • gpt-4-turbo-preview   │
│  • Chat History        │  │  • Completions           │
└────────────────────────┘  └──────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.x
- **PostgreSQL** >= 15 with pgvector extension
- **OpenAI API Key** (for chat functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/ajaykumar127/agentforceroadmap.git
cd agentforceroadmap

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and OPENAI_API_KEY

# Setup database
npm run setup-db

# Ingest data (generates embeddings)
npm run ingest-data

# Start the server
npm start
```

Open http://localhost:3000 and start exploring!

---

## 📖 Documentation

- **[RAG Setup Guide](RAG_SETUP_GUIDE.md)** - Complete setup instructions for the chat system
- **[Heroku Deployment](HEROKU_DEPLOYMENT.md)** - Deploy to Heroku with Postgres
- **[Theme Guide](THEME_GUIDE.md)** - Design system documentation
- **[Dark Theme Guide](DARK_THEME_GUIDE.md)** - Dark mode implementation

---

## 🎯 Usage

### Roadmap Portal

1. **Switch Versions** - Use the dropdown to toggle between V1, V2, and Customer Facing views
2. **Change Views** - Click Timeline, Grid, or List icons
3. **Filter** - Select category, status, or quarter
4. **Search** - Type to find specific features
5. **View Details** - Click any feature card for full information

### AI Chat

1. **Open Chat** - Click the chat button (bottom right)
2. **Ask Questions** - Type naturally, e.g., "What features are coming in Q1 2025?"
3. **View Sources** - See which features informed the answer
4. **Continue Conversation** - Chat history is preserved

#### Example Questions

- "What features are coming in Q1 2025?"
- "Tell me about Slack integration"
- "What's new in Winter '26?"
- "Who owns the Agent Analytics feature?"
- "Show me all completed features"
- "What are the WhatsApp capabilities?"

---

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3** - Modern semantic markup
- **Vanilla JavaScript** - No framework dependencies
- **CSS Variables** - Dynamic theming
- **LocalStorage** - Persistent preferences

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pgvector** - Vector similarity search
- **OpenAI API** - Embeddings & completions

### Deployment
- **Heroku** - Cloud platform
- **Heroku Postgres** - Managed database
- **Git** - Version control

---

## 📁 Project Structure

```
agentforce-roadmap/
├── index.html              # Main HTML file
├── styles.css              # Main stylesheet
├── chat.css                # Chat widget styles
├── app.js                  # Roadmap application logic
├── chat.js                 # Chat widget frontend
├── data.js                 # Roadmap data (V1 & V2)
├── release-details.js      # Release notes data
├── server.js               # Express server
├── package.json            # Node dependencies
├── Procfile                # Heroku configuration
├── .env.example            # Environment template
├── .gitignore              # Git ignore rules
│
├── db/
│   ├── schema.sql          # Database schema
│   └── connection.js       # Database connection pool
│
├── services/
│   ├── openai-service.js   # OpenAI API integration
│   └── rag-service.js      # RAG logic
│
├── scripts/
│   ├── setup-database.js   # Database setup script
│   └── ingest-data.js      # Data ingestion script
│
└── docs/
    ├── RAG_SETUP_GUIDE.md
    ├── HEROKU_DEPLOYMENT.md
    ├── THEME_GUIDE.md
    └── DARK_THEME_GUIDE.md
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/agentforce_roadmap

# OpenAI
OPENAI_API_KEY=sk-your-api-key-here

# Server
PORT=3000
NODE_ENV=development

# Chat
MAX_CONTEXT_ITEMS=5
EMBEDDING_MODEL=text-embedding-3-small
CHAT_MODEL=gpt-4-turbo-preview
```

### Database Setup

```bash
# Create database
createdb agentforce_roadmap

# Run schema
npm run setup-db

# Ingest data
npm run ingest-data
```

---

## 🌐 Deployment

### Heroku

```bash
# Create app
heroku create agentforce-roadmap

# Add PostgreSQL
heroku addons:create heroku-postgresql:essential-0

# Enable pgvector
heroku pg:psql
CREATE EXTENSION vector;
\q

# Set environment
heroku config:set OPENAI_API_KEY=sk-your-key

# Deploy
git push heroku main

# Setup database
heroku run npm run setup-db
heroku run npm run ingest-data

# Open app
heroku open
```

See [HEROKU_DEPLOYMENT.md](HEROKU_DEPLOYMENT.md) for detailed instructions.

---

## 🧪 Testing

### Test API Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What features are in Q1 2025?"}'

# Search
curl -X POST http://localhost:3000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "Slack", "limit": 5}'
```

### Manual Testing

1. Open http://localhost:3000
2. Test all views (Timeline, Grid, List)
3. Test filters and search
4. Toggle dark/light theme
5. Open chat and ask questions
6. Verify sources are displayed

---

## 📊 Database Schema

### Key Tables

**roadmap_items** - Stores V1 & V2 roadmap features
- 40 items with embeddings
- Includes owners, PRD links, status

**release_notes** - Stores customer-facing release notes
- 47 features across 4 releases
- Includes capabilities, use cases

**chat_history** - Stores conversation history
- Session-based tracking
- Context preservation

See [db/schema.sql](db/schema.sql) for complete schema.

---

## 🤝 Contributing

### Adding New Features

1. Update `data.js` or `release-details.js`
2. Run `npm run ingest-data` to regenerate embeddings
3. Test in the portal and chat

### Modifying Chat Behavior

Edit `services/rag-service.js`:
- Adjust `MAX_CONTEXT_ITEMS` for more/less context
- Modify system prompt for different tone
- Change similarity threshold

### Styling Changes

- `styles.css` - Main portal styles
- `chat.css` - Chat widget styles
- Use CSS variables for theming

---

## 🐛 Troubleshooting

### Chat Not Working

1. Check OpenAI API key: `heroku config`
2. Verify database connection: `heroku pg:info`
3. Check logs: `heroku logs --tail`

### No Search Results

1. Verify data ingestion: `SELECT COUNT(*) FROM roadmap_items;`
2. Check embeddings: `SELECT COUNT(*) FROM roadmap_items WHERE embedding IS NOT NULL;`
3. Re-run ingestion: `npm run ingest-data`

### Database Connection Failed

1. Check `DATABASE_URL` format
2. Verify PostgreSQL is running
3. Test connection: `psql $DATABASE_URL`

See [RAG_SETUP_GUIDE.md](RAG_SETUP_GUIDE.md) for more troubleshooting.

---

## 📈 Roadmap

### Upcoming Features

- [ ] Multi-language support
- [ ] Export to PDF/Excel
- [ ] Email notifications for updates
- [ ] Advanced analytics dashboard
- [ ] Integration with Jira/Asana
- [ ] Voice chat interface
- [ ] Mobile app

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Ajay Kumar**
- GitHub: [@ajaykumar127](https://github.com/ajaykumar127)
- Email: ajaykumar@salesforce.com

---

## 🙏 Acknowledgments

- **Salesforce** - For Agentforce platform
- **OpenAI** - For GPT-4 and embeddings API
- **pgvector** - For PostgreSQL vector extension
- **Heroku** - For hosting platform

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ajaykumar127/agentforceroadmap/issues)
- **Documentation**: See `/docs` folder
- **Email**: ajaykumar@salesforce.com

---

## 🎉 Live Demo

**Production**: https://agentforce-roadmap-f730ba3f6113.herokuapp.com/

**Features**:
- ✅ V1 & V2 Roadmaps (40 features)
- ✅ Customer Release Notes (4 releases)
- ✅ AI-Powered Chat (RAG)
- ✅ Dark/Light Theme
- ✅ Responsive Design

---

**Built with ❤️ for the Agentforce team**

**Version**: 4.0.0 | **Last Updated**: November 12, 2025
