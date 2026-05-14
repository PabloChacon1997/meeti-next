import { User } from "better-auth";
import { IMembershipRepository, membershipRepository } from './MembershipRepository';

class MembershipService {
  constructor(
    private membershipRepository: IMembershipRepository
  ) {}
  async toogleMembsership(communityId: string, user: User) {
    await this.membershipRepository.addMember(communityId, user.id);
  }
}

export const membershipService = new MembershipService(membershipRepository);