import { useQuery } from "@tanstack/react-query"
import { getAdvocates, type AdvocateResponse } from "../queries/get-advocates"

export const useAdvocates = (page = 1, pageSize = 5) => {
  return useQuery<AdvocateResponse, Error>({
    queryKey: ["advocates", page, pageSize],
    queryFn: () => getAdvocates({ page, pageSize }),
  })
}
