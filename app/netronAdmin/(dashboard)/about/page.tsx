'use client'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormProvider, useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import MetaForm from '@/components/netronAdmin/global/meta-form'
import { Button } from '@/components/ui/button'
import React from 'react';
import dynamic from 'next/dynamic';
import Loader from "@/components/loader"

const CustomEditor = dynamic(() => {
  return import('@/components/custom-editor');
}, { ssr: false, loading: () => <Loader size={24} />, });

export const formSchema = z.object({
  metaTitle: z.string().min(1, {
    message: "META 標題不得空白",
  }),
  metaKeyword: z.string().min(1, {
    message: "META 關鍵字不得空白",
  }),
  metaDescription: z.string().min(1, {
    message: "META 描述不得空白",
  }),
  customizedDescription: z.string(),
  content: z.string().min(1, {
    message: "內容不得空白",
  }),
})

export default function AboutPage() {
  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "",
      metaKeyword: "",
      metaDescription: "",
      customizedDescription: "",
      content: "",
    },
  })

  async function onSubmit({ metaTitle, metaKeyword, metaDescription, customizedDescription, content }: z.infer<typeof formSchema>) {
    console.log(metaTitle, metaKeyword, metaDescription, customizedDescription, content);
  }

  return (
    <div className='flex flex-col gap-8'>
      <h2 className='text-3xl font-medium'>關於我們</h2>
      <section>
        <FormProvider {...loginForm}>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
              <MetaForm />

              {/* 內容 */}
              <FormField
                control={loginForm.control}
                name="content"
                render={() => (
                  <FormItem className='flex items-center gap-2'>
                    <FormLabel className="basis-32 shrink-0 font-normal text-base text-neutral-800">內容*</FormLabel>
                    <div className='grow'>
                      <CustomEditor form={loginForm} />
                      <FormMessage className='mt-1.5' />
                    </div>
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-600/80 rounded-sm"
                >
                  儲存
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </section>
    </div>
  )
}