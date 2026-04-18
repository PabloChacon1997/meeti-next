"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import { ForgotPasswordInput, ForgotPasswordSchema } from "../schemas/authSchema"
import { forgotPasswordAction } from "../actions/auth.actions"

export default function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'all'
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    const { error, success } = await forgotPasswordAction(data);
    if(error) {
      toast.error(error)
    }
    if(success) {
      toast.success(success)
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput 
        type="email" 
        id="email" 
        placeholder="Ingresa tu E-mail"
        {...register('email')}
      />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <FormSubmit value="Recuperar password" />
    </Form>
  )
}
