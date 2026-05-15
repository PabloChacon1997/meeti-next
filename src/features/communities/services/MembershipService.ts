import { User } from "better-auth";
import { IMembershipRepository, membershipRepository } from './MembershipRepository';
import { communityRepository, ICommunityRepository } from './CommunityRepository';
import { MembershipPolicy } from "../policies/MembershipPolicy";

class MembershipService {
  constructor(
    private membershipRepository: IMembershipRepository,
    private communityRepository: ICommunityRepository,
  ) {}
  async toogleMembsership(communityId: string, user: User) {
    const community = await this.communityRepository.findById(communityId);
    if (!community) return;
    const isMember = await this.membershipRepository.isMember(community.id, user.id);
    if (MembershipPolicy.canJoin(user, community, isMember)) {
      await this.membershipRepository.addMember(communityId, user.id);
      return {
        success: true,
        message: `Te has unido a la comunidad: ${community.name}`,
        newPermissions: {
          canJoin: false,
          canLeave: true,
        }
      }
    }
    if (MembershipPolicy.canLeave(user, community, isMember)) {
      await this.membershipRepository.removeMember(community.id, user.id);
      return {
        success: true,
        message: `Has salido de la comunidad: ${community.name}`,
        newPermissions: {
          canJoin: true,
          canLeave: false,
        }
      }
    }


  }

  async getJoinCommunities(user: User) {
    await this.membershipRepository.findJoinCommunities(user.id);
  }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository);