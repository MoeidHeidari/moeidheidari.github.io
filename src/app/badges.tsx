import { Badge, Flex } from "@chakra-ui/react"


export const Badges = () => {
  return (
    <Flex py={2} wrap="wrap" gap={2}>
      <Badge size="lg" variant="outline">Kubernetes</Badge>
      <Badge size="lg" variant="outline">AWS</Badge>
      <Badge size="lg" variant="outline">Java</Badge>
      <Badge size="lg" variant="outline">Golang</Badge>
      <Badge size="lg" variant="outline">Devops</Badge>
      <Badge size="lg" variant="outline">GitOps</Badge>
      <Badge size="lg" variant="outline">Microservices</Badge>
      <Badge size="lg" variant="outline">Scalability</Badge>
      <Badge size="lg" variant="outline">High Performance Computing</Badge>
      <Badge size="lg" variant="outline">High availability</Badge>
      <Badge size="lg" variant="outline">Distributed systems</Badge>
    </Flex>
  )
}
