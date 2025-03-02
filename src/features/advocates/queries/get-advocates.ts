import { Advocate } from "@/app/api/advocates/route"
import { SortingState } from "@tanstack/react-table"

export type AdvocateResponse = {
  data: Advocate[]
  pagination: {
    page: number
    pageSize: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}

const buildParams = (
  page: number,
  pageSize: number,
  filters: Record<string, any>,
  sorting?: SortingState
) => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })

  // Add any filters that have values
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value))
    }
  })

  // Add sorting parameters
  if (sorting && sorting.length > 0) {
    // If we have active sorting, use it
    params.append("sortField", sorting[0].id)
    params.append("sortDirection", sorting[0].desc ? "desc" : "asc")
  } else {
    // When sorting is cleared, set default sorting
    params.append("sortField", "id")
    params.append("sortDirection", "asc")
  }

  return params.toString()
}

export const getAdvocates = async ({
  page = 1,
  pageSize = 5,
  filters = {},
  sorting = [],
}: {
  page?: number
  pageSize?: number
  filters?: Record<string, any>
  sorting?: SortingState
} = {}): Promise<AdvocateResponse> => {
  const params = buildParams(page, pageSize, filters, sorting)

  const response = await fetch(`/api/advocates?${params}`)

  if (!response.ok) {
    throw new Error("Failed to fetch advocates")
  }

  return response.json()
}
