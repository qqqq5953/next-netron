'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/app/netronAdmin/_components/Button'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  fstName: z.string().min(1, {
    message: "必填欄位",
  }),
  name: z.string().min(1, {
    message: "必填欄位",
  }),
  phone: z.string().optional(),
  email: z
    .string()
    .email({ message: "無效的信箱" })
    .min(1, {
      message: "必填欄位",
    }),
  subject: z.string().min(1, {
    message: "必填欄位",
  }),
  content: z.string().min(1, {
    message: "必填欄位",
  }),
})

export default function FormContact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fstName: "",
      name: "",
      phone: "",
      email: "",
      subject: "",
      content: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data', data);
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fstName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="姓氏*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="名字*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="聯絡電話" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="電子郵件*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="主題*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="內容*" {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" className='w-full'>送出</Button>
        </div>
      </form>
    </Form>
  )
}
