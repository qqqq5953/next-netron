'use client'

import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { Button } from '@/components/netronAdmin/global/button'
import FormMetaSection, { metaSchema } from '@/components/netronAdmin/global/FormMetaSection'
import FormCustomLink, { customLinkSchema } from "@/components/netronAdmin/global/FormCustomLink"
import CustomEditorField, { contentSchema } from "@/components/netronAdmin/global/CustomEditorField"

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...contentSchema
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormMetaSection form={form} />
            <FormCustomLink form={form} />
            <CustomEditorField form={form} />

            <div className="text-right">
              <Button type="submit">儲存</Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  )
}
