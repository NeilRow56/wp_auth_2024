'use client'

import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

const SigninButton = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          {session && session.user.email}
          <Link
            className="tex-sky-500 transition-colors hover:text-sky-600"
            href={'/api/auth/signout'}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <div className="flex flex-col space-y-6">
          <Button onClick={() => signIn()}>Sign In</Button>
          <Button asChild variant="outline">
            <Link href={'/auth/sign-up'}>Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default SigninButton
