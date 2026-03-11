"use client";

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Input,
  Link,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import data from "./repositories.json";

const repos = [...data.repos].sort((a, b) => {
  if (b.stargazers_count !== a.stargazers_count) {
    return b.stargazers_count - a.stargazers_count;
  }
  return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
});

const { stats } = data;

const formatDateUTC = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));

const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
  const language = repo.language ?? "Other";
  acc[language] = (acc[language] ?? 0) + 1;
  return acc;
}, {});

const topLanguages = Object.entries(languageCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5);
const topLanguageMax = topLanguages[0]?.[1] ?? 1;

export default function OpenSourcePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredRepos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return repos;
    return repos.filter((repo) =>
      [repo.name, repo.description ?? "", repo.language ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [searchQuery]);

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const currentRepos = filteredRepos.slice(startIndex, startIndex + pageSize);

  return (
    <section style={{ width: "100%", overflowX: "hidden" }}>
      <Stack gap={{ base: 5, md: 6 }} w="full" minW={0} align="stretch" overflow="hidden">
        <Box>
          <Heading size={{ base: "2xl", md: "3xl" }}>Open source</Heading>
          <Text mt={2} color="fg.muted">
            Public repositories and active open source work by Moeid Heidari.
          </Text>
          <Link href="https://github.com/moeidheidari" target="_blank" rel="noreferrer" mt={3} display="inline-block">
            View GitHub profile
          </Link>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={3}>
          <Card.Root backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
            <Card.Body>
              <Heading size="sm" mb={3}>Open source overview</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <Box>
                  <Text fontSize="sm" color="fg.muted">Repositories</Text>
                  <Text fontSize="2xl" fontWeight="semibold">{stats.repositories}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="fg.muted">Stars</Text>
                  <Text fontSize="2xl" fontWeight="semibold">{stats.stars}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="fg.muted">Forks</Text>
                  <Text fontSize="2xl" fontWeight="semibold">{stats.forks}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="fg.muted">Open issues</Text>
                  <Text fontSize="2xl" fontWeight="semibold">{stats.open_issues}</Text>
                </Box>
              </Grid>
            </Card.Body>
          </Card.Root>

          <Card.Root backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
            <Card.Body>
              <Heading size="sm" mb={3}>Top languages</Heading>
              <Stack gap={3}>
                {topLanguages.map(([language, count]) => (
                  <Box key={language}>
                    <Flex justify="space-between" mb={1}>
                      <Text fontSize="sm">{language}</Text>
                      <Text fontSize="sm" color="fg.muted">{count}</Text>
                    </Flex>
                    <Box h="8px" borderRadius="md" bg="whiteAlpha.200" overflow="hidden">
                      <Box h="full" w={`${(count / topLanguageMax) * 100}%`} bg="whiteAlpha.700" />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Card.Body>
          </Card.Root>
        </Grid>

        <Box w="full">
          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={3}
            mb={4}
          >
            <Heading size="md">Top starred repositories</Heading>
            <Flex gap={2} w={{ base: "full", md: "360px" }}>
              <Input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search repositories"
              />
            </Flex>
          </Flex>

          <Box
            w="full"
            minW={0}
            display="block"
            overflow="hidden"
            borderWidth="1px"
            borderColor="whiteAlpha.300"
            borderRadius="md"
          >
            <Table.Root size="md" variant="line" interactive w="full" minW="full" tableLayout="fixed">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader w="20%">Repository</Table.ColumnHeader>
                  <Table.ColumnHeader w="9%">Language</Table.ColumnHeader>
                  <Table.ColumnHeader w="30%">Description</Table.ColumnHeader>
                  <Table.ColumnHeader w="26%">Metrics</Table.ColumnHeader>
                  <Table.ColumnHeader w="8%">Updated</Table.ColumnHeader>
                  <Table.ColumnHeader w="7%">Links</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {currentRepos.map((repo) => {
                  const description = repo.description ?? "Open source repository.";
                  const maxDescriptionLength = 32;
                  const isLongDescription = description.length > maxDescriptionLength;
                  const shortDescription = isLongDescription
                    ? description.slice(0, maxDescriptionLength).trimEnd()
                    : description;

                  return (
                    <Table.Row key={repo.id} _hover={{ bg: "whiteAlpha.100" }}>
                      <Table.Cell maxW={0}>
                        <Text fontWeight="medium" title={repo.name} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                          {repo.name}
                        </Text>
                      </Table.Cell>
                      <Table.Cell maxW={0}>
                        <Text title={repo.language ?? "-"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                          {repo.language ?? "-"}
                        </Text>
                      </Table.Cell>
                      <Table.Cell maxW={0}>
                        <Text
                          title={`${shortDescription}${isLongDescription ? "..." : ""}`}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          {shortDescription}
                          {isLongDescription ? "..." : ""}
                        </Text>
                      </Table.Cell>
                      <Table.Cell maxW={0}>
                        <Text
                          title={`★ ${repo.stargazers_count} • Forks ${repo.forks_count} • Issues ${repo.open_issues_count}`}
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                        >
                          ★ {repo.stargazers_count} • Forks {repo.forks_count} • Issues {repo.open_issues_count}
                        </Text>
                      </Table.Cell>
                      <Table.Cell maxW={0} suppressHydrationWarning>
                        <Text title={formatDateUTC(repo.pushed_at)} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                          {formatDateUTC(repo.pushed_at)}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Button asChild size="xs" variant="outline">
                          <a href={repo.html_url} target="_blank" rel="noreferrer">Open</a>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>

        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="fg.muted">
            Page {safePage} of {totalPages}
          </Text>
          <Flex gap={2} wrap="wrap" justify="flex-end">
            <Button size="sm" variant="outline" disabled={safePage <= 1} onClick={() => setPage(1)}>
              First
            </Button>
            <Button size="sm" variant="outline" disabled={safePage <= 1} onClick={() => setPage((v) => Math.max(1, v - 1))}>
              Previous
            </Button>
            <Button size="sm" variant="outline" disabled={safePage >= totalPages} onClick={() => setPage((v) => Math.min(totalPages, v + 1))}>
              Next
            </Button>
            <Button size="sm" variant="outline" disabled={safePage >= totalPages} onClick={() => setPage(totalPages)}>
              Last
            </Button>
          </Flex>
        </Flex>
      </Stack>
    </section>
  );
}
