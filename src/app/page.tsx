import { Badges } from "./badges";
import { BlogPosts } from "./components/posts";
import { Flex, Text } from "@chakra-ui/react";
export default function Page() {
  return (
    <section>
      <Text py={4}>My Portfolio</Text>
      <Flex maxW="100%">
        <Text>
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
      </Flex>
      <div
        className="
          my-8
        "
      >
        <Badges />
      </div>
    </section>
  );
}
