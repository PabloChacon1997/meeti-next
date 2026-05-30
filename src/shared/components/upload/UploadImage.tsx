import { useState } from "react";
import { twMerge } from "tailwind-merge"

import { UploadDropZone } from "../../utils/uploadthing"
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { CommunityInput } from "@/src/features/communities/schemas/communitySchema";
import { FormError } from "../forms";
import { MeetiInput } from "@/src/features/meetis/schemas/meetiSchema";

export default function UploadImage() {
  const { formState: { errors }, setValue, getValues } = useFormContext<CommunityInput | MeetiInput>()
  const [uploadedImage, setUploadedImage] = useState('');
  const currentImage = getValues('image') ? getValues('image'): null;
  return (
    <>
      <UploadDropZone
        endpoint={'meetiUploader'}
        className="ut-button:bg-orange-600 hover:ut-button:bg-orange-700"
        onClientUploadComplete={(res) => {
          setUploadedImage(res[0].ufsUrl)
          setValue('image', res[0].ufsUrl, { shouldValidate: true })
        }}
        appearance={{
          button: "font-black py-3 w-full block h-auto rounded-none after:bg-orange-500 after:h-2 after:top-0",
          label: "text-sm text-grey-600 hover:text-grey-600",
          allowedContent: "text-sm"
        }}
        content={{
          button: "Selecciona un imagen",
          label: "Elige un archivo o arrástralo aquí",
          allowedContent: "Máximo 1 imagen de 1MB"
        }}
        config={{
          cn: twMerge,
          mode: "auto",
        }}
      />
      {errors.image && <FormError>{errors.image.message}</FormError>}
      {uploadedImage && (
        <>
          <p className="text-lg font-bold">Imagen Nueva:</p>
          <Image
            src={uploadedImage}
            alt="Imagen publicada"
            width={300}
            height={200}
          />
        </>
      )}
      {
        currentImage && !uploadedImage && (
          <>
            <p className="text-lg font-bold">Imagen Actual:</p>
            <Image
              src={currentImage}
              alt="Imagen publicada"
              width={300}
              height={200}
            />
          </>
        )
      }
    </>
  )
}
