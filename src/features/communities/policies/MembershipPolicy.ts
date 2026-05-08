import { User } from "better-auth";
import { SelectCommunity } from "../types/community.types";


export class MembershipPolicy {
  static canJoin(user: User, community: SelectCommunity, isMember: boolean): boolean {
    if (isMember) return false;
    if (community.createdBy === user.id) return false;

    return true;
  }
  
  static canLeave(user: User, community: SelectCommunity, isMember: boolean): boolean {
    if (community.createdBy === user.id) return false;
    return isMember;
  }
}