import { User } from "better-auth";
import { IMembershipRepository, membershipRepository } from './MembershipRepository';
import { communityRepository, ICommunityRepository } from './CommunityRepository';
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { CommunityPolicy } from "../policies/CommunityPolicy";

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
    const joined = await this.membershipRepository.findJoinCommunities(user.id);
    const enriched = await Promise.all(joined.map(async ({community, user}) => {
      const isMember = true;
      const isAdmin = CommunityPolicy.isAdmin(user, community);
      const memberCount = await this.membershipRepository.getMemberCount(community.id)
      return {
        data: community,
        memberCount,
        context: {
          isMember,
          isAdmin
        },
        permissions: {
          canEdit: CommunityPolicy.canEdit(user, community),
          canDelete: CommunityPolicy.canDelete(user, community),
          canJoin: MembershipPolicy.canJoin(user, community, isMember),
          canLeave: MembershipPolicy.canLeave(user, community, isMember),
          canViewMembers: CommunityPolicy.canViewMembers(user, community),
        }
      }
    }))
    return enriched;
  }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository);