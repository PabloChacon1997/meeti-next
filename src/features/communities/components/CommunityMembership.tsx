"use client"

import { useState } from "react"
import { CommunityPermissions } from "../types/community.types"
import { toogleMembershipAction } from "../actions/membership.actions"

type Props = {
  permissions: CommunityPermissions
  communityId: string
}

export default function CommunityMembership({permissions, communityId}: Props) {
  const [canJoin, setCanJoin] = useState(permissions.canJoin)
  const [canLeave, setCanLeave] = useState(permissions.canLeave);

  const handleClick = async () => {
    await toogleMembershipAction(communityId);
  }

  return (
    <>
      {
        canJoin && (
          <button
            className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-orange-600"
            onClick={handleClick}
          >Inscribirme a esta comunidad</button>
        )
      }
      {
        canLeave && (
          <button
            className="font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer bg-red-600"
            onClick={handleClick}
          >Abandonar comunidad</button>
        )
      }
    </>
  )
}
