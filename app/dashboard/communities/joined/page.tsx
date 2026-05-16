import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { requireAuth } from "@/src/lib/auth-server"
import { generatePageTitle } from "@/src/shared/utils/metadata"
import Heading from "@/src/shared/components/typography/Heading"
import { membershipService } from "@/src/features/communities/services/MembershipService"
import CommunityItem from "@/src/features/communities/components/CommunityItem"

const title =  'Comunidades a las que te uniste'

export const metadata: Metadata = {
  title: generatePageTitle(title)
}

export default async function JoinCommunitiesPage() {
  const { session } = await requireAuth()
  if(!session) redirect('/auth/login')

  const communities = await membershipService.getJoinCommunities(session.user)
  return (
    <>
      <Heading>{title}</Heading>
      <Link
        href="/dashboard/communities" 
        className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-xs lg:text-xl text-white py-3 px-10  font-bold"
      >Volver a mis Comunidades</Link>
      {
        communities.length ?
          (
            <ul role="list" className="divide-y divide-gray-100 m-10 shadow-lg p-10">
              {
                communities.map(community => (
                  <CommunityItem key={community.data.id} community={community} />
                ))
              }
            </ul>
          ) 
          : (<p className="text-center mt-10 text-lg">No te has unido a ninguna comunidad aún</p>)
      }
    </>
  )
}
