import z from 'zod'


export const BaseAuthSchema = z.object({
  name: z.string().trim().min(1, {error: 'El nombre es obligatorio'}),
  email: z.email({error: 'El email no es válido'}),
  password: z.string().trim().min(8, { error: 'El password debe ser minimo de 8 caracteres'}),
  password_confirmation: z.string().trim().min(1, { error: 'El password de confirmacion no debe ir vacio'}),
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

export type SignUpInput =z.infer<typeof SignUpSchema>;
export type SignInInput =z.infer<typeof SignInShcema>;
export type ForgotPasswordInput =z.infer<typeof ForgotPasswordSchema>;