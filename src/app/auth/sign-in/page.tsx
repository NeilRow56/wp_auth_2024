import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className="space-y-10 text-red-500">
      <LoginForm />
      <div>
        <Link href={'/auth/forgotPassword'}>Forgot Your Password?</Link>
      </div>
    </div>
  )
}

export default LoginPage
