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
import FormCustomLink, { customLinkSchema } from '@/components/netronAdmin/global/FormCustomLink'
import FormTitleField, { titleSchema } from '@/components/netronAdmin/global/FormTitleField'
import FormProductSection, { contentItemsSchema } from '@/components/netronAdmin/cloud/FormProductSection'
import FormBrandSection, { brandItemsSchema } from '@/components/netronAdmin/cloud/FormBrandSection'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...titleSchema,
  ...contentItemsSchema,
  ...brandItemsSchema
});

export default function FormAddProduct() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "",
      metaKeyword: "",
      metaDescription: "",
      customizedDescription: "",
      title: "",
      contentItems: [],
      brandItems: [
        { id: crypto.randomUUID(), name: "brand1", isActivated: true },
        { id: crypto.randomUUID(), name: "brand2", isActivated: false }
      ],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('onSubmit', values);
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <SheetTrigger asChild>
        <Button size="sm" className='ml-auto'>新增</Button>
      </SheetTrigger>
      <SheetContent className='w-[80vw] sm:max-w-4xl overflow-auto px-12'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12">
            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>META</h3>
              <FormMetaSection form={form} />
              <div className='pt-4'>
                <FormCustomLink form={form} />
              </div>
            </div>

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>產品項目</h3>
              <FormTitleField form={form} />
              <FormProductSection form={form} />
            </div>
            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>品牌項目</h3>
              <FormBrandSection form={form} />
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