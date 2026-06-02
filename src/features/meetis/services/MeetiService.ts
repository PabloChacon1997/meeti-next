import { User } from "better-auth";

import { MeetiInput } from "../schemas/meetiSchema";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";
import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { MeetiPolicy } from "../policies/MeetiPolicy";


class MeetiService {
  constructor(
    private meetiRepository: IMeetiRepository,
    private communityRepository: ICommunityRepository,
  ) {}

  async createMeeti(data: MeetiInput, user: User) {
    const community = await this.communityRepository.findById(data.communityId);
    if (!community || !CommunityPolicy.isAdmin(user, community)) {
      throw new Error('No tienes permisos')
    }

    await this.meetiRepository.insert({...data, createdBy: user.id})
  }

  async getUpcommingMeetisByUser(user: User) {
    const upcommingMeetis = await this.meetiRepository.findUpcommingByUserId(user.id);

    const enriched = await Promise.all(upcommingMeetis.map(async (meeti) => {
      return {
        data: meeti,
        attendanceCount: 0,
        context: {
          isAdmin: MeetiPolicy.isAdmin(user, meeti),
        },
        permissions: {
          canViewAttendes: MeetiPolicy.canViewAttendes(user, meeti),
          canEdit: MeetiPolicy.canEdit(user, meeti),
          canDelete: MeetiPolicy.canDelete(user, meeti),
        }
      }
    }))

    return enriched;
  }
}

export const meetiService = new MeetiService(meetiRepository, communityRepository)