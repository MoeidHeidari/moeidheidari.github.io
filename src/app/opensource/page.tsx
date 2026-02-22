import { Badge, Box, Button, Card, Flex, Grid, Heading, Input, Link, Stack, Table, Text } from "@chakra-ui/react";
import NextLink from "next/link";

type OpenSourceRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
};

type GitHubCommitSearchItem = {
  commit?: {
    author?: {
      date?: string;
    };
  };
};

type GitHubCommitSearchResponse = {
  items?: GitHubCommitSearchItem[];
};

const fallbackRepos: OpenSourceRepo[] = [
  {
    id: 1,
    name: "moeidheidari.github.io",
    html_url: "https://github.com/moeidheidari/moeidheidari.github.io",
    description: "Personal portfolio and blog website.",
    stargazers_count: 0,
    forks_count: 0,
    open_issues_count: 0,
    language: "TypeScript",
    pushed_at: "2026-02-20T10:00:00Z",
    fork: false,
  },
];

async function getRepos(): Promise<OpenSourceRepo[]> {
  try {
    const [userResponse, orgResponse] = await Promise.all([
      fetch("https://api.github.com/users/moeidheidari/repos?per_page=100&sort=updated", {
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/orgs/corpobit/repos?per_page=100&sort=updated", {
        next: { revalidate: 3600 },
      }),
    ]);

    const userRepos = userResponse.ok
      ? ((await userResponse.json()) as OpenSourceRepo[])
      : [];
    const orgRepos = orgResponse.ok
      ? ((await orgResponse.json()) as OpenSourceRepo[])
      : [];

    const mergedRepos = [...userRepos, ...orgRepos];
    const uniqueRepos = Array.from(
      new Map(mergedRepos.map((repo) => [repo.id, repo])).values()
    );

    if (uniqueRepos.length === 0) {
      return fallbackRepos;
    }

    return uniqueRepos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  } catch {
    return fallbackRepos;
  }
}

async function getContributionCountsByDay(year: number): Promise<Record<string, number>> {
  try {
    const from = `${year}-01-01`;
    const to = `${year}-12-31`;
    const perPage = 100;
    const maxPages = 10;
    const token = process.env.GITHUB_TOKEN;
    const counts: Record<string, number> = {};

    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(
        `https://api.github.com/search/commits?q=author:moeidheidari+author-date:${from}..${to}&per_page=${perPage}&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        break;
      }

      const data = (await response.json()) as GitHubCommitSearchResponse;
      const items = data.items ?? [];

      if (items.length === 0) {
        break;
      }

      for (const item of items) {
        const date = item.commit?.author?.date;
        if (!date) {
          continue;
        }
        const day = date.slice(0, 10);
        counts[day] = (counts[day] ?? 0) + 1;
      }

      if (items.length < perPage) {
        break;
      }
    }

    return counts;
  } catch {
    return {};
  }
}

async function getContributionCountsByDateRange(from: string, to: string): Promise<Record<string, number>> {
  try {
    const perPage = 100;
    const maxPages = 10;
    const token = process.env.GITHUB_TOKEN;
    const counts: Record<string, number> = {};

    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(
        `https://api.github.com/search/commits?q=author:moeidheidari+author-date:${from}..${to}&per_page=${perPage}&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        break;
      }

      const data = (await response.json()) as GitHubCommitSearchResponse;
      const items = data.items ?? [];

      if (items.length === 0) {
        break;
      }

      for (const item of items) {
        const date = item.commit?.author?.date;
        if (!date) {
          continue;
        }
        const day = date.slice(0, 10);
        counts[day] = (counts[day] ?? 0) + 1;
      }

      if (items.length < perPage) {
        break;
      }
    }

    return counts;
  } catch {
    return {};
  }
}

type OpenSourcePageProps = {
  searchParams?: {
    page?: string | string[];
    q?: string | string[];
    year?: string | string[];
  };
};

