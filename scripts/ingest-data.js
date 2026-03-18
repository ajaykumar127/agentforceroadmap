const { pool, query } = require('../db/connection');
const { generateEmbeddingsBatch } = require('../services/openai-service');
const { roadmapDataV1, roadmapDataV2, roadmapDataV3 } = require('../data');
const releaseNotesData = require('../release-details');
require('dotenv').config();

/**
 * Prepare text for embedding from roadmap item
 */
function prepareRoadmapText(item) {
    let text = `${item.title}. ${item.description || ''}`;
    
    if (item.details) {
        if (item.details.overview) text += ` ${item.details.overview}`;
        if (item.details.keyFeatures) text += ` Features: ${item.details.keyFeatures.join(', ')}`;
        if (item.details.impact) text += ` Impact: ${item.details.impact}`;
    }
    
    text += ` Category: ${item.category}. Status: ${item.status}. Period: ${item.period || item.quarter}`;
    
    if (item.owner) text += ` Owner: ${item.owner}`;
    
    return text.trim();
}

/**
 * Prepare text for embedding from release note feature
 */
function prepareReleaseText(release, category, feature) {
    let text = `${feature.title}. ${feature.description || ''}`;
    
    if (feature.details) {
        if (feature.details.overview) text += ` ${feature.details.overview}`;
        if (feature.details.capabilities) text += ` Capabilities: ${feature.details.capabilities.join(', ')}`;
        if (feature.details.useCases) text += ` Use Cases: ${feature.details.useCases.join(', ')}`;
    }
    
    text += ` Release: ${release.name}. Category: ${category.name}. Status: ${feature.status}`;
    
    return text.trim();
}

/**
 * Ingest roadmap data
 */
async function ingestRoadmapData() {
    console.log('📊 Ingesting roadmap data...\n');

    // Combine V1, V2 and V3 data with version tags
    const v1Items = roadmapDataV1.map(item => ({ ...item, version: 'v1' }));
    const v2Items = roadmapDataV2.map(item => ({ ...item, version: 'v2' }));
    const v3Items = roadmapDataV3.map(item => ({ ...item, version: 'v3' }));
    const allItems = [...v1Items, ...v2Items, ...v3Items];

    console.log(`   Processing ${allItems.length} roadmap items...`);
    
    // Prepare texts for embedding
    const texts = allItems.map(item => prepareRoadmapText(item));
    
    // Generate embeddings in batches
    const batchSize = 100;
    const embeddings = [];
    
    for (let i = 0; i < texts.length; i += batchSize) {
        const batch = texts.slice(i, i + batchSize);
        console.log(`   Generating embeddings for items ${i + 1}-${Math.min(i + batchSize, texts.length)}...`);
        const batchEmbeddings = await generateEmbeddingsBatch(batch);
        embeddings.push(...batchEmbeddings);
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`   ✅ Generated ${embeddings.length} embeddings`);
    
    // Insert into database
    console.log('   Inserting into database...');
    let inserted = 0;
    
    for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i];
        const embedding = embeddings[i];
        
        try {
            await query(`
                INSERT INTO roadmap_items (
                    item_id, title, description, category, status, period, quarter, date,
                    owner, prd_link, version, overview, key_features, impact, technical_details, embedding
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                ON CONFLICT (id) DO NOTHING
            `, [
                item.id,
                item.title,
                item.description || null,
                item.category || null,
                item.status || null,
                item.period || null,
                item.quarter || null,
                item.date || null,
                item.owner || null,
                item.prdLink || null,
                item.version,
                item.details?.overview || null,
                item.details?.keyFeatures || null,
                item.details?.impact || null,
                item.details?.technicalDetails || null,
                JSON.stringify(embedding)
            ]);
            inserted++;
        } catch (error) {
            console.error(`   ⚠️  Error inserting item ${item.id}:`, error.message);
        }
    }
    
    console.log(`   ✅ Inserted ${inserted} roadmap items\n`);
}

