import { z } from "zod"
import db from "../../../db"
import { advocates } from "../../../db/schema"
import { NextRequest } from "next/server"
import { sql, and, eq, asc, desc } from "drizzle-orm"
import { PgSelectBase } from "drizzle-orm/pg-core"

const zSpecialty = z.string()

const zAdvocateSchema = z.object({
  id: z.string().or(z.number().transform((n) => String(n))),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  degree: z.string(),
  specialties: z.array(zSpecialty),
  yearsOfExperience: z.number(),
  phoneNumber: z.number(),
})

export type Advocate = z.infer<typeof zAdvocateSchema>

interface AdvocateRecord {
  firstName: string
  lastName: string
  city: string
  degree: string
  specialties: string[]
  yearsOfExperience: number
  id: number
  phoneNumber: number
  createdAt: Date | null
}

interface QueryWithOrderBy {
  orderBy: (...args: any[]) => any
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1", 10)
    const pageSize = parseInt(searchParams.get("pageSize") || "5", 10)
    const offset = (page - 1) * pageSize

    // Get sorting parameters
    const sortField = searchParams.get("sortField") || "id"
    const sortDirection = searchParams.get("sortDirection") || "asc"

    const filters = {
      firstName: searchParams.get("firstName") || "",
      lastName: searchParams.get("lastName") || "",
      city: searchParams.get("city") || "",
      degree: searchParams.get("degree") || "",
      yearsOfExperience: searchParams.get("yearsOfExperience") || "",
    }

    // Build query conditions for filtering
    let conditions = []

    if (filters.firstName) {
      conditions.push(
        sql`LOWER(${
          advocates.firstName
        }) LIKE ${`%${filters.firstName.toLowerCase()}%`}`
      )
    }

    if (filters.lastName) {
      conditions.push(
        sql`LOWER(${
          advocates.lastName
        }) LIKE ${`%${filters.lastName.toLowerCase()}%`}`
      )
    }

    if (filters.city) {
      conditions.push(
        sql`LOWER(${advocates.city}) LIKE ${`%${filters.city.toLowerCase()}%`}`
      )
    }

    if (filters.degree) {
      conditions.push(
        sql`LOWER(${
          advocates.degree
        }) LIKE ${`%${filters.degree.toLowerCase()}%`}`
      )
    }

    if (filters.yearsOfExperience) {
      conditions.push(
        eq(advocates.yearsOfExperience, parseInt(filters.yearsOfExperience, 10))
      )
    }

    let totalCount = 0
    if (conditions.length > 0) {
      // Using a type assertion to help TypeScript
      const queryBuilder = db.select().from(advocates) as PgSelectBase<
        any,
        any,
        any
      >
      const filteredResult = await queryBuilder.where(and(...conditions))
      totalCount = filteredResult.length
    } else {
      const allResults = await db.select().from(advocates)
      totalCount = allResults.length
    }

    // Helper function to apply sorting based on field and direction
    const applySorting = (query: QueryWithOrderBy) => {
      const isAscending = sortDirection === "asc"

      switch (sortField) {
        case "firstName":
          return isAscending
            ? query.orderBy(asc(advocates.firstName))
            : query.orderBy(desc(advocates.firstName))
        case "lastName":
          return isAscending
            ? query.orderBy(asc(advocates.lastName))
            : query.orderBy(desc(advocates.lastName))
        case "city":
          return isAscending
            ? query.orderBy(asc(advocates.city))
            : query.orderBy(desc(advocates.city))
        case "degree":
          return isAscending
            ? query.orderBy(asc(advocates.degree))
            : query.orderBy(desc(advocates.degree))
        case "yearsOfExperience":
          return isAscending
            ? query.orderBy(asc(advocates.yearsOfExperience))
            : query.orderBy(desc(advocates.yearsOfExperience))
        default:
          return isAscending
            ? query.orderBy(asc(advocates.id))
            : query.orderBy(desc(advocates.id))
      }
    }

    let data: AdvocateRecord[] = []
    if (conditions.length > 0) {
      // Filtered query
      const queryBuilder = db.select().from(advocates) as PgSelectBase<
        any,
        any,
        any
      >
      const baseQuery = queryBuilder
        .where(and(...conditions))
        .limit(pageSize)
        .offset(offset)

      data = (await applySorting(baseQuery)) as AdvocateRecord[]
    } else {
      // Unfiltered query
      const queryBuilder = db.select().from(advocates) as PgSelectBase<
        any,
        any,
        any
      >
      const baseQuery = queryBuilder.limit(pageSize).offset(offset)

      data = (await applySorting(baseQuery)) as AdvocateRecord[]
    }

    const result = z.array(zAdvocateSchema).safeParse(data)

    if (!result.success) {
      console.error("Validation failed:", result.error)
      return Response.json({ error: "Data validation failed" }, { status: 500 })
    }

    const totalPages = Math.ceil(totalCount / pageSize)

    return Response.json({
      data: result.data,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching advocates:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error"
    return Response.json(
      { error: "Failed to fetch advocates", details: errorMessage },
      { status: 500 }
    )
  }
}
