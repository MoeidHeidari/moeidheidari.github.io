"use client";

import {
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PostCard } from "./components/post-card";

type LatestsProps = {
  posts: {
    slug: string;
    metadata: {
      title: string;
      publishedAt: string;
      summary: string;
    };
    pushedAt?: string;
    topics?: string[];
  }[];
  pageSize?: number;
};

export function Latests({ posts, pageSize = 4 }: LatestsProps) {
  const [page, setPage] = useState(1);

  const allBlogs = useMemo(
    () =>
      posts.slice().sort((a, b) => {
        const left = new Date(a.pushedAt ?? a.metadata.publishedAt).getTime();
        const right = new Date(b.pushedAt ?? b.metadata.publishedAt).getTime();
        return right - left;
      }),
    [posts]
  );

  const totalPages = Math.max(1, Math.ceil(allBlogs.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedPosts = allBlogs.slice(startIndex, startIndex + pageSize);

  return (
    <Stack width="full" gap={4} py={{ base: 4, md: 6 }}>
      <Heading size="md">Latest posts</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3}>
        {paginatedPosts.map((post) => (
          <PostCard
            key={post.slug}
            slug={post.slug}
            title={post.metadata.title}
            summary={post.metadata.summary}
            publishedAt={post.pushedAt ?? post.metadata.publishedAt}
            topics={post.topics}
          />
        ))}
      </Grid>
      {totalPages > 1 && (
        <Flex justify="space-between" align="center" pt={2}>
          <Text fontSize="sm" color="fg.muted">
            Page {safePage} of {totalPages}
          </Text>
          <Flex gap={2}>
            <Button size="sm" variant="outline" disabled={safePage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
              Previous
            </Button>
            <Button size="sm" variant="outline" disabled={safePage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>
              Next
            </Button>
          </Flex>
        </Flex>
      )}
    </Stack>
  );
}
