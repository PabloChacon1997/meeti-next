import { db } from "@/src/db"
import { community, communityMmebers, users } from "@/src/db/schema"
import { and, count, eq } from "drizzle-orm"
import { JoinCommunity } from "../types/community.types"

export interface IMembershipRepository {
  addMember(communityId: string, userId: string): Promise<void>
  removeMember(communityId: string, userId: string): Promise<void>
  isMember(communityId: string, userId: string): Promise<boolean>
  findJoinCommunities(userId: string): Promise<JoinCommunity[]>
  getMemberCount(communityId: string): Promise<number>
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

  async findJoinCommunities(userId: string): Promise<JoinCommunity[]> {
    // const result = await db.query.communityMmebers.findMany({
    //   where: eq(communityMmebers.userId, userId),
    //   with: {
    //     community: true
    //   }
    // });
    const consult = await db.select().from(communityMmebers)
      .where(eq(communityMmebers.userId, userId))
      .leftJoin(community,eq(communityMmebers.communityId, community.id) )
      .leftJoin(users,eq(communityMmebers.userId, users.id) )
    const result = consult.map(r => {
      return {
        ...r.community_members,
        community: r.communities!,
        user: r.users!,
      }
    })
    return result;
  }

  async getMemberCount(communityId: string): Promise<number> {
    const [ result ] = await db
      .select({ total: count() })
      .from(communityMmebers)
      .where(eq(communityMmebers.communityId, communityId))

    return result.total
  }
}

export const membershipRepository = new MembershipRepository()