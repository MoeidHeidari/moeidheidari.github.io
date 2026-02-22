import {
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDate, getBlogPosts } from "./blog/utils";
import Link from "next/link";

type LatestsProps = {
  currentPage?: number;
  pageSize?: number;
};

export function Latests({ currentPage = 1, pageSize = 4 }: LatestsProps) {
  const allBlogs = getBlogPosts().sort((a, b) => {
    const left = new Date(a.pushedAt ?? a.metadata.publishedAt).getTime();
    const right = new Date(b.pushedAt ?? b.metadata.publishedAt).getTime();
    return right - left;
  });
  const totalPages = Math.max(1, Math.ceil(allBlogs.length / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedPosts = allBlogs.slice(startIndex, startIndex + pageSize);

  const previousHref = safePage > 2 ? `/?postsPage=${safePage - 1}` : "/";
  const nextHref = `/?postsPage=${safePage + 1}`;

  return (
    <Stack width="full" gap={4} py={{ base: 4, md: 6 }}>
      <Heading size="md">Latest posts</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3}>
        {paginatedPosts.map((post) => (
          <Card.Root key={post.slug} backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
            <Card.Body>
              <Text fontSize="sm" color="fg.muted">
                {formatDate(post.pushedAt ?? post.metadata.publishedAt)}
              </Text>
              <Heading size="sm" mt={2}>{post.metadata.title}</Heading>
              <Text mt={2} color="fg.muted">{post.metadata.summary}</Text>
              <Button asChild size="sm" variant="outline" mt={4} width="fit-content">
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  Read
                </Link>
              </Button>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
      <Flex justify="space-between" align="center" pt={2}>
        <Text fontSize="sm" color="fg.muted">
          Page {safePage} of {totalPages}
        </Text>
        <Flex gap={2}>
          <Button asChild size="sm" variant="outline" disabled={safePage <= 1}>
            <Link href={previousHref}>Previous</Link>
          </Button>
          <Button asChild size="sm" variant="outline" disabled={safePage >= totalPages}>
            <Link href={nextHref}>Next</Link>
          </Button>
        </Flex>
      </Flex>
    </Stack>
  );
}
