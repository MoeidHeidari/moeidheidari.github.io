import { Badge, Flex, Stack, Heading } from "@chakra-ui/react"


export const Badges = () => {
  const skills = [
    "Kubernetes", "AWS", "Java", "Golang", "TypeScript", "Python",
    "Docker", "Terraform", "DevOps", "GitOps", "Microservices",
    "Distributed Systems", "Event-Driven Architecture", "System Design",
    "High Availability", "High Performance Computing", "Scalability", "Cloud-Native"
  ]

  return (
    <Stack gap={4}>
      <Heading size="sm">Skills & Expertise</Heading>
      <Flex wrap="wrap" gap={2}>
        {skills.map((skill) => (
          <Badge key={skill} size="lg" variant="outline">
            {skill}
          </Badge>
        ))}
      </Flex>
    </Stack>
  )
}
