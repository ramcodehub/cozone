import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL and Service Key are required in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initial knowledge base data
const initialKnowledge = [
  {
    category: "services",
    title: "Dedicated Desks",
    keywords: ["desk", "workspace", "individual", "personal"],
    description: "Dedicated Desks: Individual workspaces with personal storage. Perfect for freelancers and remote workers who need a consistent, professional environment. Comes with high-speed WiFi, printing/scanning access, and coffee/tea."
  },
  {
    category: "services",
    title: "Private Cabins",
    keywords: ["private", "office", "team", "enclosed"],
    description: "Private Cabins: Fully enclosed offices for teams of 2-20 people. Ideal for startups and growing businesses that need privacy and dedicated space. Includes all amenities plus 24/7 access."
  },
  {
    category: "services",
    title: "Conference Rooms",
    keywords: ["meeting", "conference", "room", "av", "equipment"],
    description: "Conference Rooms: Bookable meeting spaces with advanced AV equipment. Perfect for client meetings, team collaborations, and presentations. Available hourly or daily."
  },
  {
    category: "services",
    title: "Day Passes",
    keywords: ["day", "pass", "visitor", "occasional"],
    description: "Day Passes: Flexible access for occasional visitors. Great for those who need a professional workspace for a day. Includes desk access, WiFi, and basic amenities."
  },
  {
    category: "services",
    title: "Virtual Offices",
    keywords: ["virtual", "address", "mail", "handling"],
    description: "Virtual Offices: Business address and mail handling services. Perfect for businesses that want a prestigious address without a physical office. Includes call handling and mail forwarding."
  },
  {
    category: "services",
    title: "Custom Built Office Spaces",
    keywords: ["custom", "built", "enterprise", "tailored"],
    description: "Custom Built Office Spaces: Tailored solutions for larger enterprises. Work with our design team to create a workspace that perfectly fits your company's needs and culture."
  },
  {
    category: "pricing",
    title: "Dedicated Desk Pricing",
    keywords: ["price", "cost", "desk", "monthly"],
    description: "Dedicated Desk: ₹4,999/month. Includes 24/7 access, high-speed WiFi, printing/scanning, coffee/tea, and access to meeting rooms."
  },
  {
    category: "pricing",
    title: "Private Cabin Pricing",
    keywords: ["price", "cost", "private", "cabin", "monthly"],
    description: "Private Cabin (4-person): ₹19,999/month. Includes everything in Dedicated Desk plus a fully enclosed office space for your team."
  },
  {
    category: "pricing",
    title: "Conference Room Pricing",
    keywords: ["price", "cost", "conference", "room", "hourly"],
    description: "Conference Room: ₹1,500 per hour. Book by the hour for meetings and presentations. Daily rates also available."
  },
  {
    category: "pricing",
    title: "Day Pass Pricing",
    keywords: ["price", "cost", "day", "pass", "daily"],
    description: "Day Pass: ₹1,299 per day. Perfect for occasional visits. Includes desk access and basic amenities."
  },
  {
    category: "pricing",
    title: "Virtual Office Pricing",
    keywords: ["price", "cost", "virtual", "office", "monthly"],
    description: "Virtual Office: ₹2,999 per month. Includes business address, mail handling, and call forwarding services."
  },
  {
    category: "location",
    title: "CoZone Location",
    keywords: ["location", "address", "where", "bangalore"],
    description: "Location: 123 Business Avenue, Tech Park, Bangalore - 560103. Easily accessible with excellent connectivity and parking."
  },
  {
    category: "hours",
    title: "Operating Hours",
    keywords: ["hours", "timing", "open", "close", "schedule"],
    description: "Hours: Monday-Friday 8:00 AM - 8:00 PM, Saturday-Sunday 9:00 AM - 6:00 PM. 24/7 access available for dedicated members."
  },
  {
    category: "amenities",
    title: "Amenities",
    keywords: ["amenities", "facilities", "wifi", "coffee", "printer"],
    description: "Amenities include: High-speed WiFi, Printing/Scanning, Coffee/Tea, Meeting Rooms, Event Space, 24/7 Access, Ergonomic furniture, Pantry area, and Cleaning services."
  },
  {
    category: "booking",
    title: "How to Book",
    keywords: ["book", "reserve", "visit", "schedule", "appointment"],
    description: "To book a visit or reserve a workspace, you can: 1) Visit our website and use the online booking system, 2) Call us at +91 9154567444, or 3) Visit us in person during operating hours. Virtual tours are also available by appointment."
  }
];

async function seedKnowledgeBase() {
  try {
    console.log('Seeding knowledge base with initial data...');
    
    const { data, error } = await supabase
      .from('cozone_chatbot_knowledge')
      .insert(initialKnowledge);

    if (error) {
      throw new Error(`Error seeding knowledge base: ${error.message}`);
    }

    console.log('Successfully seeded knowledge base with', initialKnowledge.length, 'entries');
  } catch (error) {
    console.error('Error seeding knowledge base:', error);
  }
}

// Run the seed function
seedKnowledgeBase();