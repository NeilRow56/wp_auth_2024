'use server'
import { db } from '@/lib/db'
import { User } from '@prisma/client'
import bcryptjs from 'bcryptjs'

export async function registerUser(
  user: Omit<
    User,
    | 'id'
    | 'emailVerified'
    | 'imageUrl'
    | 'bio'
    | 'website'
    | 'gender'
    | 'colorScheme'
    | 'createdAt'
    | 'updatedAt'
    | 'active'
    | 'role'
  >
) {
  const result = await db.user.create({
    data: {
      ...user,
      password: await bcryptjs.hash(user.password, 10),
    },
  })
}
