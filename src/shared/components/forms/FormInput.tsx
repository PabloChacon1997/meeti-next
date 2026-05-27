import clsx from "clsx"
import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement>

export function FormInput(props: Props) {
  const { className } = props
  return (
    <input 
        {...props}
        className={clsx("border border-slate-300 w-full p-2", className)}
      />
  )
}
