import { Center, Spinner } from "@chakra-ui/react"
function Loading() {
  return (
    <div>
      <Center w="100vw" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </div>
  )
}

export default Loading
