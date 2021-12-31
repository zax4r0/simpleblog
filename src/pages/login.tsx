import InputField from "@/components/Forms/Fields"
import AuthLayout from "@/components/Layout/AuthLayout"
import { useLoginMutation } from "@/generated/graphql"
import { withApollo } from "@/utils/withApollo"
import { Box, Button } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"

function Login() {
  const router = useRouter()
  const [login] = useLoginMutation()
  return (
    <AuthLayout variant="regular">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, {}) => {
          const response = await login({ variables: values })

          if (response.data?.login?.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next)
            } else {
              // worked
              router.push("/")
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="email" placeholder="email" label="email" />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>

            <Button mt={4} type="submit" isLoading={isSubmitting}>
              login
            </Button>
          </Form>
        )}
      </Formik>
      <Link href="/signup">
        <div>Dont Have an Accout? SignUp</div>
      </Link>
    </AuthLayout>
  )
}
export default withApollo({ ssr: false })(Login)
