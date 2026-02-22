import { Badges } from "./badges";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { Latests } from "./Latests";
import { getBlogPosts } from "./blog/utils";

export default function Page() {
  const posts = getBlogPosts();

  return (
    <section>
      <Stack gap={{ base: 5, md: 6 }}>
      <Heading size={{ base: "2xl", md: "3xl" }}>My Portfolio</Heading>
      <Text fontSize={{ base: "md", md: "lg" }} lineHeight={{ base: "1.8", md: "1.9" }}>
          With over 17 years of expertise in software engineering, I specialize
          in architecting and engineering cloud-native solutions, distributed
          systems, and scalable infrastructure. Currently, I serve as a Cloud
          Developer at Volvo Cars, where I design and implement
          high-performance, resilient cloud ecosystems that align with
          cutting-edge automotive innovation. In parallel, I provide strategic
          technical leadership and consulting for Amaris, a global IT
          consultancy. My responsibilities span the design of advanced software
          architectures, orchestration of distributed systems, and the
          automation of cloud infrastructure provisioning. I excel in developing
          systems that enable seamless horizontal and vertical scaling, ensuring
          operational excellence and business continuity. My core technical
          passions lie in cloud-native service architectures, with a specific
          focus on autoscaling strategies, high availability (HA) architectures,
          and high-performance computing (HPC). I thrive on tackling complex,
          large-scale engineering challenges and building future-proof, scalable
          architectures that empower enterprises to operate with both agility
          and reliability.
      </Text>
      <Badges />
      <Latests posts={posts} pageSize={6} />
      </Stack>
    </section>
  );
}
