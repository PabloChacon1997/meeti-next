"use client"
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormSubmit } from "@/src/shared/components/forms"
import MeetiForm from "./MeetiForm"
import { useSession } from "@/src/lib/auth-client";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";

export default function CreateMeeti() {

   const methods = useForm<MeetiInput>({
    resolver: zodResolver(MeetiSchema) as Resolver<MeetiInput>,
    mode: 'all',
    defaultValues: {
      title: '',
      details: '',
      categoryId: '',
      communityId: '',
      availableSeats: 0,
      date: '',
      time: '',
      image: '',
      virtual: false,
      location: {
        placeName: '',
        address: '',
        city: '',
        country: '',
        lat: -2.881278,
        lng: -78.960774
      }
    }
  })




  const {isPending} = useSession();
  if (isPending) return 'Cargando...'
  return (
    <FormProvider {...methods}>
      <Form>
        <MeetiForm />
        <FormSubmit value={'Crear Meeti'} />
      </Form>
    </FormProvider>
  )
}
