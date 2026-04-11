import { auth } from "@/src/lib/auth"
import { SignUpInput } from "../schemas/authSchema"
import { authRepository, IAuthRepository } from './AuthRepository';


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
      }
    })

    return {
      error: '',
      success: 'Cuenta creada correctamente, revisa tu e-mail'
    }
  }
}

export const authService= new AuthService(authRepository)