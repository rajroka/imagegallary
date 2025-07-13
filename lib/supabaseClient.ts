import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aewsdyeechdektdtfvzf.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('Missing Supabase anon key in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
