"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

import { FormLabel, FormInput, FormSubmit, Form, FormError } from "@/src/shared/components/forms"
import Heading from "@/src/shared/components/typography/Heading"
import { ChangePasswordInput, ChangePasswordSchema } from "../schemas/authSchema"
import { changePasswordAction } from "../actions/auth.actions"

export default function ChangePasswordForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'all'
  })

  const onSubmit = async (data: ChangePasswordInput) => {
    const { error, success } = await changePasswordAction(data);
    if(error) {
      toast.error(error)
    }
    if(success) {
      toast.success(success)
      reset();
    }
  }

  return (
    <>
        <Heading level={2} className="mt-10">
          Cambiar Password
        </Heading>

        <div className="mt-10 p-5 border border-gray-200">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="current_password">Password Actual</FormLabel>
            <FormInput 
              id="current_password"
              type="password"
              placeholder="Escribe tu Password Actual"
              {...register('current_password')}
            />
            {errors.current_password && <FormError>{errors.current_password.message}</FormError>}

            <FormLabel htmlFor="new_password">Nuevo Password</FormLabel>
            <FormInput 
              id="new_password"
              type="password"
              placeholder="Nuevo Password" 
              {...register('new_password')}
            />
            {errors.new_password && <FormError>{errors.new_password.message}</FormError>}


            <FormLabel htmlFor="password_confirmation">Repetir Nuevo Password</FormLabel>
            <FormInput 
              id="password_confirmation"
              type="password"
              placeholder="Repite el Nuevo Password"
              {...register('password_confirmation')}
            />
            {errors.password_confirmation && <FormError>{errors.password_confirmation.message}</FormError>}


            <div className="flex gap-5 mt-5">
              <FormLabel htmlFor="revoke_other_sessions">Cerrar sesión en todos los dispositivos </FormLabel>

              <FormInput 
                id="revoke_other_sessions"
                type='checkbox'
                className='accent-orange-500 p-6 size-5'
                {...register('revoke_other_sessions')}
              />
            </div>

            <FormSubmit value='Cambiar Password' />
          </Form>
        </div>
      </>
    )
}