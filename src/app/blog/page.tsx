import { Box, Grid, GridItem,Text } from "@chakra-ui/react"
import { BlogPosts } from "../components/posts"


export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (

    <section>
      <Text py={5}>My Blog</Text>
      <BlogPosts />
    </section>
  )
}
