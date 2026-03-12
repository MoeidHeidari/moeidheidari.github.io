import {
  Button,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { formatDate } from "../blog/date";
import Link from "next/link";

type PostCardProps = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  topics?: string[];
};

export function PostCard({ slug, title, summary, publishedAt, topics }: PostCardProps) {
  return (
    <Card.Root 
      backgroundColor="transparent" 
      borderWidth="1px" 
      className="post-card"
    >
      <Card.Body>
        <Stack gap={3} h="full">
          <Flex justify="space-between" align="flex-start" gap={2}>
            <Text fontSize="xs" fontWeight="medium" style={{ color: 'var(--fg-muted)' }}>
              {formatDate(publishedAt)}
            </Text>
            {topics && topics[0] && (
              <Box 
                fontSize="xs" 
                px={2} 
                py={1} 
                borderRadius="md" 
                borderWidth="1px"
                whiteSpace="nowrap"
                style={{ borderColor: 'var(--border-color)', color: 'var(--fg-muted)' }}
              >
                {topics[0]}
              </Box>
            )}
          </Flex>
          <Stack gap={2} flex={1}>
            <Heading size="sm" lineHeight="1.4">{title}</Heading>
            <Text fontSize="sm" lineHeight="1.6" style={{ color: 'var(--fg-muted)' }}>
              {summary}
            </Text>
          </Stack>
          <Button 
            asChild 
            size="sm" 
            variant="outline"
            style={{ alignSelf: "flex-start" }}
          >
            <Link href={`/blog/${slug}`}>
              Read →
            </Link>
          </Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
