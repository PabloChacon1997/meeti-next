import { Metadata } from "next";

import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import AISearch from "@/src/features/ai/components/AISearch";


export const metadata: Metadata = {
  title: generatePageTitle('Asistente IA')
}

export default function AIPage() {
  return (
    <main className="py-16 max-w-4xl mx-auto">
      <Heading className="text-center">Asistente IA Meeti</Heading>
      <AISearch />
    </main>
  )
}
