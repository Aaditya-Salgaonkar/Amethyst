import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://imcdkbydhnmmxzjqkcxk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltY2RrYnlkaG5tbXh6anFrY3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMDQ2NDEsImV4cCI6MjA1NTc4MDY0MX0.6ZleR78JhGeYR69uVyVNW2wqfPAT5bQ4or5DCN6970A";

export const supabase = createClient(supabaseUrl, supabaseKey);
