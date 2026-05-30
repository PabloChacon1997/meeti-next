import { db } from "@/src/db"
import { InsertMeeti } from "../types/meeti.types"
import { meeti, meetiLocations } from "@/src/db/schema"


export interface IMeetiRepository {
  insert(data: InsertMeeti): Promise<void>
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

}

export const meetiRepository = new MeetiRepository()