/**
 * Ingest release notes data
 */
async function ingestReleaseNotes() {
    console.log('📰 Ingesting release notes...\n');
    
    const releases = Object.entries(releaseNotesData);
    let totalFeatures = 0;
    
    // Collect all features with their context
    const allFeatures = [];
    
    for (const [releaseId, release] of releases) {
        for (const category of release.categories) {
            for (const feature of category.features) {
                allFeatures.push({
                    releaseId,
                    release,
                    category,
                    feature
                });
                totalFeatures++;
            }
        }
    }
    
    console.log(`   Processing ${totalFeatures} features from ${releases.length} releases...`);
    
    // Prepare texts for embedding
    const texts = allFeatures.map(({ release, category, feature }) => 
        prepareReleaseText(release, category, feature)
    );
    
    // Generate embeddings in batches
    const batchSize = 100;
    const embeddings = [];
    
    for (let i = 0; i < texts.length; i += batchSize) {
        const batch = texts.slice(i, i + batchSize);
        console.log(`   Generating embeddings for features ${i + 1}-${Math.min(i + batchSize, texts.length)}...`);
        const batchEmbeddings = await generateEmbeddingsBatch(batch);
        embeddings.push(...batchEmbeddings);
        
        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`   ✅ Generated ${embeddings.length} embeddings`);
    
    // Insert into database
    console.log('   Inserting into database...');
    let inserted = 0;
    
    for (let i = 0; i < allFeatures.length; i++) {
        const { releaseId, release, category, feature } = allFeatures[i];
        const embedding = embeddings[i];
        
        try {
            await query(`
                INSERT INTO release_notes (
                    release_id, release_name, release_date, version, summary,
                    category, feature_id, feature_title, feature_status, feature_description,
                    feature_overview, capabilities, use_cases, availability, documentation_url, embedding
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            `, [
                releaseId,
                release.name,
                release.releaseDate || null,
                release.version || null,
                release.summary || null,
                category.name,
                feature.id,
                feature.title,
                feature.status,
                feature.description || null,
                feature.details?.overview || null,
                feature.details?.capabilities || null,
                feature.details?.useCases || null,
                feature.details?.availability || null,
                feature.details?.documentation || null,
                JSON.stringify(embedding)
            ]);
            inserted++;
        } catch (error) {
            console.error(`   ⚠️  Error inserting feature ${feature.id}:`, error.message);
        }
    }
    
    console.log(`   ✅ Inserted ${inserted} release features\n`);
}

/**
 * Main ingestion function
 */
async function ingestAll() {
    console.log('🚀 Starting data ingestion for Agentforce Roadmap RAG system\n');
    console.log('=' .repeat(70) + '\n');
    
    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await query('TRUNCATE TABLE roadmap_items, release_notes, chat_history RESTART IDENTITY CASCADE');
        console.log('   ✅ Cleared\n');
        
        // Ingest roadmap data
        await ingestRoadmapData();
        
        // Ingest release notes
        await ingestReleaseNotes();
        
        // Show statistics
        const roadmapCount = await query('SELECT COUNT(*) FROM roadmap_items');
        const releaseCount = await query('SELECT COUNT(*) FROM release_notes');
        
        console.log('=' .repeat(70));
        console.log('\n📊 Ingestion Statistics:');
        console.log(`   Roadmap Items: ${roadmapCount.rows[0].count}`);
        console.log(`   Release Features: ${releaseCount.rows[0].count}`);
        console.log(`   Total Documents: ${parseInt(roadmapCount.rows[0].count) + parseInt(releaseCount.rows[0].count)}`);
        
        console.log('\n🎉 Data ingestion complete!');
        console.log('\n📝 Next steps:');
        console.log('   1. Start the server: npm start');
        console.log('   2. Open the chat interface in the web portal');
        console.log('   3. Ask questions about the roadmap!');
        
    } catch (error) {
        console.error('❌ Error during ingestion:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

// Run ingestion
ingestAll().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});