export default async function OpenSourcePage({ searchParams }: OpenSourcePageProps) {
  const formatDateUTC = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(value));

  const repos = await getRepos();
  const topStarRepos = repos
    .slice()
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });
  const resolvedSearchParams = searchParams ?? {};
  const pageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;
  const qParam = Array.isArray(resolvedSearchParams.q)
    ? resolvedSearchParams.q[0]
    : resolvedSearchParams.q;
  const yearParam = Array.isArray(resolvedSearchParams.year)
    ? resolvedSearchParams.year[0]
    : resolvedSearchParams.year;
  const searchQuery = (qParam ?? "").trim();

  const filteredRepos = topStarRepos.filter((repo) => {
    if (!searchQuery) {
      return true;
    }
    const query = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(query) ||
      (repo.description ?? "").toLowerCase().includes(query) ||
      (repo.language ?? "").toLowerCase().includes(query)
    );
  });

  const pageValue = Number(pageParam ?? "1");
  const page = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRepos.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const currentRepos = filteredRepos.slice(startIndex, startIndex + pageSize);

  const todayIso = new Date().toISOString().slice(0, 10);
  const todayUtc = new Date(`${todayIso}T00:00:00Z`);

  const availableYears = Array.from(
    new Set([...repos.map((repo) => new Date(repo.pushed_at).getUTCFullYear()), todayUtc.getUTCFullYear()])
  )
    .sort((a, b) => b - a);
  const selectedRange = (yearParam ?? "rolling").toString();
  const parsedYear = Number(selectedRange);
  const selectedYear = Number.isFinite(parsedYear) && availableYears.includes(parsedYear) ? parsedYear : null;

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (nextPage > 1) {
      params.set("page", String(nextPage));
    }
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    params.set("year", selectedYear ? String(selectedYear) : "rolling");
    const queryString = params.toString();
    return queryString ? `/opensource?${queryString}` : "/opensource";
  };

  const firstHref = buildPageHref(1);
  const previousHref = buildPageHref(Math.max(safePage - 1, 1));
  const nextHref = buildPageHref(Math.min(safePage + 1, totalPages));
  const lastHref = buildPageHref(totalPages);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalOpenIssues = repos.reduce((sum, repo) => sum + repo.open_issues_count, 0);

  const languageCounts = repos.reduce<Record<string, number>>((acc, repo) => {
    const language = repo.language ?? "Other";
    acc[language] = (acc[language] ?? 0) + 1;
    return acc;
  }, {});

  const topLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const topLanguageMax = topLanguages[0]?.[1] ?? 1;

  const startDate = selectedYear
    ? new Date(Date.UTC(selectedYear, 0, 1))
    : new Date(Date.UTC(todayUtc.getUTCFullYear(), todayUtc.getUTCMonth(), todayUtc.getUTCDate() - 363));
  const endDate = selectedYear
    ? new Date(Date.UTC(selectedYear, 11, 31))
    : todayUtc;
  const gridStartDate = new Date(startDate);
  gridStartDate.setUTCDate(gridStartDate.getUTCDate() - gridStartDate.getUTCDay());
  const gridEndDate = new Date(endDate);
  gridEndDate.setUTCDate(gridEndDate.getUTCDate() + (6 - gridEndDate.getUTCDay()));

  const fallbackContributionsByDay = repos.reduce<Record<string, number>>((acc, repo) => {
    const key = repo.pushed_at.slice(0, 10);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const apiContributionsByDay = await getContributionCountsByDateRange(
    startDate.toISOString().slice(0, 10),
    endDate.toISOString().slice(0, 10)
  );
  const contributionsByDay =
    Object.keys(apiContributionsByDay).length > 0
      ? apiContributionsByDay
      : fallbackContributionsByDay;

  const totalGridDays =
    Math.floor((gridEndDate.getTime() - gridStartDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  const contributionDays = Array.from({ length: totalGridDays }, (_, index) => {
    const date = new Date(gridStartDate);
    date.setUTCDate(gridStartDate.getUTCDate() + index);
    const key = date.toISOString().slice(0, 10);
    const inRange = date >= startDate && date <= endDate;
    return {
      key,
      date,
      dateLabel: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(date),
      count: inRange ? (contributionsByDay[key] ?? 0) : 0,
      inRange,
    };
  });

  const contributionWeeks = Array.from(
    { length: Math.ceil(contributionDays.length / 7) },
    (_, weekIndex) => contributionDays.slice(weekIndex * 7, weekIndex * 7 + 7)
  );
  const maxContributionCount = Math.max(...contributionDays.map((day) => day.count), 1);
  const monthLabels = contributionWeeks.map((week, weekIndex) => {
    const firstDay = week[0];
    const previousWeekFirstDay = contributionWeeks[weekIndex - 1]?.[0];
    const isNewMonth =
      weekIndex === 0 ||
      (previousWeekFirstDay && firstDay.date.getUTCMonth() !== previousWeekFirstDay.date.getUTCMonth());

    return isNewMonth
      ? new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(firstDay.date)
      : "";
  });

  const getContributionColor = (count: number) => {
    if (count === 0) {
      return "whiteAlpha.100";
    }
    const ratio = count / maxContributionCount;
    if (ratio < 0.34) {
      return "whiteAlpha.300";
    }
    if (ratio < 0.67) {
      return "whiteAlpha.500";
    }
    return "whiteAlpha.700";
  };

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
                  <Text fontSize="2xl" fontWeight="semibold">{repos.length}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="fg.muted">Stars</Text>
                  <Text fontSize="2xl" fontWeight="semibold">{totalStars}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="fg.muted">Forks</Text>
                  <Text fontSize="2xl" fontWeight="semibold">{totalForks}</Text>
                </Box>
                <Box>
                  <Text fontSize="sm" color="fg.muted">Open issues</Text>
                  <Text fontSize="2xl" fontWeight="semibold">{totalOpenIssues}</Text>
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

        <Card.Root backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
          <Card.Body>
            <Heading size="sm" mb={3}>Repository activity {selectedYear ? `in ${selectedYear}` : "in the last 12 months"}</Heading>
            <Stack gap={3} w="full" minW={0}>
              <Flex gap={2} wrap="wrap">
                <Button
                  asChild
                  size="xs"
                  variant={selectedYear === null ? "solid" : "outline"}
                >
                  <NextLink href={(() => {
                    const params = new URLSearchParams();
                    if (searchQuery) {
                      params.set("q", searchQuery);
                    }
                    params.set("year", "rolling");
                    return `/opensource?${params.toString()}`;
                  })()}>
                    Last 12 months
                  </NextLink>
                </Button>
                {availableYears.map((year) => {
                  const yearParams = new URLSearchParams();
                  if (searchQuery) {
                    yearParams.set("q", searchQuery);
                  }
                  yearParams.set("year", String(year));
                  const yearHref = `/opensource?${yearParams.toString()}`;

                  return (
                    <Button
                      key={year}
                      asChild
                      size="xs"
                      variant={year === selectedYear ? "solid" : "outline"}
                    >
                      <NextLink href={yearHref}>{year}</NextLink>
                    </Button>
                  );
                })}
              </Flex>

              <Stack gap={2} w="full" minW={0} overflow="hidden">
                <Grid pl="28px" gap="2px" templateColumns={`repeat(${contributionWeeks.length}, minmax(0, 1fr))`} minW={0}>
                  {monthLabels.map((label, index) => (
                    <Box
                      key={`${label}-${index}`}
                      fontSize="xs"
                      color="fg.muted"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      minW={0}
                    >
                      {label}
                    </Box>
                  ))}
                </Grid>
                <Flex gap={2} minW={0}>
                  <Stack gap="2px" w="22px">
                    <Box h="12px" />
                    <Box h="12px" fontSize="xs" color="fg.muted">Mon</Box>
                    <Box h="12px" />
                    <Box h="12px" fontSize="xs" color="fg.muted">Wed</Box>
                    <Box h="12px" />
                    <Box h="12px" fontSize="xs" color="fg.muted">Fri</Box>
                    <Box h="12px" />
                  </Stack>
                  <Grid gap="2px" templateColumns={`repeat(${contributionWeeks.length}, minmax(0, 1fr))`} w="full" minW={0}>
                    {contributionWeeks.map((week, weekIndex) => (
                      <Stack key={weekIndex} gap="2px" w="full">
                        {week.map((day) => (
                          <Box
                            key={day.key}
                            w="full"
                            aspectRatio={1}
                            borderRadius="sm"
                            bg={day.inRange ? getContributionColor(day.count) : "transparent"}
                            borderWidth={day.inRange ? "0" : "1px"}
                            borderColor={day.inRange ? "transparent" : "whiteAlpha.200"}
                            title={day.inRange ? `${day.dateLabel}: ${day.count} updates` : ""}
                          />
                        ))}
                      </Stack>
                    ))}
                  </Grid>
                </Flex>
              </Stack>
            </Stack>
            <Flex justify="space-between" mt={3} align="center" wrap="wrap" gap={2}>
              <Text fontSize="xs" color="fg.muted">Less</Text>
              <Flex gap="2px">
                <Box w="10px" h="10px" borderRadius="2px" bg="whiteAlpha.100" />
                <Box w="10px" h="10px" borderRadius="2px" bg="whiteAlpha.300" />
                <Box w="10px" h="10px" borderRadius="2px" bg="whiteAlpha.500" />
                <Box w="10px" h="10px" borderRadius="2px" bg="whiteAlpha.700" />
              </Flex>
              <Text fontSize="xs" color="fg.muted">More</Text>
            </Flex>
          </Card.Body>
        </Card.Root>

        <Box w="full">
          <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} direction={{ base: "column", md: "row" }} gap={3} mb={4}>
            <Heading size="md">Top starred repositories</Heading>
            <form method="get" action="/opensource" style={{ width: "100%", maxWidth: "360px" }}>
              <Flex gap={2} w="full">
                <input type="hidden" name="year" value={String(selectedYear)} />
                <Input name="q" defaultValue={searchQuery} placeholder="Search repositories" />
                <Button type="submit" size="sm" variant="outline">Search</Button>
              </Flex>
            </form>
          </Flex>

          <Box w="full" minW={0} display="block" overflow="hidden" borderWidth="1px" borderColor="whiteAlpha.300" borderRadius="md">
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
                      <Table.Cell maxW={0}>
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
      </Stack>
    </section>
  );
}
