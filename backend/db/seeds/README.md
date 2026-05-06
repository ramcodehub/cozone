# CoZone Chatbot Database Seeds

This directory contains seed scripts to populate the chatbot knowledge base with initial data.

## Seed Scripts

### 001_initial_knowledge.js

This script populates the `cozone_chatbot_knowledge` table with initial knowledge base entries covering:

- Services offered by CoZone
- Pricing information
- Location details
- Operating hours
- Amenities
- Booking procedures

## Running Seeds

To run the seed scripts:

1. Make sure you're in the backend directory:
   ```bash
   cd backend
   ```

2. Ensure you have the required environment variables set in your `.env` file:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`

3. Run the seed script:
   ```bash
   node db/seeds/001_initial_knowledge.js
   ```

## Adding New Seeds

To add new seed data:

1. Create a new seed file with the next sequential number (e.g., `002_additional_data.js`)
2. Follow the same pattern as the existing seed file
3. Include appropriate error handling
4. Document the purpose of the seed data in this README

## Seed Data Structure

Each knowledge base entry contains:

- `category`: Classification of the information (e.g., "services", "pricing")
- `title`: Short descriptive title
- `keywords`: Array of relevant keywords for search
- `description`: Detailed information about the topic