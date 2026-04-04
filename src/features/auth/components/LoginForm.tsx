"use client"

import { 
  Form,
  FormInput,
  FormLabel,
  FormSubmit 
} from "@/src/shared/components/forms"


export default function LoginForm() {
  return (
    <Form>
      <FormLabel htmlFor="email">E-mail</FormLabel>
      <FormInput 
        type="email"
        id="email"
        placeholder="Ingrese tu E-mail"
      />
      <FormLabel className="block" htmlFor="password">Password</FormLabel>
      <FormInput
        type="password"
        id="password"
        placeholder="Ingrese tu Password"
      />
      <FormSubmit value="Iniciar Sesión" />
    </Form>
  )
}
