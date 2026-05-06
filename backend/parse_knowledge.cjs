const fs = require('fs');

const sql = fs.readFileSync('c:/Users/sathi/Downloads/cozone_chatbot_knowledge_rows.sql', 'utf8');

const regex = /VALUES\s*\((.+)\);?/i;
const match = sql.match(regex);

if (match) {
    let valuesStr = match[1];

    // Split the string by "), ("
    const rowsStr = valuesStr.split(/\),\s*\(/);

    const data = rowsStr.map(rowStr => {
        // The format is:
        // 'id', 'category', 'title', ARRAY["k1", "k2"], 'description', 'created_at', null, 'url'

        // We can use a simpler approach based on exact format of this specific SQL dump
        const categoryMatch = rowStr.match(/^'[^']+'\s*,\s*'([^']+)'/);
        const category = categoryMatch ? categoryMatch[1] : '';

        // Matches the array literal: ARRAY["k1","k2"]
        const arrayMatch = rowStr.match(/ARRAY\[(.*?)\]/);
        let keywords = [];
        if (arrayMatch) {
            keywords = arrayMatch[1].split(',').map(s => s.replace(/"/g, ''));
        }

        // Remaining parts
        const idCatTitle = rowStr.split(/ARRAY\[/)[0];
        const afterArray = rowStr.split(/\]/)[1];

        const idCatParts = idCatTitle.split(/',\s*'/);
        // Usually: 'id', 'category', 'title'
        let title = '';
        if (idCatParts.length >= 3) {
            title = idCatParts[2].replace(/'\s*,\s*$/, '').replace(/''/g, "'");
        }

        const afterArrayParts = afterArray.split(/',\s*'/);
        let description = '';
        if (afterArrayParts.length >= 1) {
            description = afterArrayParts[0].replace(/^\s*,\s*'/, '').replace(/''/g, "'");
        }

        // Now extract URL
        // It is at the very end of the row string (e.g. , null, '/url') or , null, null)
        let url = null;
        const urlMatch = rowStr.match(/,\s*null\s*,\s*(null|'([^']+)')\s*$/);
        if (urlMatch) {
            if (urlMatch[1] !== 'null') {
                url = urlMatch[2];
            }
        }

        return { category, title, keywords, description, url };
    });

    const jsFile = `import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Validate environment
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

// Create Supabase client (service role for admin writes)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false }
});

// Enterprise-ready knowledge base
const knowledgeBase = ${JSON.stringify(data, null, 2)};

async function seedKnowledgeBase() {
  try {
    console.log('🚀 Starting enterprise knowledge sync...');

    // Clean existing data to avoid duplicates
    await supabase.from('cozone_chatbot_knowledge').delete().neq('title', '');

    const { data: result, error } = await supabase
      .from('cozone_chatbot_knowledge')
      .insert(knowledgeBase)
      .select();

    if (error) {
      throw error;
    }

    console.log(\`✅ Knowledge base synced successfully.\`);
    console.log(\`📊 Rows affected: \${result.length}\`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedKnowledgeBase();
`;

    fs.writeFileSync('db/seeds/001_initial_knowledge.js', jsFile);
    console.log('Successfully wrote to 001_initial_knowledge.js');
} else {
    console.log('No match found');
}
