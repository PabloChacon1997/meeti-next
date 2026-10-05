import { tool } from "ai";
import z from "zod";
import { meetiService } from "../../meetis/services/MeetiService";


export const meetiTools = {
  getMeetisBySubject: tool({
    description: 'Recomienda Meetis cuando el usuario busque o te pregunte sobre un tema es específico',
    inputSchema: z.object({
      query: z.string().describe('Tema de interés del Meeti')
    }),
    execute: async ({query}) => {
      const meetis = await meetiService.getMeetisByTopic(query);
      if (!meetis.length) {
        return {
          meetis: [],
          totalFound: 0,
          message: `No encontré meetis relacionadas con ${query}. ¿Te gustaria buscar otro tipo de meetis?` 
        }
      }
      return {
        meetis,
        totalFound: meetis.length
      }
    }
  }),
  getVirtualMeetis: tool({
    description: `
      Usa esta heeramienta cuando el usuario pregunta por meetis o ecentos virtuales.
      - Si menciona un tema (React, IA, Marketing, Bitcoin, Café, etc) pásalo al query.
      - Si menciona "hoy", incluyelo dentro del query
      - Si el usuario solo pregunta por meetis virtuales, el query debe ir vacío
    `,
    inputSchema: z.object({
      query: z.string().optional().describe('tema de interés del usuario sobre el meeti o evento')
    }),
    execute: async ({query}) => {
      const meetis = await meetiService.getVirtualMeetis(query);
      if (!meetis.length) {
        return {
          meetis: [],
          totalFound: 0,
          message: `No encontré meetis relacionadas con ${query} que sean virtuales ¿Te gustaria intentar con otra búsqueda?` 
        }
      }
      return {
        meetis,
        totalFound: meetis.length
      }
    }
  }),
  // getInPersonMeetis: tool({
  //   description: `
  //     Usa esta herramienta cuando el usuario pregunte por eventos presenciales.
  //     Reglas:
  //       - Si el usuario menciona una ciudad, incluye en 'city'.
  //       - Si el usuario menciona una país, incluye en 'country'.
  //       - Si el usuario menciona un tema (React, Bitcoin, MKT, IA, Café), inclúyelo dentro de 'query'.
  //       - Si el usuario menciona hoy, pon 'today' como true.
  //   `,
  //   inputSchema: z.object({
  //     query: z.string().optional().describe('Tema de interés del Meeti o evento del usuario'),
  //     city: z.string().optional().describe('Ciudad del Meeti de interés del usuario'),
  //     country: z.string().optional().describe('País del Meeti de interés del usuario'),
  //     today: z.boolean().default(false).describe('El usuario desea un meeti o evento de hoy'),
  //   }),
  // })
}