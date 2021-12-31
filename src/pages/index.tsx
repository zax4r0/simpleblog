import { SimpleGrid } from "@chakra-ui/react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useMeQuery, usePostsQuery } from "../generated/graphql"
import { withApollo } from "../utils/withApollo"
import AddTweet from "@/components/AddPost"
import SidebarWithHeader from "@/components/Layout/IndexLayout"
import BlogCard from "@/components/Card/Card"
import Loading from "@/components/Spinner/Loading"

const Home: NextPage = () => {
  const router = useRouter()
  const { data, loading, error } = usePostsQuery()
  const me = useMeQuery()

  if (loading) {
    return (
      <>
        <Loading />
      </>
    )
  }
  if (!data?.posts) {
    router.push("/login")
  }
  if (error) {
    return (
      <div>
        <pre>
          Bad:
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}
        </pre>
      </div>
    )
  }

  return (
    <SidebarWithHeader>
      <AddTweet />

      <SimpleGrid minChildWidth="320px" spacing="40px">
        {data?.posts.map(post => (
          <BlogCard
            key={post.id}
            id={post.id}
            content={post.content}
            createdAt={post.createdAt}
            title={post.title}
          />
        ))}
      </SimpleGrid>
    </SidebarWithHeader>
  )
}

export default withApollo({ ssr: false })(Home)
