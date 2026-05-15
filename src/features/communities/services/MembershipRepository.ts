import { db } from "@/src/db"
import { community, communityMmebers, users } from "@/src/db/schema"
import { and, eq } from "drizzle-orm"

export interface IMembershipRepository {
  addMember(communityId: string, userId: string): Promise<void>
  removeMember(communityId: string, userId: string): Promise<void>
  isMember(communityId: string, userId: string): Promise<boolean>
  findJoinCommunities(userId: string): Promise<void>
}

class MembershipRepository implements IMembershipRepository{
  async addMember(communityId: string, userId: string): Promise<void> {
    await db.insert(communityMmebers).values({communityId, userId})
  }

  async isMember(communityId: string, userId: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(communityMmebers)
      .where(
        and(
          eq(communityMmebers.communityId, communityId),
          eq(communityMmebers.userId, userId)
        )
      )
      .limit(1)
    return !!result;
  }
  async removeMember(communityId: string, userId: string): Promise<void> {
    await db.delete(communityMmebers).where(
      and(
        eq(communityMmebers.communityId, communityId),
        eq(communityMmebers.userId, userId),
      )
    )
  }

  async findJoinCommunities(userId: string): Promise<void> {
    // TODO: Realizar get con findMany
    // const result = await db.query.communityMmebers.findMany({
    //   where: eq(communityMmebers.userId, userId),
    //   with: {
    //     community: true
    //   }
    // });
    const result = await db.select().from(communityMmebers)
      .where(eq(communityMmebers.userId, userId))
      .leftJoin(community,eq(communityMmebers.communityId, community.id) )
    console.log(result);
  }
}

export const membershipRepository = new MembershipRepository()