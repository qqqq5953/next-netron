'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/app/netronAdmin/_components/Button'
import { Form } from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import FormMetaSection, { metaSchema } from '@/app/netronAdmin/_components/FormMetaSection'
import FormCustomLink, { customLinkSchema } from '@/app/netronAdmin/_components/FormCustomLinkField'
import FormTitleField, { titleSchema } from '@/app/netronAdmin/_components/FormTitleField'
import CustomEditorField, { contentSchema } from '@/app/netronAdmin/_components/CustomEditorField'
import { BrandTableData } from '@/lib/definitions'
import FormCoverImageField, { coverImageSchema } from '@/app/netronAdmin/_components/FormCoverImageField'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...titleSchema,
  ...contentSchema,
  ...coverImageSchema
})

type Props = {
  type: "edit" | "add"
  brand?: BrandTableData
}

export default function FormAddBrand(props: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.brand?.m_title ?? "",
      metaKeyword: props.brand?.m_keywords ?? "",
      metaDescription: props.brand?.m_description ?? "",
      customizedLink: props.brand?.m_url ?? "",
      title: props.brand?.title ?? "",
      content: props.brand?.content ?? "",
      coverImage: props.brand?.img ?? "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }


  return (
    <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <SheetTrigger asChild>
        {
          props.type === "add" ?
            <Button
              size="sm"
              className='ml-auto'>
              新增
            </Button> :
            <Button
              size="sm"
              variant="outline"
            >
              編輯
            </Button>
        }
      </SheetTrigger>
      <SheetContent className='w-[50vw] sm:max-w-xl overflow-auto px-12'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12">
            <div className='flex flex-col gap-4'>
              <h3 className='text-2xl text-neutral-700 font-semibold'>META</h3>
              <FormMetaSection form={form} />
              <FormCustomLink form={form} />
            </div>

            <div className='flex flex-col gap-4'>
              <h3 className='text-2xl text-neutral-700 font-semibold'>文章</h3>
              <FormTitleField form={form} />
              <CustomEditorField form={form} />
              <FormCoverImageField form={form} />
            </div>

            <div className="text-right">
              <Button type="submit">儲存</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
