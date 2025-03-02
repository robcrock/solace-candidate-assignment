import { z } from "zod"
import db from "../../../db"
import { advocates } from "../../../db/schema"
import { NextRequest } from "next/server"
import { sql } from "drizzle-orm" // Import sql for raw queries if needed

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

export async function GET(request: NextRequest) {
  try {
    // Parse URL search params
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1", 10)
    const pageSize = parseInt(searchParams.get("pageSize") || "5", 10)

    console.log("Pagination parameters:", { page, pageSize })

    try {
      // Get the total count of data
      const allData = await db.select().from(advocates)
      const totalCount = allData.length

      // Calculate offset for pagination
      const offset = (page - 1) * pageSize

      // Get paginated data
      const data = allData.slice(offset, offset + pageSize)

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / pageSize)
      const hasNextPage = page < totalPages
      const hasPreviousPage = page > 1

      // Validate the data
      const result = z.array(zAdvocateSchema).safeParse(data)

      if (!result.success) {
        console.error("Validation failed:", result.error)
        return Response.json(
          { error: "Data validation failed" },
          { status: 500 }
        )
      }

      return Response.json({
        data: result.data,
        pagination: {
          page,
          pageSize,
          totalPages,
          totalCount,
          hasNextPage,
          hasPreviousPage,
        },
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      const errorMessage =
        dbError instanceof Error ? dbError.message : "Unknown database error"
      return Response.json(
        { error: "Database operation failed", details: errorMessage },
        { status: 500 }
      )
    }
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
