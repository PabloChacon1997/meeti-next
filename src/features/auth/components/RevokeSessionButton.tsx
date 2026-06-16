"use client"

import { revokeSession } from "@/src/lib/auth-client"
import { redirect } from "next/navigation"
import toast from "react-hot-toast"

type Props = {
  token: string
}

export default function RevokeSessionButton({token}: Props) {
  return (
    <button 
      className="bg-red-600 font-bold px-3 py-1 rounded-sm text-white uppercase text-sm cursor-pointer"
      onClick={ async() => {
        await revokeSession({token});
        toast.success('Se cerro la sesión correctamente')
        redirect('/dashboard/security')
      }}
    >
      Cerrar Sesión
    </button>
  )
}

