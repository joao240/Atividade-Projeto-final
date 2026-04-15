import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://SUA_URL.supabase.co',
  'SUA_ANON_KEY'
);