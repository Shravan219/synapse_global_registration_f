import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these placeholders with your actual Supabase URL and anon key.
// For a real production app, use environment variables (e.g., process.env.REACT_APP_SUPABASE_URL)
const supabaseUrl = 'https://afdzgtbovsfftsfegzml.supabase.co'; // e.g., https://abcde12345.supabase.co
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZHpndGJvdnNmZnRzZmVnem1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODIxNjksImV4cCI6MjA3NTA1ODE2OX0.u0z-E9AR45jQGdiilKqk_CcCQRiYRlh-OjfgWz3XE8Y'; // e.g., eyJhbGciOiJIUzI1NiI...

export const supabase = createClient(supabaseUrl, supabaseAnonKey);