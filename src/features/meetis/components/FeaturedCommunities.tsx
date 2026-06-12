import Heading from "@/src/shared/components/typography/Heading"
import { communityService } from "../../communities/services/CommunityService"
import CommunityCard from "../../communities/components/CommunityCard"

export default async function FeaturedCommunities() {
  const communities = await communityService.getFeaturedCommunities()
  return (
    <section className="bg-slate-100 py-16">
      <Heading level={2} className="text-center">Comunidades Destacadas</Heading>
      {
        communities.length 
        ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
            {
              communities.map(community => <CommunityCard key={community.id} community={community} />)
            }
          </div>
        )
        :(
          <p className="text-center mt-10 text-lg text-gray-600">
            No hay comunidades destacadas
          </p>
        )
      }
    </section>
  )
}
