import React from "react"
import { Box } from "@chakra-ui/react"

export type WrapperVariant = "small" | "regular"

interface WrapperProps {
  variant?: WrapperVariant
}

const AuthLayout: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  )
}

export default AuthLayout
