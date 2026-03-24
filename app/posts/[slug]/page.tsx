'use client';

import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

// Mock data for blog posts with Markdown content.
const posts = [
  {
    id: 1,
    title: 'First Post',
    slug: 'first-post',
    content: '# First Post\n\nThis is the *full content* of the **first post**. \n\n- List item 1\n- List item 2\n\nCheck out [Google](https://google.com)',
    published_at: '2024-01-01',
  },
  {
    id: 2,
    title: 'Second Post',
    slug: 'second-post',
    content: '# Second Post\n\nExploring further topics here with `code` snippets.',
    published_at: '2024-01-02',
  },
  {
    id: 3,
    title: 'A New Beginning',
    slug: 'a-new-beginning',
    content: '# A New Beginning\n\nWelcome to the new blog! This post marks the start of our journey.',
    published_at: '2024-01-03',
  },
];

export default function PostPage() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">Post not found</h1>
          <p className="mt-2 text-gray-600">Sorry, we couldn't find the post you're looking for.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <article className="prose lg:prose-xl">
          <h1>{post.title}</h1>
          <p className="text-sm text-gray-500">Published on {new Date(post.published_at).toLocaleDateString()}</p>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
