import { utimes } from "fs"
import { useRouter } from "next/router"
import { usePostByIdQuery } from "../generated/graphql"
import { useGetIntId } from "./useGetIntId"

export const useGetPostFromUrl = () => {
  const Id = useGetIntId()
  return usePostByIdQuery({
    variables: {
      postByIdId: Id as string,
    },
  })
}
