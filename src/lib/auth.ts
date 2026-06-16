import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { nextCookies } from "better-auth/next-js";
import { AuthEmailService } from "../emails/services/AuthEmailService";



export const auth = betterAuth({
  trustedOrigins: ['http://192.168.124.1:3000'],
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await AuthEmailService.sendPasswordResetToken({
        name: user.name,
        email: user.email,
        url
      })
    }
  },
  emailVerification: {
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({user, url}) => {
      await AuthEmailService.sendVerificationEmal({
        name: user.name,
        email: user.email,
        url
      })
    }
  },
  user: {
    additionalFields: {
      bio: {
        type: 'string',
        required: false,
      }
    }
  },
  plugins: [nextCookies()],
})
