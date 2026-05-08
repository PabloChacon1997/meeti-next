import { db } from "@/src/db";
import { eq } from "drizzle-orm";

import { InsertCommunity, SelectCommunity } from "../types/community.types";
import { community } from "@/src/db/schema";

export interface ICommunityRepository {
  create(data: InsertCommunity): Promise<SelectCommunity>;
  findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
}

class CommunityRepository implements ICommunityRepository {
  async create(data: InsertCommunity) {
    const [result] = await db.insert(community).values(data).returning()
    return result;
  }
  
  async findByUser(userId: string, limit = 10): Promise<SelectCommunity[]> {
    const communities = await db
      .select()
      .from(community)
      .where(eq(community.createdBy, userId))
      .limit(limit);
    return communities;
  }
}

export const communityRepository = new CommunityRepository();