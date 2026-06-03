import { db } from "@/src/db"
import { InsertMeeti, SelectMeeti } from "../types/meeti.types"
import { meeti, meetiLocations } from "@/src/db/schema"
import { format } from "date-fns"
import { and, asc, eq, gte } from "drizzle-orm"


export interface IMeetiRepository {
  insert(data: InsertMeeti): Promise<void>
  findUpcommingByUserId(userId: string): Promise<SelectMeeti[]>
  findById(id: string): Promise<SelectMeeti | null>
  update(data: InsertMeeti): Promise<void>
}

class MeetiRepository implements IMeetiRepository{ 
  async insert(data: InsertMeeti): Promise<void> {
    const [insertMeeti] = await db.insert(meeti).values(data).returning();
    if (!insertMeeti.virtual && data.location) {
      await db.insert(meetiLocations).values({
        meetiId: insertMeeti.id,
        ...data.location
      })
    }
  }
  
  async findUpcommingByUserId(userId: string): Promise<SelectMeeti[]> {
    const today = format(new Date(), 'yyyy-MM-dd');
    const result = await db
      .select()
      .from(meeti)
      .where(
        and(
          eq(meeti.createdBy, userId),
          gte(meeti.date, today)
        )
      )
      .orderBy(asc(meeti.date))
    return result;
  }

  async findById(id: string): Promise<SelectMeeti | null> {
    const consult = await db.select()
      .from(meeti)
      .where(
        eq(meeti.id, id)
      )
      .leftJoin(meetiLocations, eq(meetiLocations.meetiId, id))
      .limit(1);
    const result = consult.map(meeti => {
      return {
        ...meeti.meetis,
        location: meeti.meeti_locations
      }
    })
    return result[0] ?? null;
  }

  async update(data: InsertMeeti): Promise<void> {
    // TODO: Actualizar datos 
   console.log(data);
  }

}

export const meetiRepository = new MeetiRepository()