
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fifutyhrguzdtbihpvsh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZnV0eWhyZ3V6ZHRiaWhwdnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NzQ3OTgsImV4cCI6MjA1NTU1MDc5OH0.Ggwne46b3P7n2hhrRetc4Ex8zzMHkKCfKO4eDbwSNKY'

export const supabase = createClient(supabaseUrl, supabaseKey)