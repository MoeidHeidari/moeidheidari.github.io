"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Input,
  Table,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useMemo, useState } from "react";
import { formatDate } from "./date";

type BlogPost = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
  };
  pushedAt?: string;
};

type BlogClientProps = {
  posts: BlogPost[];
};

export default function BlogClient({ posts }: BlogClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const newestPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return remainingPosts;
    }

    return remainingPosts.filter((post) =>
      [post.metadata.title, post.slug, post.metadata.summary]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [remainingPosts, query]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  return (
    <section>
      <Flex direction="column" gap={{ base: 5, md: 6 }}>
        <Heading size={{ base: "2xl", md: "3xl" }}>My Blog</Heading>

        <Box>
          <Heading size="md" mb={4}>Newest posts</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3}>
            {newestPosts.map((post) => (
              <Card.Root key={post.slug} backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
                <Card.Body>
                  <Text fontSize="sm" color="fg.muted">{formatDate(post.pushedAt ?? post.metadata.publishedAt)}</Text>
                  <Heading size="sm" mt={2}>{post.metadata.title}</Heading>
                  <Text mt={2} color="fg.muted">{post.metadata.summary}</Text>
                  <Button asChild size="sm" variant="outline" mt={4} width="fit-content">
                    <NextLink href={`/blog/${post.slug}`}>Read</NextLink>
                  </Button>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        </Box>

        <Box>
          <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={3} mb={4}>
            <Heading size="md">All articles</Heading>
            <Flex gap={2} w={{ base: "full", md: "360px" }}>
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search articles"
              />
            </Flex>
          </Flex>

          <Box w="full" overflow="hidden" borderWidth="1px" borderColor="whiteAlpha.300" borderRadius="md">
            <Table.Root variant="line" size="sm" w="full" tableLayout="fixed">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader w="35%">Title</Table.ColumnHeader>
                  <Table.ColumnHeader w="18%">Published</Table.ColumnHeader>
                  <Table.ColumnHeader w="37%">Summary</Table.ColumnHeader>
                  <Table.ColumnHeader w="10%" textAlign="right">Action</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {paginatedPosts.map((post) => (
                  <Table.Row key={post.slug}>
                    <Table.Cell>
                      <Text fontWeight="medium" title={post.metadata.title} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {post.metadata.title}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {formatDate(post.pushedAt ?? post.metadata.publishedAt)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text title={post.metadata.summary} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {post.metadata.summary}
                      </Text>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button asChild size="xs" variant="outline">
                        <NextLink href={`/blog/${post.slug}`}>Read</NextLink>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          <Flex justify="space-between" align="center" mt={4}>
            <Text fontSize="sm" color="fg.muted">Page {safePage} of {totalPages}</Text>
            <Flex gap={2} wrap="wrap" justify="flex-end">
              <Button size="sm" variant="outline" disabled={safePage <= 1} onClick={() => setPage(1)}>
                First
              </Button>
              <Button size="sm" variant="outline" disabled={safePage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
                Previous
              </Button>
              <Button size="sm" variant="outline" disabled={safePage >= totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>
                Next
              </Button>
              <Button size="sm" variant="outline" disabled={safePage >= totalPages} onClick={() => setPage(totalPages)}>
                Last
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </section>
  );
}
