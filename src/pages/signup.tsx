import InputField from "@/components/Forms/Fields"
import AuthLayout from "@/components/Layout/AuthLayout"
import { useSignupMutation } from "@/generated/graphql"
import { withApollo } from "@/utils/withApollo"
import { Box, Button } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"

function Signup() {
  const router = useRouter()
  const [signup] = useSignupMutation()
  return (
    <AuthLayout variant="regular">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await signup({ variables: values })

          if (response.data?.signup?.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next)
            } else {
              // worked
              router.push("/login")
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
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
      <Link href="/login">
        <div>Login Insted</div>
      </Link>
    </AuthLayout>
  )
}
export default withApollo({ ssr: false })(Signup)
