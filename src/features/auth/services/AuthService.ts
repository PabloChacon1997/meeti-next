import { SignUpInput } from "../schemas/authSchema"


class AuthService {
  async register(credentials: SignUpInput) {
    const { name, email, password } = credentials
    // Revisar si el usuario existe
    // Validacion de negocio
    // Manjejar registro
  }
}

export const authService= new AuthService()