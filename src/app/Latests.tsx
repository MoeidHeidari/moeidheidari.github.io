// import {
//   Accordion,
//   Card,
//   GridItem,
//   Heading,
//   Link,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import { formatDate, getBlogPosts } from "./blog/utils";
// import { Icon } from "@chakra-ui/react";
// import { LuTags } from "react-icons/lu";
// export function Latests() {
//   let allBlogs = getBlogPosts();
//   return (

//     <Stack width="full">
//       <Heading size="md">Product details</Heading>
//       <Accordion.Root collapsible defaultValue={["info"]}>
//         {allBlogs
//           .sort((a, b) => {
//             if (
//               new Date(a.metadata.publishedAt) >
//               new Date(b.metadata.publishedAt)
//             ) {
//               return -1;
//             }
//             return 1;
//           })
//           .map((post) => (
//             <Accordion.Item
//               key={post.metadata.publishedAt}
//               value={post.metadata.publishedAt}
//             >
//               <Accordion.ItemTrigger>
//                 <Icon fontSize="lg" color="fg.subtle">
//                   <LuTags />
//                 </Icon>
//                 <Text color={"gray.600"}>{post.metadata.publishedAt}</Text>
//                 <Text>{post.slug}</Text>
//               </Accordion.ItemTrigger>
//               <Accordion.ItemContent>
//                 <Accordion.ItemBody>{post.metadata.summary}</Accordion.ItemBody>
//               </Accordion.ItemContent>
//             </Accordion.Item>
//           ))}
//       </Accordion.Root>
//     </Stack>
//   );
// }

import {
  Accordion,
  Card,
  Color,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDate, getBlogPosts } from "./blog/utils";
import { LuTags } from "react-icons/lu";
import Link from "next/link";
export function Latests() {
  let allBlogs = getBlogPosts();
  return (
    <Stack width="full">
      <Heading size="md">Product details</Heading>
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
          <Card.Root key={post.slug} backgroundColor={"transparent"}>
            <Card.Header>
              <Stack direction="row">
                <Icon size="md" color="gray.700">
                  <LuTags />
                </Icon>
                {post.metadata.title}
                <Stack align="flex-end" color={"gray.600"}>
                  {post.metadata.publishedAt}
                </Stack>
              </Stack>
            </Card.Header>
            <Card.Body color="fg.muted">
              {post.metadata.summary}
              <Stack align="flex-end" 
              color={"gray.500"}
              _hover={{
            color: "white",
            fontWeight:"medium"
          }}
              >
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  Read
                </Link>
              </Stack>
            </Card.Body>
          </Card.Root>
        ))}
    </Stack>
  );
}
