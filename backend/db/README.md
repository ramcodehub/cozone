# Database Migrations

This folder contains SQL scripts for setting up the database tables used by the CoZone application.

## Migration Files

1. `001_chatbot_tables.sql` - Creates tables for the chatbot functionality
2. `002_contact_enquiry_tables.sql` - Creates tables for contact forms and service enquiries

## How to Run Migrations

To apply these migrations to your Supabase database:

1. Log in to your Supabase dashboard
2. Navigate to the SQL editor
3. Copy and paste the contents of each migration file into the editor
4. Run each script in numerical order

Alternatively, you can run these migrations using the Supabase CLI:

```bash
supabase db push
```

## Tables Created

### enquiries
Stores service enquiry submissions from users:
- `id` - Unique identifier
- `full_name` - Customer's full name
- `mobile` - Customer's mobile number
- `email` - Customer's email address
- `message` - Customer's message
- `service` - The service they're enquiring about
- `created_at` - Timestamp of submission

### contact_messages
Stores general contact form submissions:
- `id` - Unique identifier
- `full_name` - Customer's full name
- `email` - Customer's email address
- `company_name` - Customer's company name
- `phone` - Customer's phone number
- `message` - Customer's message
- `created_at` - Timestamp of submission