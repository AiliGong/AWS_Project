import NextAuth from 'next-auth'
import { signIn } from 'next-auth/client'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    })
  ],
  debug: true,
  useSecureCookies: false,
  callbacks: {
    async signIn(user, account, profile) {
      return true
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      // Get the information from cognito, then pass it inside the token for session usage
      profile && (token.user = profile);
      return Promise.resolve(token)   // ...here
    },
    async session(session, user) {
      // when session call back, user token user to replace session user
      return {
        ...session,
        user: user.user
      }
    }
  }
})
