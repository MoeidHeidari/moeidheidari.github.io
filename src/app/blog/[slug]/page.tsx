import { notFound } from 'next/navigation'
import { CustomMDX } from '../../components/mdx'
import { formatDate, getBlogPosts } from '../../blog/utils'
import { baseUrl } from '../../sitemap'
import React from 'react'
import Link from 'next/link'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params } : { params: any }) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: any }) {
  const {slug} = await params;
  const allPosts = getBlogPosts().sort((a, b) =>
    new Date(b.pushedAt ?? b.metadata.publishedAt).getTime() -
    new Date(a.pushedAt ?? a.metadata.publishedAt).getTime()
  )
  let post = allPosts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  // Find prev/next within the same topic (use first topic, fallback to all posts)
  const topic = post.topics[0] ?? null
  const siblingPosts = topic
    ? allPosts.filter((p) => p.topics.includes(topic))
    : allPosts
  const currentIndex = siblingPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < siblingPosts.length - 1 ? siblingPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? siblingPosts[currentIndex - 1] : null

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/blog" style={{ padding: '0.5rem 1rem', borderRadius: '0.375rem', border: '1px solid var(--border-color)', color: 'var(--fg)', textDecoration: 'none', fontSize: '0.875rem', whiteSpace: 'nowrap', width: 'fit-content', opacity: 0.8 }}>
          ← Back
        </Link>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2, color: 'var(--fg)', textWrap: 'balance' } as React.CSSProperties}>
          {post.metadata.title}
        </h1>
      </div>
      <div className="flex justify-between items-center mb-8 text-sm">
        <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)' }}>
          {formatDate(post.metadata.publishedAt)}
        </p>
        {topic && (
          <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', color: 'var(--fg-muted)' }}>
            {topic}
          </span>
        )}
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      {(prevPost || nextPost) && (
        <nav style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '4px' }}>
                  ← Previous{topic ? ` in ${topic}` : ''}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--fg)', fontWeight: 500 }}>
                  {prevPost.metadata.title}
                </div>
              </Link>
            )}
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '4px' }}>
                  Next{topic ? ` in ${topic}` : ''} →
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--fg)', fontWeight: 500 }}>
                  {nextPost.metadata.title}
                </div>
              </Link>
            )}
          </div>
        </nav>
      )}
    </section>
  )
}
