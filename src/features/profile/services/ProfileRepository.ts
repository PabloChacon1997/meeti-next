import { db } from "@/src/db"
import { User } from "../../auth/types/auth.types"
import { community, meeti, users } from "@/src/db/schema"
import { and, asc, eq, gte } from "drizzle-orm"
import { FullProfile } from "../types/profile.types"
import { format } from "date-fns"

export interface IProfileRepository {
  findById(userId: string): Promise<User>
  findFullProfileById(userId: string): Promise<FullProfile | undefined>
}

class ProfileRepository implements IProfileRepository {
  async findById(userId: string): Promise<User> {
    const [result] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return result;
  }

  async findFullProfileById(userId: string): Promise<FullProfile | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      let result = undefined;
    if (user) {
      const today = format(new Date(), 'yyyy-MM-dd');
      const userCommunities = await db
        .select()
        .from(community)
        .where(eq(community.createdBy, userId))
        .limit(3);
      const userMeetis = await db
        .select()
        .from(meeti)
        .where(
          and(
            eq(meeti.createdBy, userId),
            gte(meeti.date, today),
          )
        )
        .orderBy(asc(meeti.date))
        .limit(3);
      result = {
        ...user,
        communities: userCommunities,
        meetis: userMeetis,
      }
    } 

    return result;
  }

}

export const profileRepository = new ProfileRepository()