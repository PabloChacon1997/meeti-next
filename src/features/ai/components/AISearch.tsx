"use client"
import { useState } from 'react';
import { useChat } from '@ai-sdk/react'

import { Form, FormLabel, FormSubmit, FormTextArea } from "@/src/shared/components/forms"
import { Message } from '../types/ai.types';
import CommunityCard from '../../communities/components/CommunityCard';
import MeetiCard from '../../meetis/components/MeetiCard';

export default function AISearch() {
  const [input, setInput] = useState('');
  const { messages, status, sendMessage } = useChat<Message>();
  return (
    <>
      {
        messages.map(message => (
          <div 
            key={message.id}
            className='whitespace-pre-wrap mt-5 p-5 border-b border-green-300 last-of-type:border-none'
          >
            <p className={`${message.role === 'user' ? 'text-right': 'text-left'} font-black`}>
              {message.role === 'user' ? 'Usuario': 'Meeti AI'}
            </p>
            {
              message.parts.map((part, i) => {
                const key = `${message.id}-${i}`;
                if (part.type === 'text') {
                  return (
                    <div 
                      key={key}
                      className={message.role === 'user' ? 'text-right': 'text-left'}
                      dangerouslySetInnerHTML={{__html: part.text}}
                    />
                  )
                }

                if (part.type === 'tool-getRecommendedCommunities') {
                  if (part.state !== 'output-available') return null;
                  const { communities } = part.output
                  if (!communities.length) return (
                    <p key={key}>{part.output.message}</p>
                  );
                  return (
                    <div 
                      key={key}
                      className='space-y-4'
                    >
                      <p className='text-gray-700 font-medium'>
                        Encontré {communities.length === 1 ? 'Esta comunidad': `${communities.length} Comunidades`} sobre {''}
                        <span className='text-orange-600 font-bold'>{part.input.query}</span>
                      </p>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10'>
                        {
                          communities.map(c => (
                            <CommunityCard key={c.id} community={c} target={true}/>
                          ))
                        }
                      </div>
                    </div>
                  )
                }

                if (part.type === 'tool-getMeetisBySubject' || part.type === 'tool-getVirtualMeetis') {
                  if (part.state !== 'output-available') return null;
                  const { meetis } = part.output;
                  if (!meetis.length) return (
                    <p key={key}>{part.output.message}</p>
                  )
                  return (
                    <div key={key} className='space-y-4'>
                      <p className='text-gray-700 font-medium'>
                        Encontré {meetis.length === 1 ? 'Este Meeti ': `${meetis.length} Meetis `} sobre {''}
                        <span className='text-orange-600 font-bold'>{part.input.query}</span>
                      </p>
                      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10'>
                        {
                          meetis.map(m => (
                            <MeetiCard key={`${key}-${Math.random()}`} meeti={m}/>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        ))
      }

      {
        status === 'submitted' && (
          <div className='flex items-center justify-center py-5 gap-2 text-gray-500'>
            <div className='animate-spin size-5 border-2 border-t-transparent border-gray-400 rounded-full' />
              Pensando...
          </div>
        )
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
          disabled={input.trim() === '' || status === 'submitted'}
        />
      </Form>
    </>
  )
}


