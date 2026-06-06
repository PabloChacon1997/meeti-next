"use client"

import { useState } from "react"
import toast from "react-hot-toast"

import { CommunityPermissions } from "../types/community.types"
import { toogleMembershipAction } from "../actions/membership.actions"

type Props = {
  permissions: CommunityPermissions
  communityId: string
}

export default function CommunityMembership({permissions, communityId}: Props) {
  const [canJoin, setCanJoin] = useState(permissions.canJoin)

  const handleClick = async () => {
    const result = await toogleMembershipAction(communityId);
    if (result?.success) {
      toast.success(result.message)
      setCanJoin(result.newPermissions.canJoin)
    }
  }

  return (
    <>
      <button
            className={`${canJoin ? 'bg-orange-500': 'bg-red-600'} font-bold text-lg w-full lg:w-auto px-5 py-2 text-white cursor-pointer`}
            onClick={handleClick}
          >{ canJoin ? 'Inscribirme a esta comunidad': 'Abandonar comunidad'}</button>
    </>
  )
}
