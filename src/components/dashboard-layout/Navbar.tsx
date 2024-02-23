import { Button } from '../ui/button'
import Link from 'next/link'

function Navbar() {
  // Holding userId ready for auth
  const userId = 'Tommy'

  return (
    <div className="flex h-14 w-full items-center justify-center border border-gray-600  bg-white  px-2 dark:bg-neutral-950 md:px-12  lg:px-48">
      <div className=" flex gap-6 ">
        {userId ? (
          <Button asChild size="sm" className="px-6  ">
            <Link href="/sign-in">User</Link>
          </Button>
        ) : (
          <Button asChild size="sm" className="px-6  ">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
