"use client"
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormSubmit } from "@/src/shared/components/forms"
import MeetiForm from "./MeetiForm"
import { useSession } from "@/src/lib/auth-client";
import { MeetiInput, MeetiSchema } from "../schemas/meetiSchema";
import { createMeetiAction } from "../actions/meeti.actions";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

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



  const onSubmit = async (data: MeetiInput) => {
    const { error, success } = await createMeetiAction(data);
    if(error) toast.error(error)
    if(success) {
      toast.success(success)
      redirect('/dashboard/meetis')
    }
  }


  const {isPending} = useSession();
  if (isPending) return 'Cargando...'
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}  noValidate>
        <MeetiForm />
        <FormSubmit value={'Crear Meeti'} />
      </Form>
    </FormProvider>
  )
}
