"use client";

import {
  Box,
  Button,
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
import { PostCard } from "../components/post-card";

type BlogPost = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
  };
  pushedAt?: string;
  topics: string[];
};

type BlogClientProps = {
  posts: BlogPost[];
};

function TopicBadge({ label }: { label: string }) {
  return (
    <Box
      as="span"
      display="inline-block"
      px="6px"
      py="1px"
      borderRadius="md"
      borderWidth="1px"
      borderColor="whiteAlpha.400"
      fontSize="xs"
      color="whiteAlpha.800"
      lineHeight="1.6"
    >
      {label}
    </Box>
  );
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.topics.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const activePosts = useMemo(() => {
    let result = posts;
    if (selectedTopic) {
      result = result.filter((p) => p.topics.includes(selectedTopic));
    }
    const normalized = query.trim().toLowerCase();
    if (normalized) {
      result = result.filter((p) =>
        [p.metadata.title, p.slug, p.metadata.summary, ...p.topics]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      );
    }
    return result;
  }, [posts, selectedTopic, query]);

  const isFiltered = !!selectedTopic || !!query.trim();

  const newestPosts = activePosts.slice(0, 3);
  const remainingPosts = isFiltered ? activePosts : activePosts.slice(3);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(remainingPosts.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedPosts = remainingPosts.slice(startIndex, startIndex + pageSize);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic((prev) => (prev === topic ? null : topic));
    setPage(1);
  };

  return (
    <section>
      <Flex direction="column" gap={{ base: 5, md: 6 }}>
        <Heading size={{ base: "2xl", md: "3xl" }}>My Blog</Heading>

        {/* Topic filter pills */}
        <Flex gap={2} wrap="wrap">
          <Button
            size="xs"
            variant={selectedTopic === null ? "solid" : "outline"}
            onClick={() => { setSelectedTopic(null); setPage(1); }}
          >
            All
          </Button>
          {allTopics.map((topic) => (
            <Button
              key={topic}
              size="xs"
              variant={selectedTopic === topic ? "solid" : "outline"}
              onClick={() => handleTopicClick(topic)}
            >
              {topic}
            </Button>
          ))}
        </Flex>

        <Box>
          <Heading size="md" mb={4}>Newest posts</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={3}>
            {newestPosts.map((post) => (
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

          <Box w="full" borderWidth="1px" borderColor="whiteAlpha.300" borderRadius="md" overflow="hidden">
            <Table.Root variant="line" size="sm" width="100%" minWidth="100%" tableLayout="fixed">
              <Table.Header>
                <Table.Row w="full">
                  <Table.ColumnHeader w={{ base: "50%", md: "40%" }}>Title</Table.ColumnHeader>
                  <Table.ColumnHeader w={{ base: "25%", md: "15%" }}>Published</Table.ColumnHeader>
                  <Table.ColumnHeader w={{ base: "25%", md: "30%" }}>Topics</Table.ColumnHeader>
                  <Table.ColumnHeader w={{ base: "0%", md: "15%" }} textAlign="right" display={{ base: "none", md: "table-cell" }}>Action</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {paginatedPosts.map((post) => (
                  <Table.Row w="full" key={post.slug}>
                    <Table.Cell w={{ base: "50%", md: "40%" }}>
                      <Text fontWeight="medium" title={post.metadata.title} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" fontSize="sm" maxW="100%">
                        {post.metadata.title}
                      </Text>
                    </Table.Cell>
                    <Table.Cell w={{ base: "25%", md: "15%" }}>
                      <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" fontSize="sm">
                        {formatDate(post.pushedAt ?? post.metadata.publishedAt)}
                      </Text>
                    </Table.Cell>
                    <Table.Cell w={{ base: "25%", md: "30%" }}>
                      <Flex gap={0.5} wrap="wrap">
                        {post.topics.map((t) => <TopicBadge key={t} label={t} />)}
                      </Flex>
                    </Table.Cell>
                    <Table.Cell w="15%" textAlign="right" display={{ base: "none", md: "table-cell" }}>
                      <Button asChild size="xs" variant="outline">
                        <NextLink href={`/blog/${post.slug}`}>Read</NextLink>
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          {totalPages > 1 && (
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
          )}
        </Box>
      </Flex>
    </section>
  );
}
