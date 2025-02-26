import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qjrqdgzbcpnisxkpflzt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcnFkZ3piY3BuaXN4a3BmbHp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzA3NjYsImV4cCI6MjA1NjE0Njc2Nn0.lfWuqt498uUY3SR-AOphoCuHSbTpXlTGHr7_xExaeqo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
