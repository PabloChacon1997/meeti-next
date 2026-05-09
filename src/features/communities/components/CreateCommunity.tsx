"use client"
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Form, FormSubmit } from "@/src/shared/components/forms";
import CommunityForm from "./CommunityForm";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { creaetCommunityAction } from "../actions/community.actions";
import { redirect } from "next/navigation";

export default function CreateCommunity() {
  const methods = useForm({
    resolver: zodResolver(CommunitySchema),
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
      image: ''
    }
  })

  const onSubmit = async (data: CommunityInput) => {
    const {error, success} = await creaetCommunityAction(data);
    if(error) toast.error(error)
    if(success) {
      toast.success(success)
      redirect('/dashboard/communities')
    }
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CommunityForm />
        <FormSubmit value={'Crear comunidad'} />
      </Form>
    </FormProvider>
  )
}
