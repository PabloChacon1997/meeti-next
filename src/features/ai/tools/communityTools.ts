import { tool } from "ai"
import z from "zod"


export const communityTools = {
  hola: tool({
    description: 'Utiliza este tool cuando el usuario te pregunta sobre comunidades de un tema en especifico"',
    inputSchema: z.object({
      query: z.string().describe('Tema de interés del usuario')
    }),
    execute: ({query}) => {
      return `El usuario preguntó por: ${query}`
    }
  })
}