import InputField from "@/components/Forms/Fields"
import { PostsDocument, useAddPostMutation } from "@/generated/graphql"
import { withApollo } from "@/utils/withApollo"
import { Box, Button, Textarea, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import { useRouter } from "next/router"

function Login() {
  const router = useRouter()
  const [add, { loading }] = useAddPostMutation({
    update(cache, { data: Post }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            // https://stackoverflow.com/questions/61277834/update-cache-after-a-mutation-property-names-does-not-exist-on-type-names
            // check if it is called 'names' in the Cache tab of Apollo Client dev tools in google chrome
            const newPostRef = cache.writeQuery({
              //query: GET_NAMES,
              query: PostsDocument, // assuming that your Query is called GetNames, and that in theory you would call it somewhere else like this: useGetNamesQuery()
              data: Post,
            })
            // return existingNames.concat(newNameRef) // if 'names' is a string, but I would think it's an array, then
            return [...existingPosts, newPostRef]
          },
        },
      })
    },
  })
  const toast = useToast()
  return (
    <div>
      <Formik
        initialValues={{ title: "", content: "" }}
        onSubmit={async (values, {}) => {
          const response = await add({ variables: values })
          if (response.data?.AddPost) {
            toast({
              position: "bottom-left",
              render: () => (
                <Box color="white" p={3} bg="blue.500">
                  Added New Post 😅
                </Box>
              ),
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Title"
              label=""
              autoComplete="false"
            />
            <Textarea
              mt={"2"}
              name="content"
              placeholder="WhatEver 😂"
              label="content"
              autoComplete="false"
            />
            <Button
              colorScheme="blue"
              mt={4}
              type="submit"
              isLoading={isSubmitting}
            >
              Add
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
export default withApollo({ ssr: false })(Login)
