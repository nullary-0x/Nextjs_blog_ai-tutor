import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  // Define environment variables for Supabase connection
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Create and export the Supabase client for server-side usage
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          // The official Supabase SSR code example can cause a TypeScript error
          // because the `cookies()` function from `next/headers` returns a
          // `ReadonlyRequestCookies` object, which doesn't have a `set` method.
          // The try/catch block is intended to handle runtime errors when
          // called from a Server Component. To fix the TypeScript error,
          // we can cast cookieStore to `any`.
          (cookieStore as any).set({ name, value, ...options });
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          // Same as above for the remove method.
          (cookieStore as any).set({ name, value: '', ...options });
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
