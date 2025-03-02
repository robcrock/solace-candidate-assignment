import { useQuery } from "@tanstack/react-query"
import { getAdvocates } from "../queries/get-advocates"

const useAdvocates = () => {
  return useQuery({
    queryKey: ["advocates"],
    queryFn: getAdvocates,
  })
}

export { useAdvocates }
