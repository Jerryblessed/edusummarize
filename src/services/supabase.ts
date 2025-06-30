import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvduxczupmlsyxjmbhif.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZHV4Y3p1cG1sc3l4am1iaGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2OTc5NjAsImV4cCI6MjA2NTI3Mzk2MH0.tybvw_I0CJDKFbQ3rdKKPIdejl1C6Jco8j6Zyj_8JXY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);