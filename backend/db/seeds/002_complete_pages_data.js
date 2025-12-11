import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Service Key exists:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL and Service Key are required in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Complete pages data with URLs
const pagesData = [
  // About Page
  {
    category: "about",
    title: "About CoZone",
    keywords: ["about", "company", "mission", "vision", "history"],
    description: "CoZone is a premier coworking space provider offering flexible workspace solutions for freelancers, startups, and established companies. Our mission is to foster innovation and collaboration by providing inspiring work environments. We believe in creating spaces where creativity thrives and businesses grow.",
    url: "/about"
  },
  
  // Services Pages
  {
    category: "services",
    title: "Dedicated Desks",
    keywords: ["dedicated", "desk", "workspace", "individual", "personal"],
    description: "Our Dedicated Desks offer individual workspaces with personal storage. Perfect for freelancers and remote workers who need a consistent, professional environment. Comes with high-speed WiFi, printing/scanning access, coffee/tea, and access to meeting rooms. Enjoy the flexibility of a coworking community with the consistency of your own dedicated space.",
    url: "/services/dedicated-desk"
  },
  {
    category: "services",
    title: "Private Cabins",
    keywords: ["private", "cabin", "office", "team", "enclosed"],
    description: "Our Private Cabins are perfect for professionals and teams seeking a secure, quiet, and dedicated workspace. Enjoy the privacy of a lockable cabin where you can focus, strategize, and collaborate without distractions. These cabins cater to businesses that value confidentiality and productivity, offering a professional setting equipped with high-speed WiFi (wired & wireless), ergonomic chairs, and access to meeting rooms.",
    url: "/services/private-cabin"
  },
  {
    category: "services",
    title: "Conference Rooms",
    keywords: ["conference", "meeting", "room", "av", "equipment"],
    description: "Our Conference Rooms are bookable meeting spaces with advanced AV equipment. Perfect for client meetings, team collaborations, and presentations. Available hourly or daily. Equipped with high-definition displays, video conferencing capabilities, and professional sound systems to ensure your meetings are productive and impressive.",
    url: "/services/conference-rooms"
  },
  {
    category: "services",
    title: "Day Passes",
    keywords: ["day", "pass", "visitor", "occasional", "temporary"],
    description: "Day Passes provide flexible access for occasional visitors. Great for those who need a professional workspace for a day. Includes desk access, WiFi, and basic amenities. Perfect for traveling professionals, job seekers, or anyone needing a productive environment outside their home.",
    url: "/services/day-pass"
  },
  {
    category: "services",
    title: "Virtual Offices",
    keywords: ["virtual", "office", "address", "mail", "handling"],
    description: "Virtual Offices provide business address and mail handling services. Perfect for businesses that want a prestigious address without a physical office. Includes call handling and mail forwarding services. Maintain a professional presence with our premium business address and comprehensive virtual office solutions.",
    url: "/services/virtual-zone"
  },
  {
    category: "services",
    title: "Custom Built Office Spaces",
    keywords: ["custom", "built", "enterprise", "tailored", "space"],
    description: "Custom Built Office Spaces offer tailored solutions for larger enterprises. Work with our design team to create a workspace that perfectly fits your company's needs and culture. From private offices to open workspaces, we design and build spaces that reflect your brand and support your work style.",
    url: "/services/custom-built-office-spaces"
  },
  
  // Pricing/Plans Pages
  {
    category: "pricing",
    title: "Dedicated Desk Pricing",
    keywords: ["pricing", "cost", "desk", "monthly", "membership"],
    description: "Dedicated Desk: ₹4,999/month. Includes 24/7 access, high-speed WiFi, printing/scanning, coffee/tea, and access to meeting rooms. Cancel anytime with our flexible monthly plans. Perfect for individuals who need a consistent workspace with all the amenities of a premium office environment.",
    url: "/plans#dedicated-desk"
  },
  {
    category: "pricing",
    title: "Private Cabin Pricing",
    keywords: ["pricing", "cost", "private", "cabin", "monthly", "team"],
    description: "Private Cabin (4-person): ₹19,999/month. Includes everything in Dedicated Desk plus a fully enclosed office space for your team. Ideal for small teams or growing businesses that need privacy and a dedicated space to collaborate effectively.",
    url: "/plans#private-cabin"
  },
  {
    category: "pricing",
    title: "Conference Room Pricing",
    keywords: ["pricing", "cost", "conference", "room", "hourly", "meeting"],
    description: "Conference Room: ₹1,500 per hour. Book by the hour for meetings and presentations. Daily rates also available. Perfect for client presentations, team meetings, or training sessions with our professionally equipped meeting spaces.",
    url: "/plans#conference-rooms"
  },
  {
    category: "pricing",
    title: "Day Pass Pricing",
    keywords: ["pricing", "cost", "day", "pass", "daily", "visitor"],
    description: "Day Pass: ₹1,299 per day. Perfect for occasional visits. Includes desk access and basic amenities. Great for traveling professionals, job interviews, or anyone needing a productive workspace for the day.",
    url: "/plans#day-pass"
  },
  {
    category: "pricing",
    title: "Virtual Office Pricing",
    keywords: ["pricing", "cost", "virtual", "office", "monthly", "address"],
    description: "Virtual Office: ₹2,999 per month. Includes business address, mail handling, and call forwarding services. Maintain a professional presence without the overhead of a physical office space.",
    url: "/plans#virtual-office"
  },
  
  // Amenities Page
  {
    category: "amenities",
    title: "Office Amenities",
    keywords: ["amenities", "facilities", "wifi", "coffee", "printer", "kitchen"],
    description: "Our amenities include: High-speed WiFi, Printing/Scanning, Coffee/Tea, Meeting Rooms, Event Space, 24/7 Access, Ergonomic furniture, Pantry area, and Cleaning services. We provide everything you need for a productive and comfortable workday in a professional environment.",
    url: "/amenities"
  },
  
  // Location Information
  {
    category: "location",
    title: "CoZone Location",
    keywords: ["location", "address", "where", "bangalore", "map"],
    description: "Location: 123 Business Avenue, Tech Park, Bangalore - 560103. Easily accessible with excellent connectivity and parking. Located in the heart of Bangalore's tech district with convenient access to public transportation and major business centers.",
    url: "/#location"
  },
  
  // Operating Hours
  {
    category: "hours",
    title: "Operating Hours",
    keywords: ["hours", "timing", "open", "close", "schedule"],
    description: "Hours: Monday-Friday 8:00 AM - 8:00 PM, Saturday-Sunday 9:00 AM - 6:00 PM. 24/7 access available for dedicated members. Our spaces are designed to accommodate your schedule, whether you're an early bird or a night owl.",
    url: "/#hours"
  },
  
  // Booking Information
  {
    category: "booking",
    title: "How to Book",
    keywords: ["book", "reserve", "visit", "schedule", "appointment"],
    description: "To book a visit or reserve a workspace, you can: 1) Visit our website and use the online booking system, 2) Call us at +91 9154567444, or 3) Visit us in person during operating hours. Virtual tours are also available by appointment. Our team is ready to help you find the perfect workspace solution.",
    url: "/#booking"
  },
  
  // Policies
  {
    category: "policies",
    title: "Community Guidelines",
    keywords: ["policies", "rules", "guidelines", "community", "behavior"],
    description: "Our community guidelines promote a respectful and productive environment for all members. We encourage collaboration, respect diverse perspectives, and maintain professional standards. Noise levels should be appropriate for a shared workspace, and all members are expected to treat others with courtesy and consideration.",
    url: "/#policies"
  },
  
  // Contact Information
  {
    category: "contact",
    title: "Contact Us",
    keywords: ["contact", "support", "help", "phone", "email"],
    description: "Need assistance? Contact our support team at +91 9154567444 or email us at support@cozone.com. Our team is available during business hours to answer your questions and help with any issues. We're committed to providing exceptional service and support to all our members.",
    url: "/#contact"
  }
];

async function seedPagesData() {
  try {
    console.log('Seeding complete pages data with URLs...');
    
    // First, let's clear existing data to avoid duplicates
    console.log('Clearing existing data...');
    const { error: deleteError } = await supabase
      .from('cozone_chatbot_knowledge')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError) {
      console.error('Error clearing existing data:', deleteError);
      return;
    }
    
    // Now insert fresh data with URLs
    const { data, error } = await supabase
      .from('cozone_chatbot_knowledge')
      .insert(pagesData);

    if (error) {
      throw new Error(`Error seeding pages data: ${error.message}`);
    }

    console.log('Successfully seeded pages data with', pagesData.length, 'entries');
  } catch (error) {
    console.error('Error seeding pages data:', error);
  }
}

// Run the seed function
seedPagesData();