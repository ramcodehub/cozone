const fs = require('fs');

const envContent = `PORT=5001
SUPABASE_URL=https://aadcldlmhpnxdnrmubym.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhZGNsZGxtaHBueGRucm11YnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDE1MDUsImV4cCI6MjA3NDQ3NzUwNX0.Ne2a9NXpoTvyWNg0yH0R4jxE6JkRR096RWxOeKRBulA`;

fs.writeFileSync('.env', envContent);
console.log('.env file created successfully');