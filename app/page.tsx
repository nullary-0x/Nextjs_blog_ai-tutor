import { createClient } from '@/lib/supabase/server'
import { Post } from '@/lib/supabase/types'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  // ステップ1で作った関数をここで「使う」
  const supabase = createClient()
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <p className="text-center text-red-500">エラーが発生しました: {error.message}</p>
  }

  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">投稿がまだありません。</p>
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Next.js Blog</h1>
          <p className="mt-2 text-gray-600">
            Supabase + Next.js で作ったブログ
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post: Post) => (
            <Link href={`/posts/${post.slug}`} key={post.id}>
              <article className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
                {post.image_url && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
