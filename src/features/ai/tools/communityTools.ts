import { tool } from "ai"
import z from "zod"
import { communityService } from "../../communities/services/CommunityService"


export const communityTools = {
  getRecommendedCommunities: tool({
    description: 'Recomienda comunidades cuan el usuario busque o te pregunte una comunidad sobre un tema en especifico',
    inputSchema: z.object({
      query: z.string().describe('Tema de interés del usuario')
    }),
    execute : async ({query}) => {
      const communities = await communityService.searchCommunityByTopic(query);
      if (!communities.length) {
        return {
          communities: [],
          totalFound: 0,
          message: `No encontre comunidades relacionadas con ${query}. ¿Te gustaria buscar otro tipo de comunidades?` 
        }
      }
      return {
        communities,
        totalFound: communities.length
      }
    } 
  })
}