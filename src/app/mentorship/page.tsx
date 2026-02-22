import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { mentorshipProfile } from "./data";

type MentorshipPageProps = {
  searchParams?: {
    reviewsPage?: string | string[];
  };
};

export default function MentorshipPage({ searchParams }: MentorshipPageProps) {
  const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);
  const formatDateUTC = (value: string) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(value.includes("T") ? value : `${value}T00:00:00Z`));

  const resolvedSearchParams = searchParams ?? {};
  const reviewsPageValue = Array.isArray(resolvedSearchParams.reviewsPage)
    ? resolvedSearchParams.reviewsPage[0]
    : resolvedSearchParams.reviewsPage;
  const pageValue = Number(reviewsPageValue ?? "1");
  const reviewsPage = Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1;
  const pageSize = 3;
  const totalReviewPages = Math.max(1, Math.ceil(mentorshipProfile.reviews.length / pageSize));
  const safeReviewPage = Math.min(Math.max(reviewsPage, 1), totalReviewPages);
  const reviewStart = (safeReviewPage - 1) * pageSize;
  const reviewItems = mentorshipProfile.reviews
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(reviewStart, reviewStart + pageSize);

  const previousReviewsHref =
    safeReviewPage > 2 ? `/mentorship?reviewsPage=${safeReviewPage - 1}` : "/mentorship";
  const nextReviewsHref = `/mentorship?reviewsPage=${safeReviewPage + 1}`;
  const statsMap = Object.fromEntries(
    mentorshipProfile.stats.map((item) => [item.label, item.value])
  ) as Record<string, string>;

  const totalMinutes = Number((statsMap["Total mentoring time"] ?? "0").replace(/[^\d]/g, ""));
  const sessionsCompleted = Number((statsMap["Sessions completed"] ?? "0").replace(/[^\d]/g, ""));
  const attendance = Number((statsMap["Average attendance"] ?? "0").replace(/[^\d.]/g, ""));
  const karmaPoints = Number((statsMap["Karma points"] ?? "0").replace(/[^\d]/g, ""));

  const mentorshipBars = [
    {
      label: "Total mentoring time",
      value: `${formatNumber(totalMinutes)} mins`,
      percent: Math.min((totalMinutes / 12000) * 100, 100),
    },
    {
      label: "Sessions completed",
      value: formatNumber(sessionsCompleted),
      percent: Math.min((sessionsCompleted / 400) * 100, 100),
    },
    {
      label: "Average attendance",
      value: `${attendance}%`,
      percent: Math.min(attendance, 100),
    },
    {
      label: "Karma points",
      value: formatNumber(karmaPoints),
      percent: Math.min((karmaPoints / 1000) * 100, 100),
    },
  ];

  const averageRating =
    mentorshipProfile.reviews.length > 0
      ? mentorshipProfile.reviews.reduce((sum, review) => sum + review.rating, 0) /
        mentorshipProfile.reviews.length
      : 0;

  return (
    <section>
      <Stack gap={{ base: 5, md: 8 }}>
        <Box>
          <Heading size={{ base: "2xl", md: "3xl" }}>Mentorship</Heading>
          <Text mt={2} color="blue.400">
            {mentorshipProfile.status}
          </Text>
          <Text mt={1} fontSize="sm" color="blue.300">
            {mentorshipProfile.profile.overview}
          </Text>
          <Flex mt={3} gap={2} wrap="wrap" align="center">
            <Text fontSize="sm" color="fg.muted">Top 1% mentor recognition</Text>
            <Badge bg="yellow.400" color="black" size="md">Advanced</Badge>
          </Flex>
          <Flex wrap="wrap" gap={2} mt={4}>
            {mentorshipProfile.profile.focus.map((focus) => (
              <Badge key={focus} variant="outline" size="lg">
                {focus}
              </Badge>
            ))}
          </Flex>
          <Link href={mentorshipProfile.source} target="_blank" rel="noreferrer" mt={4} display="inline-block">
            View ADPList profile
          </Link>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Reviews</Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={3}>
            {reviewItems.map((review) => (
              <Card.Root key={review.author + review.date} backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
                <Card.Body>
                  <Flex gap={3} align="center">
                    <Link href={review.profileUrl} target="_blank" rel="noreferrer">
                      <Box w="44px" h="44px" borderRadius="full" overflow="hidden" borderWidth="1px" borderColor="whiteAlpha.400">
                        <img src={review.avatar} alt={review.author} width="44" height="44" />
                      </Box>
                    </Link>
                    <Box>
                      <Link href={review.profileUrl} target="_blank" rel="noreferrer">
                        <Text fontWeight="semibold">{review.author}</Text>
                      </Link>
                      <Text color="fg.muted" fontSize="sm">{review.role}</Text>
                    </Box>
                  </Flex>
                  <Flex justify="space-between" mt={3}>
                    <Text>{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</Text>
                    <Text color="fg.muted" fontSize="sm">{formatDateUTC(review.date)}</Text>
                  </Flex>
                  <details>
                    <summary style={{ cursor: "pointer", marginTop: "0.75rem" }}>
                      Read full review
                    </summary>
                    <Text mt={2}>{review.text}</Text>
                  </details>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
          <Flex justify="space-between" align="center" pt={3}>
            <Text fontSize="sm" color="fg.muted">
              Page {safeReviewPage} of {totalReviewPages}
            </Text>
            <Flex gap={2}>
              <Button asChild size="sm" variant="outline" disabled={safeReviewPage <= 1}>
                <NextLink href={previousReviewsHref}>Previous</NextLink>
              </Button>
              <Button asChild size="sm" variant="outline" disabled={safeReviewPage >= totalReviewPages}>
                <NextLink href={nextReviewsHref}>Next</NextLink>
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Mentorship insights</Heading>
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={3}>
            <Card.Root backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
              <Card.Body>
                <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                  <Box>
                    <Text fontSize="sm" color="fg.muted">Reviews</Text>
                    <Text fontSize="2xl" fontWeight="semibold">{mentorshipProfile.reviews.length}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="fg.muted">Avg. rating</Text>
                    <Text fontSize="2xl" fontWeight="semibold">{averageRating.toFixed(1)}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="fg.muted">Top topics</Text>
                    <Text fontSize="2xl" fontWeight="semibold">{mentorshipProfile.topTopics.length}</Text>
                  </Box>
                </Grid>
              </Card.Body>
            </Card.Root>
            <Card.Root backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
              <Card.Body>
                <Stack gap={3}>
                  {mentorshipBars.map((bar) => (
                    <Box key={bar.label}>
                      <Flex justify="space-between" mb={1}>
                        <Text fontSize="sm">{bar.label}</Text>
                        <Text fontSize="sm" color="fg.muted">{bar.value}</Text>
                      </Flex>
                      <Box h="8px" borderRadius="md" bg="whiteAlpha.200" overflow="hidden">
                        <Box h="full" w={`${bar.percent}%`} bg="whiteAlpha.700" />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Awards</Heading>
          <Stack gap={3}>
            {mentorshipProfile.awards.map((award) => (
              <Card.Root key={award.title} backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
                <Card.Body>
                  <Text fontWeight="semibold">{award.title}</Text>
                  <Text color="fg.muted" fontSize="sm">{award.period}</Text>
                  <Text mt={2}>{award.detail}</Text>
                </Card.Body>
              </Card.Root>
            ))}
          </Stack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Top areas of impact</Heading>
          <Flex wrap="wrap" gap={2}>
            {mentorshipProfile.topTopics.map((topic) => (
              <Badge key={topic} variant="subtle" size="lg">
                {topic}
              </Badge>
            ))}
          </Flex>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Available sessions</Heading>
          <Stack gap={3}>
            {mentorshipProfile.availableSessions.map((session) => (
              <Card.Root key={session.title + session.start} backgroundColor="transparent" borderWidth="1px" borderColor="whiteAlpha.300">
                <Card.Body>
                  <Text fontWeight="semibold">{session.title}</Text>
                  <Text color="fg.muted" mt={1}>
                    {session.start} - {session.timezone}
                  </Text>
                  <Button asChild mt={4} size="sm" width={{ base: "full", sm: "fit-content" }}>
                    <a href={session.ctaHref} target="_blank" rel="noreferrer">
                      {session.ctaLabel}
                    </a>
                  </Button>
                </Card.Body>
              </Card.Root>
            ))}
          </Stack>
        </Box>

      </Stack>
    </section>
  );
}
