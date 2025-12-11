# CoZone - Modern Coworking Space Platform

![CoZone Banner](frontend/src/assets/logos/cozone-logo.png)

CoZone is a modern, responsive web platform for a coworking space business. The platform features a sleek design with comprehensive information about services, pricing plans, amenities, and facilities. It also includes an AI-powered chat assistant to help users with inquiries about the coworking space.

## 🏢 Project Overview

CoZone provides flexible workspace solutions including dedicated desks, private cabins, conference rooms, day passes, virtual offices, and custom-built office spaces. The platform is designed to attract freelancers, startups, and established companies looking for professional work environments.

## 📁 Project Structure

```
CoZone/
├── backend/
│   ├── config/                 # Configuration files
│   ├── controllers/            # Request handlers
│   ├── db/
│   │   ├── migrations/         # Database schema definitions
│   │   └── seeds/              # Initial data population scripts
│   ├── routes/                 # API route definitions
│   ├── scripts/                # Utility scripts
│   ├── services/               # Business logic implementations
│   ├── utils/                  # Helper functions
│   ├── .env                    # Environment variables
│   ├── server.js               # Main server entry point
│   └── package.json            # Backend dependencies
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images, icons, and media
│   │   ├── components/         # Reusable UI components
│   │   ├── config/             # Configuration files
│   │   ├── data/               # Static data files
│   │   ├── pages/              # Page components
│   │   ├── styles/             # Global styles
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # Application entry point
│   ├── index.html              # HTML template
│   └── package.json            # Frontend dependencies
├── AI_ASSISTANT_README.md      # AI assistant documentation
├── AI_ASSISTANT_SETUP.md       # AI assistant setup guide
└── README.md                   # This file
```

## 🚀 Technologies Used

### Frontend
- **React 18+** - JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **React Router DOM** - Declarative routing for React applications
- **Framer Motion** - Production-ready motion library for React
- **Bootstrap 5** - CSS framework for responsive design
- **AOS (Animate On Scroll)** - Library for scroll animations
- **CSS Modules** - Scoped CSS for component styling

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Supabase** - Open-source Firebase alternative (Database & Authentication)
- **Google Generative AI (Gemini)** - AI chatbot functionality
- **Nodemailer** - Module for sending emails
- **Express Rate Limit** - Middleware for rate limiting

## 🎯 Key Features

### Frontend Features
- **Responsive Design** - Fully mobile-responsive layout
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Multi-page Application** - Comprehensive site navigation
- **Interactive Components** - Animated elements and transitions
- **Floating Action Buttons** - WhatsApp and Call buttons for easy contact
- **AI Chat Assistant** - Intelligent virtual assistant for customer inquiries

### Backend Features
- **RESTful API** - Well-structured API endpoints
- **Rate Limiting** - Protection against API abuse
- **Session Management** - Conversation state persistence
- **Input Validation & Sanitization** - Security measures for user input
- **Database Integration** - Supabase PostgreSQL database
- **AI-Powered Chatbot** - Gemini API integration for intelligent responses
- **Contact Form Handling** - Email notifications and database storage

## 🤖 AI Assistant Functionality

The CoZone platform includes an AI-powered chat assistant that helps users with inquiries about services, pricing, location, and more.

### Features:
- Natural language processing with Google Gemini API
- Context-aware conversations with session management
- Knowledge base with information about services, pricing, and policies
- Rate limiting to prevent API abuse
- Conversation logging for analytics

### Knowledge Base Categories:
- Services (Dedicated Desks, Private Cabins, Conference Rooms, etc.)
- Pricing information for all service offerings
- Location and operating hours
- Amenities and facilities
- Booking procedures

## 🗂️ Database Schema

The application uses Supabase PostgreSQL with the following tables:

### Chatbot Tables
- `cozone_chatbot_knowledge` - Stores knowledge base entries for the AI assistant
- `cozone_chatbot_logs` - Logs all chatbot interactions for analytics

### Contact Tables
- `contact_messages` - Stores general contact form submissions
- `enquiries` - Stores service-specific enquiry submissions

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- Google AI Studio API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   - Supabase credentials
   - Google Gemini API key
   - Email configuration (optional)

5. Set up Supabase tables using the SQL scripts in `db/migrations/`

6. Seed initial knowledge base data:
   ```bash
   node db/seeds/001_initial_knowledge.js
   ```

7. Start the server:
   ```bash
   npm run dev    # Development mode
   npm start      # Production mode
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🌐 API Endpoints

### AI Assistant
- `POST /api/ai` - Submit chatbot requests

### Contact Forms
- `POST /contact` - Submit general contact form
- `POST /enquiry` - Submit service-specific enquiry

### Health Check
- `GET /health` - Server health status

## 📱 UI Components

### Core Pages
- Home Page
- About Us
- Services (Dedicated Desks, Private Cabins, Conference Rooms, etc.)
- Pricing Plans
- Amenities
- Gallery

### Interactive Components
- Header with Navigation
- Hero Section
- Service Cards
- Facilities Showcase
- Testimonial Carousel
- Contact Form
- Footer with Social Links

### Floating Elements
- AI Chat Assistant Widget
- WhatsApp Contact Button
- Call Button

## 🔧 Development Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run migrate` - Run database migrations
- `npm run setup-tables` - Set up database tables
- `npm run test-tables` - Create test records

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🛡️ Security Features

- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Environment variable protection
- Secure session management

## 📈 Performance Optimizations

- Lazy loading for images
- Code splitting
- Efficient component rendering
- Optimized animations
- Responsive image handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

## 👥 Authors

- CoZone Development Team

## 📞 Support

For support, contact the CoZone team at [support@cozone.in](mailto:support@cozone.in) or use the contact form on the website.