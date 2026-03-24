export interface Post {
  id: number;
  created_at: string;
  title: string;
  body: string | null;
  slug: string;
  image_url: string | null;
  published: boolean;
}
