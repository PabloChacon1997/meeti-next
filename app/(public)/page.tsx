import { Metadata } from "next";

import Hero from "@/src/shared/components/ui/Hero";
import { generatePageTitle } from "@/src/shared/utils/metadata";


export const metadata: Metadata = {
  title: generatePageTitle('Inicio')
}

export default async function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
