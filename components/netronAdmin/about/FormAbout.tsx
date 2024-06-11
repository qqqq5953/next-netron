'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { Button } from '@/components/netronAdmin/global/button'
import FormMetaSection, { metaSchema } from '@/components/netronAdmin/global/FormMetaSection'
import FormCustomLink, { customLinkSchema } from "@/components/netronAdmin/global/FormCustomLinkField"
import CustomEditorField, { contentSchema } from "@/components/netronAdmin/global/CustomEditorField"
import { AboutForm } from '@/lib/types/admin-types'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...contentSchema
})

type Props = {
  about: AboutForm
}

export default function FormAbout(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.about.m_title,
      metaKeyword: props.about.m_keywords,
      metaDescription: props.about.m_description,
      customizedDescription: props.about.m_url,
      content: props.about.content,
    },
  })

  async function onSubmit({ metaTitle, metaKeyword, metaDescription, customizedDescription, content }: z.infer<typeof formSchema>) {
    console.log(metaTitle, metaKeyword, metaDescription, customizedDescription, content);
  }

  return (
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
  )
}
