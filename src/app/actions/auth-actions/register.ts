'use server'

import bcryptjs from 'bcryptjs'

import * as z from 'zod'

import { db } from '@/lib/db'

import { RegisterSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/data/user'
import { compileActivationTemplate, sendMail } from '@/lib/mail'
import { signJwt, verifyJwt } from '@/lib/jwt'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password, firstName, lastName } = validatedFields.data

  const hashedPassword = await bcryptjs.hash(password, 12)

  //check if user already exists

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use' }
  }

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  })

  //TODO send verification token email

  const user = await getUserByEmail(email)

  const jwtUserId = signJwt({
    id: user?.id,
  })
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`
  const body = compileActivationTemplate(firstName, activationUrl)
  await sendMail({ to: email, subject: 'Activate Your Account', body })

  return { success: 'Confirmation email sent!' }
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<'userNotExist' | 'alreadyActivated' | 'success'>

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
  const payload = verifyJwt(jwtUserID)
  const userId = payload?.id
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) return 'userNotExist'
  if (user.emailVerified) return 'alreadyActivated'
  const result = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  })
  return 'success'
}
