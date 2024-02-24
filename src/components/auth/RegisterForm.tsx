'use client'

import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
// import { passwordStrength } from 'check-password-strength'
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
import { RegisterSchema } from '@/schemas/auth'
import { MailIcon } from 'lucide-react'
import { PasswordInput } from './PasswordInput'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'
import PasswordStrength from './PasswordStrength'
import { registerUser } from '@/app/actions/auth-actions/register'

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      //   agreedTerms: false,
    },
  })
  //   const [passStrength, setPassStrength] = useState(0)

  //   useEffect(() => {
  //     setPassStrength(passwordStrength(form.watch().password).id)
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [form.watch().password])

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    const { accepted, confirmPassword, ...user } = data
    try {
      const result = await registerUser(user)
      toast.success('The User Registered Successfully.')
    } catch (error) {
      toast.error('Something Went Wrong!')
      console.error(error)
    }
  }

  return (
    <CardWrapper
      headerLabel="Enter details to create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/sign-in"
    >
      <Form {...form}>
        <form
          className="gap-3 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className=" grid gap-3  sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} placeholder="Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
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
                      suffix={<MailIcon />}
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
                    <PasswordInput {...field} placeholder="" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <PasswordStrength passStrength={passStrength} /> */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">
                    {' '}
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-end space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      className=""
                      name="accepted"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    >
                      I Accept The <Link href="/terms">Terms</Link>
                    </Checkbox>
                  </FormControl>
                  <FormLabel>
                    I Accept the{' '}
                    <Link href="/">
                      <span className="text-blue-600">
                        Terms and Conditions
                      </span>
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
