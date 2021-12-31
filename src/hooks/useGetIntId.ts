import { useRouter } from "next/router"

export const useGetIntId = () => {
  const router = useRouter()
  const Id = router.query.id

  return Id
}
