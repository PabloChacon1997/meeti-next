import { headers } from "next/headers";

import { auth } from "@/src/lib/auth"
import { SignInInput, SignUpInput } from "../schemas/authSchema"
import { authRepository, IAuthRepository } from './AuthRepository';
import { APIError } from "better-auth";


class AuthService {

  constructor(
    private authRepository: IAuthRepository
  ) {}

  async register(credentials: SignUpInput) {
    const { name, email, password } = credentials
    // Revisar si el usuario existe
    const user = await this.authRepository.userExists(email)
    if (user) {
      return {
        error: 'Este e-mail ya esta registrado',
        success: ''
      }
    }
    // Validacion de negocio
    // Manjejar registro
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        callbackURL: '/dashboard'
      },
      headers: await headers()
    })

    return {
      error: '',
      success: 'Cuenta creada correctamente, revisa tu e-mail'
    }
  }

  async login(credentials: SignInInput) {
    const { email, password } = credentials
    // Revisar si el usuario existe
    const user = await this.authRepository.userExists(email)
    if (!user) {
      return {
        error: 'Email y/o Password incorrectos',
        success: ''
      }
    }
    // Verficiar el password y si confirmo cuenta
    try {
      await auth.api.signInEmail({
        body: {
          email,
          password,
          callbackURL: '/dashboard'
        },
        headers: await headers()
      })
    } catch (error) {
      if(error instanceof APIError) {
        const messages: Record<number, string> = {
          401: 'Email y/o Password incorrectos',
          403: 'Tu cuenta no ha sido confirmada, hemos enviado un email',
        }
        
        const errorMessage = messages[error.statusCode];
        if (errorMessage) {
          return {
            error: errorMessage,
            success: ''
          }
        }
      }
    }

    return {
      error: '',
      success: 'Ha inciado sesion correctamente'
    }
  }
}

export const authService= new AuthService(authRepository)