"use client"

import { Form, FormLabel, FormSubmit, FormTextArea } from "@/src/shared/components/forms"

export default function AISearch() {
  return (
    <>
      <Form>
        <FormLabel htmlFor="prompt">Busca Meetis y Comunidades utilizando IA</FormLabel>
        <FormTextArea
          id="prompt"
        />

        <FormSubmit value={'Consultar'}/>
      </Form>
    </>
  )
}


