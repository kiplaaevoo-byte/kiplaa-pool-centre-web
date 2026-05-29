import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  "https://gmztdtxnajbiutkvlbji.supabase.co";

const SUPABASE_ANON_KEY =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtenRkdHhuYWpiaXV0a3ZsYmppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNDg3MzMsImV4cCI6MjA5NTYyNDczM30.34AfnOaJY_b_a7wTa7HU2Y7p3YKe1EBOkL9Ncu8eLcY";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);