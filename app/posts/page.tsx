'use client';

// Mock data for blog posts. In the next step, we'll fetch this from Supabase.
const posts = [
  {
    id: 1,
    title: 'First Post',
    slug: 'first-post',
    content: 'This is the content of the first post.',
    published_at: '2024-01-01',
  },
  {
    id: 2,
    title: 'Second Post',
    slug: 'second-post',
    content: 'This is the content of the second post.',
    published_at: '2024-01-02',
  },
  {
    id: 3,
    title: 'A New Beginning',
    slug: 'a-new-beginning',
    content: 'Welcome to the new blog!',
    published_at: '2024-01-03',
  },
];

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">My Blog</h1>
        <p className="mt-2 text-gray-600">
          Welcome to my Next.js and Supabase powered blog.
        </p>

        <ul className="mt-8 space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <a href={`/posts/${post.slug}`}>
                <h2 className="text-xl font-semibold text-gray-900 hover:text-indigo-600">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{new Date(post.published_at).toLocaleDateString()}</p>
                <p className="mt-2 text-sm text-gray-700">{post.content.substring(0, 100)}...</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
