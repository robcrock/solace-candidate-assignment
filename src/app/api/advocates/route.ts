import { z } from "zod";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

const zSpecialty = z.string();

const zAdvodateSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  degree: z.string(),
  specialties: z.array(zSpecialty),
  yearsOfExperience: z.number(),
  phoneNumber: z.number(),
});

export type Advocate = z.infer<typeof zAdvodateSchema>;

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const data = advocateData;

  const result = zAdvodateSchema.safeParse(data);
  if (!result.success) {
    console.error("Validation failed:", result.error);
  }

  return Response.json({ data });
}
