import { headers } from "next/headers";

import { auth } from "@/src/lib/auth"
import { ChangePasswordInput, ForgotPasswordInput, SetPasswordInput, SignInInput, SignUpInput } from "../schemas/authSchema"
import { authRepository, IAuthRepository } from './AuthRepository';
import { APIError } from "better-auth";
import { checkPassword } from "@/src/shared/utils/auth";


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

  async requestPasswordReset(input: ForgotPasswordInput) {
    const user = await this.authRepository.userExists(input.email)
    if (!user) {
      return {
        error: 'No exite un usuario con este email',
        success: ''
      }
    }

    await auth.api.requestPasswordReset({
      body: {
        email: input.email,
      }
    })

    return {
      error: '',
      success: 'Te hemos enviado un email con instrucciones al correo ingresado'
    }
  }

  async confirmPasswordReset(input: SetPasswordInput, token: string) {
    try {
      await auth.api.resetPassword({
        body: {
          newPassword: input.new_password,
          token
        }
      })
      return {
        error: '',
        success: 'Password reestablecido correctamente'
      }
    } catch (error) {
      if(error instanceof APIError) {
        return {
          error: 'Token no válido o expirado',
          success: ''
        }
      }
    }
    return {
      error: '',
      success: ''
    }
  }

  async changePassword(input: ChangePasswordInput) {
    const { new_password, current_password, revoke_other_sessions } = input;

    const isValid = await checkPassword(current_password)
    if (!isValid) {
      return {
        error: 'El password actual es incorrecto',
        success: ''
      }
    }

    await auth.api.changePassword({
      body: {
        currentPassword: current_password,
        newPassword: new_password
      },
      headers: await headers()
    });

    if (revoke_other_sessions) {
      await auth.api.revokeOtherSessions({
        headers: await headers()
      });
    }
    return {
      error: '',
      success: 'El password se actualizo correctamente'
    }
  }

  async getSessions() {
    return auth.api.listSessions({
      headers: await headers()
    })
  }

  async getSession() {
    return auth.api.getSession({
      headers: await headers()
    })
  }
}

export const authService= new AuthService(authRepository)