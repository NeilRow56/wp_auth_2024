'use server'

import bcryptjs from 'bcryptjs'

import * as z from 'zod'

import { db } from '@/lib/db'

import { LoginSchema } from '@/schemas/auth'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const hashedPassword = await bcryptjs.hash(password, 12)

  //check if user already exists

  //TODO send verification token email

  return { success: 'Confirmation email sent!' }
}
