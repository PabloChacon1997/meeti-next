import z from 'zod'


export const BaseAuthSchema = z.object({
  name: z.string().trim().min(1, {error: 'El nombre es obligatorio'}),
  email: z.email({error: 'El email no es válido'}),
  password: z.string().trim().min(8, { error: 'El password debe ser minimo de 8 caracteres'}),
  password_confirmation: z.string().trim().min(1, { error: 'El password de confirmacion no debe ir vacio'}),
  new_password: z.string().trim().min(8, { error: 'El password debe ser minimo de 8 caracteres'}),
  current_password: z.string().trim().min(1, {error: 'El password no puede ir vacío'}),
});

export const SignInShcema = BaseAuthSchema.pick({
  email: true,
}).extend({
  password: z.string().trim().min(1, { error: 'El password no debe ir vacio'})
});

export const SignUpSchema = BaseAuthSchema.pick({
  name: true,
  email: true,
  password: true,
  password_confirmation: true,
}).refine((data) => data.password === data.password_confirmation, {
  error: 'Los Passwords no son iguales',
  path: ['password_confirmation']
})

export const ForgotPasswordSchema = BaseAuthSchema.pick({
  email: true,
})

export const SetPasswordSchema = BaseAuthSchema.pick({
  new_password: true,
  password_confirmation: true,
}).refine((data) => data.new_password === data.password_confirmation, {
  error: 'Los Passwords no son iguales',
  path: ['password_confirmation']
});

export const CheckPasswordSchema = z.object({
  password: z.string().min(1, {error: 'Password no puede ir vacio'})
})

export const ChangePasswordSchema = BaseAuthSchema.pick({
  current_password: true,
  new_password: true,
  password_confirmation: true,
}).extend({
  revoke_other_sessions: z.boolean()
}).refine(data => data.new_password === data.password_confirmation, {
  error: 'Los Paaswords no son iguales',
  path: ['password_confirmation']
})

export type SignUpInput =z.infer<typeof SignUpSchema>;
export type SignInInput =z.infer<typeof SignInShcema>;
export type ForgotPasswordInput =z.infer<typeof ForgotPasswordSchema>;
export type SetPasswordInput =z.infer<typeof SetPasswordSchema>;
export type CheckPasswordInput =z.infer<typeof CheckPasswordSchema>;
export type ChangePasswordInput =z.infer<typeof ChangePasswordSchema>;