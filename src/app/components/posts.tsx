import Link from "next/link";
import { formatDate, getBlogPosts } from "../blog/utils";
import { Card, Grid, GridItem } from "@chakra-ui/react";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <Grid
      templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
      gap={{ base: 3, md: 4 }}
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
