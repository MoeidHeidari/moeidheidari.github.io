import BlogClient from "./blog-client";
import { getBlogPosts } from "./utils";


export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  const allPosts = getBlogPosts()
    .slice()
    .sort((a, b) => {
      const left = new Date(a.pushedAt ?? a.metadata.publishedAt).getTime();
      const right = new Date(b.pushedAt ?? b.metadata.publishedAt).getTime();
      return right - left;
    });

  return <BlogClient posts={allPosts} />
}
