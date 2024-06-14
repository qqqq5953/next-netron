'use client'

import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormMetaSection, { metaSchema } from '@/app/netronAdmin/_components/FormMetaSection'
import { Button } from '@/app/netronAdmin/_components/Button'
import { Form } from "@/components/ui/form"
import { MetaForm } from '@/lib/definitions'

type Props = {
  meta: MetaForm
}

const formSchema = z.object(metaSchema)

export default function FormMeta(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.meta.m_title ?? "",
      metaKeyword: props.meta.m_keywords ?? "",
      metaDescription: props.meta.m_description ?? "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormMetaSection form={form} />
        <div className="text-right">
          <Button type="submit">儲存</Button>
        </div>
      </form>
    </Form>
  )
}
