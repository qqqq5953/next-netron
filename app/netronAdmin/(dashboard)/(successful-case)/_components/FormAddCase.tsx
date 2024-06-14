'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import FormMetaSection, { metaSchema } from '@/app/netronAdmin/_components/FormMetaSection'
import FormCustomLink, { customLinkSchema } from '@/app/netronAdmin/_components/FormCustomLinkField'
import CustomEditorField, { contentSchema } from '@/app/netronAdmin/_components/CustomEditorField'

import { Button } from '@/app/netronAdmin/_components/Button'
import { Form } from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import FormCaseSection, { caseSchema } from './FormCaseSection'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...caseSchema,
  ...contentSchema,
})

export default function FormAddCase() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "123",
      metaKeyword: "234",
      metaDescription: "wer",
      customizedLink: "",

      category: "case",
      title: "wer",
      caseDescription: "123",
      coverImage: undefined,
      content: "123",
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
              <h3 className='text-2xl text-neutral-700 font-semibold'>案例</h3>
              <FormCaseSection form={form} />
              <CustomEditorField form={form} />
            </div>

            <div className="text-right space-x-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  form.reset()
                  form.setValue("coverImage", "")
                }}
              >重置</Button>
              <Button type="submit">儲存</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
