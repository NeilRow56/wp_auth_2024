'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '../ui/button'

import { CardWrapper } from './CardWrapper'
import { LoginSchema } from '@/schemas/auth'
import { PasswordInput } from './PasswordInput'
import { Loader2, LogIn } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginFormProps {
  callbackUrl?: string
}

export const LoginForm = ({ callbackUrl }: LoginFormProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.email,
      password: data.password,
    })

    if (!result?.ok) {
      toast.error(result?.error)
      return
    }
    startTransition(() => {
      router.push(callbackUrl ? callbackUrl : '/dashboard')
    })
    toast.success('Welcome To WP Auth 2024')
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={isPending}
                      placeholder="Password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="max-w-[150px]" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4" /> Processing
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
