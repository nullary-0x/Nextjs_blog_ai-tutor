import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// =================================================================
// NOTE: Phase 1 完了のための一時的なシンプルクライアント
//
// 認証(Cookie)処理に起因するエラーを回避するため、
// Phase 2で必要になるまで、認証機能を完全に無効化します。
// これにより、まずは公開記事の読み取り機能(Phase 1)を完成させます。
// =================================================================

export function createClient() {
  // サーバーサイドで安全にデータを読み取るためだけのクライアントを作成
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
