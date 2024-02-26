import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string
  }
}

const LoginPage = ({ searchParams }: LoginPageProps) => {
  // console.log({ searchParams })
  return (
    <div className="space-y-10 text-red-500">
      <LoginForm callbackUrl={searchParams.callbackUrl} />
      <div>
        <Link href={'/auth/forgotPassword'}>Forgot Your Password?</Link>
      </div>
    </div>
  )
}

export default LoginPage
