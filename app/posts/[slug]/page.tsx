import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

// ビルド時にNext.jsにどのページを生成すべきか教える関数
export async function generateStaticParams() {
  const supabase = createClient()
  // 公開されている記事のslugのみを取得
  const { data: posts } = await supabase.from('posts').select('slug').eq('published', true)

  if (!posts) {
    return []
  }

  // Supabaseから取得したslugのリストをNext.jsに渡す
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// ページ本体のコンポーネント
export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { slug } = params

  // URLのslugに基づいて、公開されている特定の記事データを1件取得
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true) // 公開されている記事のみ
    .single()

  // 記事が見つからなければ404ページを表示
  if (error || !post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <p className="mt-2 text-sm text-gray-500">
            Published on {new Date(post.created_at).toLocaleDateString()}
          </p>
          {post.image_url && (
            <div className="relative mt-6 h-96 w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* proseクラスで見やすいようにMarkdownのスタイルを調整 */}
        <article className="prose prose-lg max-w-none prose-indigo prose-img:rounded-xl">
          <ReactMarkdown>{post.body || ''}</ReactMarkdown>
        </article>
      </div>
    </main>
  )
}
