import { NextRequest } from "next/server";
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { UIMessage, convertToModelMessages, streamText} from 'ai'
import { tools } from "@/src/features/ai/tools";

export async function POST(req: NextRequest) {
  const { messages } : { messages: UIMessage[] }= await req.json()
  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_KEY
  });

  const result = streamText({
    messages: await convertToModelMessages(messages),
    system: `Eres un asistente de Meeti AI que ayuda a encontrar comunidades y meetis.`,
    // model: openrouter('qwen/qwen3.8-27b:free'),
    model: openrouter('poolside/laguna-s-2.1:free'),
    tools
  });

  return result.toUIMessageStreamResponse()
}