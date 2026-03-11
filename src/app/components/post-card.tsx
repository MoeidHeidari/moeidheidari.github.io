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
      borderColor="whiteAlpha.300"
      style={{
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      _hover={{
        borderColor: "whiteAlpha.500",
        bg: "whiteAlpha.50",
      }}
    >
      <Card.Body>
        <Stack gap={3} h="full">
          <Flex justify="space-between" align="flex-start" gap={2}>
            <Text fontSize="xs" color="fg.muted" fontWeight="medium">
              {formatDate(publishedAt)}
            </Text>
            {topics && topics[0] && (
              <Box 
                fontSize="xs" 
                px={2} 
                py={1} 
                borderRadius="md" 
                borderWidth="1px"
                borderColor="whiteAlpha.300"
                color="fg.muted"
                whiteSpace="nowrap"
              >
                {topics[0]}
              </Box>
            )}
          </Flex>
          <Stack gap={2} flex={1}>
            <Heading size="sm" lineHeight="1.4">{title}</Heading>
            <Text fontSize="sm" color="fg.muted" lineHeight="1.6">
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
