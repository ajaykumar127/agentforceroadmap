# Agentforce Roadmap V3 Update Summary

**Date:** March 18, 2026
**Source:** [Agentforce Public Roadmap SSOT](https://docs.google.com/presentation/d/11g5VdITfFogvlE83M43xRsS_Lnyn9KO_kGKoClSTtXI/)

## What Was Updated

### 1. **New Roadmap Version (V3)**
- ✅ Extracted **44 features** from the latest Q1-Q2 2026 roadmap presentation
- ✅ Parsed all slide content including speaker notes for detailed context
- ✅ Added V3 as a new data source alongside existing V1 and V2

### 2. **Feature Breakdown**

#### By Quarter:
- **Q1 2026:** 15 features
- **Q2 2026:** 15 features
- **Q4 2026:** 1 feature
- **TBD:** 13 features

#### By Status:
- **Planned:** 36 features
- **In Progress:** 3 features
- **Pilot:** 5 features

### 3. **Key Features Included**

**Q1 2026 Highlights:**
- Open Web Search as OOTB action
- Embeddable Prompt Composer
- Multi-turn conversation simulation and testing
- Agentforce Data Library DC1 Support (Phase 2)
- Enhanced analytics and optimization

**Q2 2026 Highlights:**
- Agent Conversation Memory (Closed Pilot)
- ADL as a Retriever Action
- Connection Variables Support
- Connection-level customization
- Subagents and Tools (rename from Topics/Actions)
- Developer Easy Self Service
- Agentforce Grid GA

### 4. **Files Modified**

#### Core Application Files:
1. **data.js**
   - Added `roadmapDataV3` array with all 44 features
   - Preserved V1 and V2 data intact
   - Structured format compatible with existing system

2. **app.js**
   - Updated `dataVersions` to include `v3`
   - Modified `updateVersionInfo()` to display V3 label
   - Set V3 as default version on load

3. **index.html**
   - Added V3 option to version selector dropdown
   - Set V3 as selected by default
   - Label: "V3 - Q1-Q2 2026 (Latest)"

4. **scripts/ingest-data.js**
   - Updated to import and ingest V3 data
   - Modified to combine V1, V2, and V3 for RAG embeddings
   - Will regenerate vector embeddings for chat functionality

### 5. **Data Extraction Process**

1. Downloaded PPTX presentation (186MB)
2. Extracted as ZIP archive to access XML content
3. Parsed 53 slides with Python scripts
4. Extracted structured data:
   - Title, description, timeline
   - Status (Pilot/In Progress/Planned)
   - Quarter mapping (Q1-Q4 2026)
   - Speaker notes with links to GUS, PRDs, showcases
5. Converted to JavaScript format matching existing schema

## How to Use

### View the Updated Roadmap

1. **Local Access:**
   ```bash
   cd ~/agentforce-roadmap
   npm start
   ```
   Open: http://localhost:3000

2. **Version Selector:**
   - Use dropdown in header to switch between V1, V2, V3, or Customer Facing views
   - V3 is now the default view

3. **Features:**
   - Timeline, Grid, and List views available
   - Filter by category, status, and quarter
   - Search functionality across all features
   - Click any card for detailed information

### Regenerate Chat Embeddings (Optional)

To enable AI chat with V3 data:

1. Set OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your-key-here
   ```

2. Re-ingest data:
   ```bash
   npm run ingest-data
   ```

This will generate embeddings for all V1, V2, and V3 features for the RAG chat system.

## Next Steps

### Recommended Actions:

1. **Test the Application:**
   - Review all 44 V3 features in the UI
   - Verify timeline and quarter mappings
   - Test search and filtering

2. **Refine Feature Data:**
   - Add proper titles for features currently showing "When:"
   - Categorize features (currently all marked as "feature")
   - Add key features lists for detail views
   - Extract product owners from notes

3. **Update RAG System:**
   - Add OPENAI_API_KEY to .env file
   - Run `npm run ingest-data` to enable chat
   - Test chat queries with V3 data

4. **Deploy to Heroku:**
   ```bash
   git add .
   git commit -m "Add V3 roadmap data with Q1-Q2 2026 features"
   git push heroku main
   heroku run npm run ingest-data
   ```

## Backup

Original data.js backed up to: `data.js.backup`

## Technical Notes

- Extraction source: `/tmp/agentforce_roadmap_content.json`
- Parsed features: `/tmp/agentforce_features_parsed.json`
- Generated JS: `/tmp/roadmap_data_v3.js`
- Server log: `/tmp/agentforce-server.log`

## Contact

For questions or issues with this update, refer to:
- Original presentation: [Google Slides SSOT](https://docs.google.com/presentation/d/11g5VdITfFogvlE83M43xRsS_Lnyn9KO_kGKoClSTtXI/)
- Project README: `README.md`
- RAG Setup Guide: `RAG_SETUP_GUIDE.md`

---

**Update completed successfully! ✅**

The agentforce-roadmap portal now includes the latest Q1-Q2 2026 roadmap features.
