import { blogs } from "@/data/blogs";

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogSlugLayout({ children }) {
  return children;
}
