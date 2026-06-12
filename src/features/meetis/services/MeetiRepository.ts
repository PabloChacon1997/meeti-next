import { db } from "@/src/db"
import { FullMeeti, InsertMeeti, InsertMeetiLocation, SelectMeeti } from "../types/meeti.types"
import { category, community, meeti, meetiLocations, users } from "@/src/db/schema"
import { format } from "date-fns"
import { and, asc, eq, gt, gte, or } from "drizzle-orm"


export interface IMeetiRepository {
  insert(data: InsertMeeti): Promise<void>
  findUpcommingByUserId(userId: string): Promise<SelectMeeti[]>
  findUpcomming(): Promise<SelectMeeti[]>
  findById(id: string): Promise<SelectMeeti | null>
  findFullById(id: string): Promise<FullMeeti | null>
  update(data: InsertMeeti, meetiId: string): Promise<void>
  findUpcomingByCommunity(communityId: string): Promise<SelectMeeti[]>
  findByCategory(categoryId: string): Promise<SelectMeeti[]>
  delete(meetiId: string): Promise<void>
}

class MeetiRepository implements IMeetiRepository{ 
  async insert(data: InsertMeeti): Promise<void> {
    const [insertMeeti] = await db.insert(meeti).values(data).returning();
    if (!insertMeeti.virtual && data.location) {
      await this.insertLocation({
        meetiId: insertMeeti.id,
        ...data.location
      })
    }
  }

  async insertLocation(data: InsertMeetiLocation) {
    await db.insert(meetiLocations).values(data);
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

  async findUpcomming(): Promise<SelectMeeti[]> {
    const now = new Date()
    const nowDate = now.toISOString().slice(0,10);
    const nowTime = now.toTimeString().slice(0,5);
    const result = await db
      .select()
      .from(meeti)
      .where(
        or(
          gt(meeti.date, nowDate),
          and(
            eq(meeti.date, nowDate),
            gte(meeti.time, nowTime),
          )
        )
      )
      .orderBy(
        asc(meeti.date),
        asc(meeti.time),
      )
      .limit(1);
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

  async findFullById(id: string): Promise<FullMeeti | null> {
    const [consult] = await db
      .select()
      .from(meeti)
      .where(eq(meeti.id, id))
      .leftJoin(meetiLocations, eq(meetiLocations.meetiId, id))
      .leftJoin(category, eq(category.id, meeti.categoryId))
      .leftJoin(community, eq(community.id, meeti.communityId))
      .leftJoin(users, eq(users.id, meeti.createdBy))
      .limit(1);
    let result = null;
    if (consult.meetis) {
      result = {
        ...consult.meetis,
        category: consult.categories!,
        community: consult.communities!,
        admin: consult.users!,
        location: consult.meetis.virtual ? null: consult.meeti_locations
      }
    }
    
    return result
  }

  async update(data: InsertMeeti, meetiId: string): Promise<void> {
    const [updatedMeeti] = await db.update(meeti).set(data).where(eq(meeti.id, meetiId)).returning();
    if(!updatedMeeti.virtual && data.location) {
      const locations = await db.select().from(meetiLocations).where(eq(meetiLocations.meetiId, updatedMeeti.id)).limit(1);
      if (locations[0]) {
        await db.update(meetiLocations).set(data.location).where(eq(meetiLocations.meetiId, updatedMeeti.id))
      } else {
        await this.insertLocation({
          meetiId: updatedMeeti.id,
          ...data.location,
        });
      }
    }
  }

  async findUpcomingByCommunity(communityId: string): Promise<SelectMeeti[]> {
    const today = format(new Date(), 'yyyy-MM-dd');
    return await db
      .select()
      .from(meeti)
      .where(
        and(
          eq(meeti.communityId, communityId),
          gte(meeti.date, today)
        )
      )
      .limit(3)
      .orderBy(asc(meeti.date));
  }

  async findByCategory(categoryId: string): Promise<SelectMeeti[]> {
    const today = format(new Date(), 'yyyy-MM-dd')
    const result = await db
      .select()
      .from(meeti)
      .where(
        and(
          eq(meeti.categoryId, categoryId),
          gte(meeti.date, today)
        )
      )
      .orderBy(asc(meeti.date))
      .limit(10);

    return result;

  }

  async delete(meetiId: string): Promise<void> {
    await db.delete(meeti).where(eq(meeti.id, meetiId));
  }

}

export const meetiRepository = new MeetiRepository()