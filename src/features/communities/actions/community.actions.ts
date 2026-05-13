"use server"
import { requireAuth } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/communitySchema";
import { communityService } from "../services/CommunityService";
import { CheckPasswordInput, CheckPasswordSchema } from "../../auth/schemas/authSchema";


export async function creaetCommunityAction(input: CommunityInput) {
  const data = CommunitySchema.safeParse(input);
  if (!data.success) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }

  const {session} = await requireAuth()
  if (!session) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }

  await communityService.createCommunity(data.data, session.user.id);
  return {
    error: '',
    success: 'Comunidad Creada Correctamente'
  }
}

export async function editCommunityAction(input: CommunityInput, id: string) {
  const {session} = await requireAuth()
  if (!session) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }

  const data = CommunitySchema.safeParse(input);
  if (!data.success) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }
  await communityService.updateCommunity(data.data, id, session.user);
  return {
    success: 'Comunidad Actualizada correctamente',
    error: ''
  }
}

export async function deleteCommunityAction(input: CheckPasswordInput, id: string) {
  const {session} = await requireAuth()
  if (!session) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }

  const data = CheckPasswordSchema.safeParse(input);
  if (!data.success) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }
  const response = await communityService.deleteCommunity(id, input.password, session.user);
  return response;
}