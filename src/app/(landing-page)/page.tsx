import SigninButton from '@/components/auth/SigninButton'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Home() {
  // const { userId } = auth()

  // if (userId) redirect('/dashboard')
  return (
    <section className="flex h-screen items-center justify-center bg-background">
      <div className="relative mx-auto w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <span className="w-auto rounded-full bg-secondary px-6 py-3">
              <span className="text-sm font-medium text-primary">
                Landing Page
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
              WpInst
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-base text-secondary-foreground lg:text-xl">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et d
            </p>
          </div>

          <div className="-col mx-auto mt-10 flex max-w-sm flex-col justify-center space-y-4">
            <div className="mx-auto flex flex-col space-y-4">
              <div className="mx-auto flex flex-col space-y-4">
                <SigninButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
