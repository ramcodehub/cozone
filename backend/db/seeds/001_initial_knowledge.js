import { createClient } from '@supabase/supabase-js';
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
const knowledgeBase = [
  {
    category: "services",
    title: "Dedicated Desks",
    keywords: ["dedicated", "desk", "workspace", "individual", "personal"],
    description: "Dedicated Desks: Individual workspaces with personal storage. Includes high-speed WiFi, printing/scanning, coffee/tea, and 24/7 access.",
    url: "/services/dedicated-desk"
  },
  {
    category: "services",
    title: "Private Cabins",
    keywords: ["private", "cabin", "office", "team", "enclosed"],
    description: "Private Cabins: Fully enclosed offices for teams. Includes all amenities and 24/7 secure access.",
    url: "/services/private-cabin"
  },
  {
    category: "services",
    title: "Conference Rooms",
    keywords: ["conference", "meeting", "room", "av", "equipment"],
    description: "Conference Rooms: Bookable meeting spaces with advanced AV equipment and high-speed internet.",
    url: "/services/conference-rooms"
  },
  {
    category: "pricing",
    title: "Private Cabin Pricing",
    keywords: ["pricing", "cost", "private", "cabin", "monthly"],
    description: "For pricing details and customized plans, please contact us at +91 9458222234 or email cozonehyd@gmail.com",
    url: "/plans#private-cabin"
  },
  {
    category: "hours",
    title: "Operating Hours",
    keywords: ["hours", "timing", "open", "24/7"],
    description: "We are open 24/7 with round-the-clock secure access for members.",
    url: "/hours"
  },
  {
    category: "contact",
    title: "Contact Information",
    keywords: ["contact", "phone", "email", "support"],
    description: "Reach us at +91 9458222234 or cozonehyd@gmail.com. Our team is available 24/7.",
    url: "/contact"
  }
];

async function seedKnowledgeBase() {
  try {
    console.log('🚀 Starting enterprise knowledge sync...');

    const { data, error } = await supabase
      .from('cozone_chatbot_knowledge')
      .upsert(knowledgeBase, {
        onConflict: 'title',  // must have unique index on title
        ignoreDuplicates: false
      })
      .select();

    if (error) {
      throw error;
    }

    console.log(`✅ Knowledge base synced successfully.`);
    console.log(`📊 Rows affected: ${data.length}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedKnowledgeBase();