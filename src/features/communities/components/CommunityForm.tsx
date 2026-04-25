import { FormError, FormInput, FormLabel, FormTextArea } from "@/src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "../schemas/communitySchema";


export default function CommunityForm() {
  const { register, formState: { errors } } = useFormContext<CommunityInput>()
  return (
    <>
      <FormLabel htmlFor="name">Nombre Comunidad</FormLabel>
      <FormInput
        id="name"
        type="text"
        placeholder="Titulo de la comunidad"
        {...register('name')}
      />
      {errors.name && <FormError>{errors.name.message}</FormError>}
      <FormLabel htmlFor="description">Descripcion de la Comunidad</FormLabel>
      <FormTextArea
        id="description"
        placeholder="Descripcion comunidad"
        {...register('description')}
      />
      {errors.description && <FormError>{errors.description.message}</FormError>}
    </>
  )
}