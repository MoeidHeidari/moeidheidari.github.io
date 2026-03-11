import { Badges } from "./badges";
import { Heading, Stack, Text, Flex, Box } from "@chakra-ui/react";
import { Latests } from "./Latests";
import { getBlogPosts } from "./blog/utils";
import Image from "next/image";

export default function Page() {
  const posts = getBlogPosts();

  return (
    <section>
      <Stack gap={{ base: 5, md: 6 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 6 }}
          align={{ base: "center", md: "flex-start" }}
        >
          <Box flexShrink={0}>
            <Image
              src="/profile.png"
              alt="Moeid Heidari"
              width={200}
              height={200}
              style={{
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </Box>
          <Stack gap={4} flex={1}>
            <Heading size={{ base: "2xl", md: "3xl" }}>Moeid Heidari</Heading>
            <Text fontSize={{ base: "md", md: "lg" }} lineHeight={{ base: "1.7", md: "1.8" }}>
              Cloud Engineer at Volvo Cars specializing in architecting cloud-native solutions, distributed systems, and scalable infrastructure. Passionate about designing high-performance systems that enable organizations to scale with agility and reliability. I also provide technical consulting and strategic leadership. Currently focused on automotive innovation and cloud ecosystems.
            </Text>
          </Stack>
        </Flex>
        <Badges />
        <Latests posts={posts} pageSize={6} />
      </Stack>
    </section>
  );
}
