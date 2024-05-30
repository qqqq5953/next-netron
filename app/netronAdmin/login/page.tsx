'use client'

import { useState } from "react";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/loader";

// import logo from "../assets/logo-light.png";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from "next/link";

const formSchema = z.object({
  userName: z.string().min(1, {
    message: "使用者名稱不得空白",
  }),
  password: z.string().min(1, {
    message: "密碼不得空白",
  })
})

export default function LoginPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showPassowrd, setShowPassword] = useState(false)

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  })

  async function onLogin({ userName, password }: z.infer<typeof formSchema>) {

  }

  return <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
    <div className="space-y-8 p-8 border-t-[10px] border-t-sky-600 bg-white shadow-md rounded-sm w-4/5 sm:w-2/3 lg:w-2/5 xl:w-1/3">
      <div className='flex justify-between items-center'>
        <div className="text-3xl text-neutral-800 font-medium">登入</div>
        {/* <img src={logo} alt="logo" className="inline w-48 mr-3" /> */}
      </div>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
          <FormField
            control={loginForm.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-base text-neutral-800">Username</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-none focus-visible:ring-0 focus-visible:outline-none focus:border-b-sky-500"
                    variant="bottom"
                    placeholder="Please enter username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-base text-neutral-800">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="rounded-none focus-visible:ring-0 focus-visible:outline-none focus:border-b-sky-500"
                      variant="bottom"
                      type={showPassowrd ? "text" : "password"}
                      placeholder="Please enter password"
                      {...field} />
                    <Button size="sm" variant="ghost" className="absolute top-0 right-0" type="button" onClick={() => setShowPassword(!showPassowrd)}>
                      {showPassowrd ?
                        <FaRegEye /> :
                        <FaRegEyeSlash />
                      }
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center">
            <Button variant="link">
              <Link className="text-sm text-sky-600" href="/forget-password">忘記密碼</Link>
            </Button>
            <Button
              type="submit"
              disabled={isLoggingIn}
              className="bg-sky-600 hover:bg-sky-600/80 rounded-sm"
            >
              {isLoggingIn && <div data-testid="loader">
                <Loader wrapperClassName="mr-2" className="text-white" />
              </div>}
              Log in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </div>
}
