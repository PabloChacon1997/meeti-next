import { and, count, eq } from "drizzle-orm"

import { db } from "@/src/db"
import { meetiAttendees, users } from "@/src/db/schema"
import { SelectMeetiAttendeeWithUser } from "../types/meeti.types"


export interface IMeetiAttendeesRepository {
  isUserAttending(userId: string, meetiId: string): Promise<boolean>
  insert(userId: string, meetiId: string): Promise<void>
  remove(userId: string, meetiId: string): Promise<void>
  findAttendeesCount( meetiId: string): Promise<number>
  findAttendeesByMeetiId( meetiId: string): Promise<SelectMeetiAttendeeWithUser[]>
}

class MeetiAttendeesRepository implements IMeetiAttendeesRepository{
  async isUserAttending(userId: string, meetiId: string): Promise<boolean> {
    const [result] = await db.select()
      .from(meetiAttendees)
      .where(
        and(
          eq(meetiAttendees.meetiId, meetiId),
          eq(meetiAttendees.userId, userId),
        )
      )
    return !!result;
  }

  async insert(userId: string, meetiId: string): Promise<void> {
    await db.insert(meetiAttendees).values({
      userId,
      meetiId
    })
  }
  async remove(userId: string, meetiId: string): Promise<void> {
    await db.delete(meetiAttendees).where(
      and(
        eq(meetiAttendees.userId, userId),
        eq(meetiAttendees.meetiId, meetiId),
      )
    )
  }

  async findAttendeesCount(meetiId: string): Promise<number> {
    const [result] = await db
      .select({total: count()})
      .from(meetiAttendees)
      .where(eq(meetiAttendees.meetiId, meetiId))
    return result.total;
  }

  async findAttendeesByMeetiId(meetiId: string): Promise<SelectMeetiAttendeeWithUser[]> {
    const consult = await db
      .select()
      .from(meetiAttendees)
      .where(eq(meetiAttendees.meetiId, meetiId))
      .leftJoin(users, eq(users.id, meetiAttendees.userId))
    const result = consult.map(meetiAttendee => {
      return {
        ...meetiAttendee.meeti_attendees!,
        user: meetiAttendee.users!
      }
    })

    return result;
  }

}

export const meetiAttendeesRepository = new MeetiAttendeesRepository()