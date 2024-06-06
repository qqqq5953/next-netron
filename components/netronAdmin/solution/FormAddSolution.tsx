'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/components/netronAdmin/global/button'
import { Form } from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import FormMetaSection, { metaSchema } from '@/components/netronAdmin/global/FormMetaSection'
import FormCustomLink, { customLinkSchema } from '@/components/netronAdmin/global/FormCustomLinkField'
import FormTitleField, { titleSchema } from '../global/FormTitleField'
import CustomEditorField, { contentSchema } from '../global/CustomEditorField'
import FormCategoryField, { categorySchema } from './FormCategoryField'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...titleSchema,
  ...categorySchema,
  ...contentSchema,
})

export default function FormAddSolution() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "",
      metaKeyword: "",
      metaDescription: "",
      customizedDescription: "",
      title: "",
      category: "",
      content: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <SheetTrigger asChild>
        <Button size="sm" className='ml-auto'>新增</Button>
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
              <FormCategoryField form={form} />
              <CustomEditorField form={form} />
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
