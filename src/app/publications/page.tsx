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
import publicationsData from "./publications.json";
import externalArticlesData from "./articles.json";

type ScientificPublication = {
  title: string;
  year: number;
  venue: string;
  type: "Journal" | "Conference" | "Article";
  doi?: string;
  sourceLabel: string;
  sourceUrl: string;
  note?: string;
};

type ExternalArticle = {
  title: string;
  platform: "Medium" | "LinkedIn";
  publishedAt: string;
  url: string;
  summary?: string;
  note?: string;
};

const profileLinks = [
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=AzkCbpoAAAAJ&hl=en" },
  { label: "ORCID", href: "https://orcid.org/0000-0003-4392-2489" },
  { label: "DBLP", href: "https://dblp.org/pid/330/7582" },
  { label: "IEEE Author", href: "https://ieeexplore.ieee.org/author/37088436459" },
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Sayed-Moeid-Heidari" },
];

const scientificPublications = publicationsData as ScientificPublication[];
const externalArticles = externalArticlesData as ExternalArticle[];

export default function PublicationsPage() {
  return (
    <section>
      <Stack gap={{ base: 6, md: 8 }}>
        <Box>
          <Heading size={{ base: "2xl", md: "3xl" }} mb={3}>
            Publications & Writing
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} style={{ color: "var(--fg-muted)" }}>
            A combined page for peer-reviewed scientific publications and externally published technical writing.
          </Text>
          <Flex gap={2} wrap="wrap" mt={4}>
            {profileLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link-border"
                px={3}
                py={1.5}
                borderRadius="md"
                fontSize="sm"
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </Flex>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Scientific Publications
          </Heading>
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={3}>
            {scientificPublications.map((paper) => (
              <Card.Root
                key={`${paper.title}-${paper.year}`}
                backgroundColor="transparent"
                borderWidth="1px"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Card.Body>
                  <Flex justify="space-between" align="flex-start" mb={2} gap={3}>
                    <Badge variant="outline">{paper.type}</Badge>
                    <Text fontSize="xs" style={{ color: "var(--fg-muted)" }}>
                      {paper.year}
                    </Text>
                  </Flex>

                  <Heading size="sm" lineHeight="1.4" mb={2}>
                    {paper.title}
                  </Heading>

                  <Text fontSize="sm" style={{ color: "var(--fg-muted)" }} mb={3}>
                    {paper.venue}
                  </Text>

                  {paper.note && (
                    <Text fontSize="xs" style={{ color: "var(--fg-muted)" }} mb={3}>
                      {paper.note}
                    </Text>
                  )}

                  <Flex gap={2} wrap="wrap" mt={1}>
                    <Button asChild size="xs" variant="outline">
                      <Link href={paper.sourceUrl} target="_blank" rel="noreferrer">
                        View Source
                      </Link>
                    </Button>
                    {paper.doi && (
                      <Button asChild size="xs" variant="ghost">
                        <Link href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
                          DOI
                        </Link>
                      </Button>
                    )}
                    <Badge variant="subtle">{paper.sourceLabel}</Badge>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Articles & Technical Writing (External)
          </Heading>
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={3}>
            {externalArticles.map((article, index) => (
              <Card.Root
                key={`${article.url}-${article.publishedAt}-${index}`}
                backgroundColor="transparent"
                borderWidth="1px"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Card.Body>
                  <Flex justify="space-between" align="flex-start" mb={2} gap={3}>
                    <Badge variant="outline">{article.platform}</Badge>
                    <Text fontSize="xs" style={{ color: "var(--fg-muted)" }}>
                      {article.publishedAt}
                    </Text>
                  </Flex>
                  <Heading size="sm" lineHeight="1.4" mb={2}>
                    {article.title}
                  </Heading>

                  {article.summary && (
                    <Text fontSize="sm" style={{ color: "var(--fg-muted)" }} mb={3}>
                      {article.summary}
                    </Text>
                  )}

                  {article.note && (
                    <Text fontSize="xs" style={{ color: "var(--fg-muted)" }} mb={3}>
                      {article.note}
                    </Text>
                  )}

                  <Button asChild size="xs" variant="outline" w="fit-content">
                    <Link href={article.url} target="_blank" rel="noreferrer">
                      Open Article
                    </Link>
                  </Button>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        </Box>
      </Stack>
    </section>
  );
}
