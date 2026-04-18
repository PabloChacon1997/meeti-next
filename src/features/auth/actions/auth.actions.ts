"use server"

import { ForgotPasswordInput, ForgotPasswordSchema, SignInInput, SignInShcema, SignUpInput, SignUpSchema } from "../schemas/authSchema"
import { authService } from "../services/AuthService"

export async function signUpAction(input: SignUpInput) {
  const data = SignUpSchema.safeParse(input)
  if (!data.success) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }

  const response = await authService.register(data.data);
  return response;
}

export async function signInAction(input: SignInInput) {
  const data = SignInShcema.safeParse(input);
  if (!data.success) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }

  const response = await authService.login(data.data)
  return response;
}

export async function forgotPasswordAction(input: ForgotPasswordInput) {
  const data = ForgotPasswordSchema.safeParse(input);
  if (!data.success) {
    return {
      error: 'Hubo un error',
      success: ''
    }
  }

  const response = await authService.requestPasswordReset(data.data);
  return response;
}