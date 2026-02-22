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
import { formatDate, getBlogPosts } from "./utils";


export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

type BlogPageProps = {
  searchParams?: Promise<{
    page?: string | string[];
    q?: string | string[];
  }>;
};

export default async function Page({ searchParams }: BlogPageProps) {
  const allPosts = getBlogPosts()
    .slice()
    .sort((a, b) => {
      const left = new Date(a.pushedAt ?? a.metadata.publishedAt).getTime();
      const right = new Date(b.pushedAt ?? b.metadata.publishedAt).getTime();
      return right - left;
    });

  const newestPosts = allPosts.slice(0, 3);
  const remainingPosts = allPosts.slice(3);

  const resolvedSearchParams = (await searchParams) ?? {};
  const pageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const qParam = Array.isArray(resolvedSearchParams.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams.q;
  const searchQuery = (qParam ?? "").trim();

  const filteredRemainingPosts = remainingPosts.filter((post) => {
    if (!searchQuery) {
      return true;
    }
    const query = searchQuery.toLowerCase();
    return (
      post.metadata.title.toLowerCase().includes(query) ||
      post.slug.toLowerCase().includes(query) ||
      post.metadata.summary.toLowerCase().includes(query)
    );
  });

  const pageValue = Number(pageParam ?? "1");
  const page = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredRemainingPosts.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedPosts = filteredRemainingPosts.slice(startIndex, startIndex + pageSize);

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    const query = params.toString();
    return query ? `/blog?${query}` : "/blog";
  };

  const firstHref = buildPageHref(1);
  const previousHref = buildPageHref(Math.max(safePage - 1, 1));
  const nextHref = buildPageHref(Math.min(safePage + 1, totalPages));
  const lastHref = buildPageHref(totalPages);

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
            <form method="get" action="/blog" style={{ width: "100%", maxWidth: "360px" }}>
              <Flex gap={2}>
                <Input name="q" defaultValue={searchQuery} placeholder="Search articles" />
                <Button type="submit" size="sm" variant="outline">Search</Button>
              </Flex>
            </form>
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
              <Button asChild size="sm" variant="outline" disabled={safePage <= 1}>
                <NextLink href={firstHref}>First</NextLink>
              </Button>
              <Button asChild size="sm" variant="outline" disabled={safePage <= 1}>
                <NextLink href={previousHref}>Previous</NextLink>
              </Button>
              <Button asChild size="sm" variant="outline" disabled={safePage >= totalPages}>
                <NextLink href={nextHref}>Next</NextLink>
              </Button>
              <Button asChild size="sm" variant="outline" disabled={safePage >= totalPages}>
                <NextLink href={lastHref}>Last</NextLink>
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </section>
  )
}
