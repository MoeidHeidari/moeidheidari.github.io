import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";
import { Avatar, Box, Button, Card, Grid, GridItem } from "@chakra-ui/react";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={2}
    >
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <GridItem rowSpan={1} colSpan={1} key={post.slug}>
            <Card.Root
              backgroundColor={"transparent"}
              _hover={{
                "borderColor": "whiteAlpha.400",
                "borderWidth": "0.5px",
              }}
            >
              <Card.Body gap="2">
                <Card.Title mt="2">
                  {formatDate(post.metadata.publishedAt, false)}
                </Card.Title>
                <Card.Description>{post.metadata.title}</Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="
                    flex flex-col
                    space-y-1 mb-4
                  "
                >
                  Read
                </Link>
              </Card.Footer>
            </Card.Root>
          </GridItem>
        ))}
    </Grid>
  );
}
