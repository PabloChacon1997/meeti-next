"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useSearchParams } from "next/navigation";

import { Form, FormError, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"
import { SetPasswordInput, SetPasswordSchema } from "../schemas/authSchema";
import { setPasswordAction } from "../actions/auth.actions";
import toast from "react-hot-toast";

export default function SetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if (!token) redirect('/auth/forgot-password');

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(SetPasswordSchema),
    mode: 'all',
  });

  const onSubmit = async (data: SetPasswordInput) => {
    const {error, success} = await setPasswordAction(data, token);
    if(error) toast.error(error)
    if(success) {
      toast.success(success)
      redirect('/auth/login')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="new_password">Nuevo password</FormLabel>
      <FormInput
        type="password"
        id="new_password"
        placeholder="Ingresa tu nuevo password"
        {...register('new_password')}
      />
      {errors.new_password && <FormError>{errors.new_password.message}</FormError>}
      <FormLabel htmlFor="passwordConfirmation">Repetir Password</FormLabel>
      <FormInput
        type="password"
        id="passwordConfirmation"
        placeholder="Repite tu password"
        {...register('password_confirmation')}
      />
      {errors.password_confirmation && <FormError>{errors.password_confirmation.message}</FormError>}
      <FormSubmit value={'Reestablecer Password'} />
    </Form>
  )
}
