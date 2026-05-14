import { db } from "@/src/db"
import { communityMmebers } from "@/src/db/schema"

export interface IMembershipRepository {
  addMember(communityId: string, userId: string): Promise<void>
}

class MembershipRepository implements IMembershipRepository{
  async addMember(communityId: string, userId: string): Promise<void> {
    await db.insert(communityMmebers).values({communityId, userId})
  }
}

export const membershipRepository = new MembershipRepository()