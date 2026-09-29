"use client"
import { useState } from 'react';
import { useChat } from '@ai-sdk/react'

import { Form, FormLabel, FormSubmit, FormTextArea } from "@/src/shared/components/forms"

export default function AISearch() {
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat();
  return (
    <>
      {
        messages.map(message => (
          <p key={message.id}>
            {message.parts.map(part => part.text).join('')}
          </p>
        ))
      }
      <Form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input })
          setInput('');
        }}
      >
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


