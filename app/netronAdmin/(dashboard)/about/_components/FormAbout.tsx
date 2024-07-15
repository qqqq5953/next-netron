'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { Button } from '@/app/netronAdmin/_components/Button'
import FormMetaSection, { metaSchema } from '@/app/netronAdmin/_components/FormMetaSection'
import FormCustomLink, { customLinkSchema } from "@/app/netronAdmin/_components/FormCustomLinkField"
import CustomEditorField, { contentSchema } from "@/app/netronAdmin/_components/CustomEditorField"
import { AboutForm } from '@/lib/definitions'
import { toast } from "sonner"
import { updateAbout } from '@/lib/actions'
import { handleModifyApiResponse } from '@/lib/utils'

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
      metaTitle: props.about.m_title ?? "",
      metaKeyword: props.about.m_keywords ?? "",
      metaDescription: props.about.m_description ?? "",
      customizedLink: props.about.m_url ?? "",
      content: props.about.content ?? "",
    },
  })

  async function onSubmit({ metaTitle, metaKeyword, metaDescription, customizedLink, content }: z.infer<typeof formSchema>) {
    try {
      const result = await updateAbout({
        id: props.about.id,
        m_title: metaTitle,
        m_keywords: metaKeyword,
        m_description: metaDescription,
        customizedLink,
        content
      })

      handleModifyApiResponse(result)
    } catch (error) {
      console.log('error', error);
      toast.error("Oops! Something went wrong.")
    }
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
