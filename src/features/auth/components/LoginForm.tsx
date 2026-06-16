"use client"

import { 
  Form,
  FormError,
  FormInput,
  FormLabel,
  FormSubmit 
} from "@/src/shared/components/forms"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { zodResolver } from "@hookform/resolvers/zod"

import { SignInInput, SignInShcema } from "../schemas/authSchema"
import { signInAction } from "../actions/auth.actions"
import { redirect } from "next/navigation"


export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(SignInShcema),
    mode: 'all',
  })
  const onSubmit = async (data: SignInInput) => {
    const {error, success} = await signInAction(data);
    if(error) {
      toast.error(error)
    }
    if(success) {
      toast.success(success)
      redirect('/dashboard')
    }
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput 
        type="email"
        id="email"
        placeholder="Ingrese tu E-mail"
        {...register('email')}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <FormLabel className="block" htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingrese tu Password"
        {...register('password')}
      />
      {errors.password && <FormError>{errors.password.message}</FormError>}
      <FormSubmit disabled={isSubmitting} value={isSubmitting ? 'Ingresando...': 'Iniciar Sesión'} />
    </Form>
  )
}
