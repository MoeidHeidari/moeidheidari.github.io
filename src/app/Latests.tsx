import {
  Accordion,
  Card,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDate, getBlogPosts } from "./blog/utils";
import { Icon } from "@chakra-ui/react";
import { LuTags } from "react-icons/lu";
export function Latests() {
  let allBlogs = getBlogPosts();
  return (
    
    <Stack width="full">
      <Heading size="md">Product details</Heading>
      <Accordion.Root collapsible defaultValue={["info"]}>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Accordion.Item
              key={post.metadata.publishedAt}
              value={post.metadata.publishedAt}
            >
              <Accordion.ItemTrigger>
                <Icon fontSize="lg" color="fg.subtle">
                  <LuTags />
                </Icon>
                <Text color={"gray.600"}>{post.metadata.publishedAt}</Text>
                <Text>{post.slug}</Text>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>{post.metadata.summary}</Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
      </Accordion.Root>
    </Stack>
  );
}
