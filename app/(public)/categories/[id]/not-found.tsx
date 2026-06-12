import Link from "next/link";

import Heading from "@/src/shared/components/typography/Heading";

export default function NotFound() {
  return (
    <div className="py-10 text-center">
      <Heading>Categoría no encontrada</Heading>
      <Link href={`/`}>Talvez quieras ir al inicio</Link>
    </div>
  )
}
