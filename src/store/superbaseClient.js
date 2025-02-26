import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://urkwhebgqkxuvntqdqyh.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVya3doZWJncWt4dXZudHFkcXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NDAwOTcsImV4cCI6MjA1NjExNjA5N30.Hf4mDKrucjCZbKz-ZOezkDICT15hezNBZY8ZN3aVHEA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
