const fs = require('fs');
const path = require('path');
const { pool } = require('../db/connection');
require('dotenv').config();

async function setupDatabase() {
    console.log('🚀 Setting up Agentforce Roadmap database...\n');
    
    const client = await pool.connect();
    
    try {
        // Read schema file
        const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        console.log('📝 Executing schema...');
        await client.query(schema);
        console.log('✅ Database schema created successfully!\n');
        
        // Verify tables
        const tablesResult = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name;
        `);
        
        console.log('📊 Created tables:');
        tablesResult.rows.forEach(row => {
            console.log(`   - ${row.table_name}`);
        });
        
        // Verify pgvector extension
        const extensionResult = await client.query(`
            SELECT extname, extversion 
            FROM pg_extension 
            WHERE extname = 'vector';
        `);
        
        if (extensionResult.rows.length > 0) {
            console.log(`\n✅ pgvector extension installed (version ${extensionResult.rows[0].extversion})`);
        } else {
            console.log('\n⚠️  pgvector extension not found. Please install it:');
            console.log('   CREATE EXTENSION vector;');
        }
        
        console.log('\n🎉 Database setup complete!');
        console.log('\n📝 Next steps:');
        console.log('   1. Set your OPENAI_API_KEY in .env file');
        console.log('   2. Run: npm run ingest-data');
        
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run setup
setupDatabase().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});

