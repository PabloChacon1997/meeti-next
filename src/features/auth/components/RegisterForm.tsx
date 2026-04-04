"use client"

import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"


export default function RegisterForm() {
  return (
    <Form>
      <FormLabel htmlFor="name">Nombre</FormLabel>
      <FormInput 
        id="name"
        type="text"
        placeholder="Ingresa tu Nombre"
      />
      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput 
        id="email"
        type="email"
        placeholder="Ingresa tu E-mail"
      />
      <FormLabel htmlFor="password">Contraseña</FormLabel>
      <FormInput 
        id="password"
        type="password"
        placeholder="Ingresa tu Contraseña"
      />
      <FormLabel htmlFor="password_confirmation">Repite tu contraseña</FormLabel>
      <FormInput 
        id="password_confirmation"
        type="password_confirmation"
        placeholder="Repite tu Contraseña"
      />
      <FormSubmit value="Registrarme" />
    </Form>
  )
}
