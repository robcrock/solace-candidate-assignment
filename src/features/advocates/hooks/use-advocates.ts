import { useQuery } from "@tanstack/react-query"
import { getAdvocates, type AdvocateResponse } from "../queries/get-advocates"
import { SortingState } from "@tanstack/react-table"

export const useAdvocates = (
  page = 1,
  pageSize = 5,
  filters = {},
  sorting: SortingState = []
) => {
  return useQuery<AdvocateResponse, Error>({
    queryKey: ["advocates", page, pageSize, filters, sorting],
    queryFn: () => getAdvocates({ page, pageSize, filters, sorting }),
  })
}
