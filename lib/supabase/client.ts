import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // Define environment variables for Supabase connection
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Create and export the Supabase client
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
