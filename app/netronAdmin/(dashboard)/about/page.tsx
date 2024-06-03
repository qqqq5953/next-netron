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
import FormMetaSection, { metaSchema } from '@/components/netronAdmin/global/form-meta-section'
import { Button } from '@/components/netronAdmin/global/button'
import dynamic from 'next/dynamic';
import Loader from "@/components/loader"
import FormCustomLink, { customLinkSchema } from "@/components/netronAdmin/global/form-custom-link"

const CustomEditor = dynamic(() => {
  return import('@/components/custom-editor');
}, { ssr: false, loading: () => <Loader size={24} />, });

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  content: z.string().min(1, {
    message: "內容不得空白",
  }),
})

export default function AboutPage() {
  const form = useForm<z.infer<typeof formSchema>>({
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
    <>
      <h2 className='text-3xl font-medium'>關於我們</h2>
      <section>
        <FormProvider {...form}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormMetaSection form={form} />
              <FormCustomLink form={form} />

              {/* 內容 */}
              <FormField
                control={form.control}
                name="content"
                render={() => (
                  <FormItem>
                    <FormLabel className="basis-32 shrink-0 font-normal text-base text-neutral-800">內容*</FormLabel>
                    <div className='grow'>
                      <CustomEditor form={form} />
                      <FormMessage className='mt-1.5' />
                    </div>
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Button type="submit">儲存</Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </section>
    </>
  )
}
