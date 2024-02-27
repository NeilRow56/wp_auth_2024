import { activateUser } from '@/app/actions/auth-actions/register'
import { verifyJwt } from '@/lib/jwt'

interface Props {
  params: {
    jwt: string
  }
}

const ActivationPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt)
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {result === 'userNotExist' ? (
        <p className="text-2xl text-red-500">The user does not exist</p>
      ) : result === 'alreadyActivated' ? (
        <p className="text-2xl text-red-500">The user is already activated</p>
      ) : result === 'success' ? (
        <p className="text-2xl text-green-500">
          Success! The user is now activated
        </p>
      ) : (
        <p className="text-2xl text-yellow-500">Oops! Something went wrong!</p>
      )}
    </div>
  )
}

export default ActivationPage
