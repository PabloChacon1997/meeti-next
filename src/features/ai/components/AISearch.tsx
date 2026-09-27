"use client"
import { useChat } from '@ai-sdk/react'
import { Form, FormLabel, FormSubmit, FormTextArea } from "@/src/shared/components/forms"
import { useState } from 'react';

export default function AISearch() {
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat();
  return (
    <>
      <Form>
        <FormLabel htmlFor="prompt">Busca Meetis y Comunidades utilizando IA</FormLabel>
        <FormTextArea
          id="prompt"
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <FormSubmit 
          value={'Consultar'}
          disabled={input.trim() === ''}
        />
      </Form>
    </>
  )
}


