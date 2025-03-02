import { Advocate } from "@/app/api/advocates/route"

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

export const getAdvocates = async ({
  page = 1,
  pageSize = 5,
} = {}): Promise<AdvocateResponse> => {
  const response = await fetch(
    `/api/advocates?page=${page}&pageSize=${pageSize}`
  )

  if (!response.ok) {
    throw new Error("Failed to fetch advocates")
  }

  return response.json()
}
