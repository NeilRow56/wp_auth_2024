import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import { getVerificationTokenByEmail } from '@/data/verification-token'
import { generateVerificationToken } from './tokens'
import { getUserById } from '@/data/user'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/sign-in',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'User Name',
          type: 'text',
          placeholder: 'Your User Name',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      // Below we are using the user's email as their username
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: {
            email: credentials?.username,
          },
        })

        if (!user) throw new Error('User name or password is not correct')

        if (!credentials?.password)
          throw new Error('Please Provide Your Password')
        const isPassowrdCorrect = await bcryptjs.compare(
          credentials.password,
          user.password
        )

        if (!isPassowrdCorrect)
          throw new Error('User name or password is not correct')

        const existingToken = await getVerificationTokenByEmail(
          credentials.username
        )

        // if (!user.emailVerified) {
        //   const verificationToken = await generateVerificationToken(user.email)
        // }

        // if (!user.emailVerified)
        //   throw new Error('Email sent - please activate to enable login!')

        const { password, ...userWithoutPass } = user
        return userWithoutPass
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id)
      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      return true
    },

    async jwt({ token, user }) {
      if (user) token.user = user as User
      return token
    },

    async session({ token, session }) {
      session.user = token.user
      return session
    },
  },
}
