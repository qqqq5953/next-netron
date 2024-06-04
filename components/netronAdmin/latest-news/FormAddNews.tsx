import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import FormMetaSection, { metaSchema } from '@/components/netronAdmin/global/FormMetaSection'
import FormCustomLink, { customLinkSchema } from '@/components/netronAdmin/global/FormCustomLink'
import CustomEditorField, { contentSchema } from '@/components/netronAdmin/global/CustomEditorField'
import FormEventSection, { eventSchema } from '@/components/netronAdmin/latest-news/FormEventSection'
import FormArticleSection, { articleSchema } from '@/components/netronAdmin/latest-news/FormArticleSection'

import { Button } from '@/components/netronAdmin/global/button'
import { Form } from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...eventSchema,
  ...articleSchema,
  ...contentSchema,
})

export default function FormAddNews() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: "",
      metaKeyword: "",
      metaDescription: "",
      customizedDescription: "",

      eventType: "",
      speaker: "",
      eventStartTime: "",
      eventEndTime: "",
      eventCost: "",
      currency: "TWD",
      ticketDeadline: "",
      eventWebsite: "",
      companyName: "",
      companyWebsite: "",

      articleDate: undefined,
      category: "",
      title: "",
      coverImage: undefined,
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
            <div className=''>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>META</h3>
              <FormMetaSection form={form} />
              <div className='pt-4'>
                <FormCustomLink form={form} />
              </div>
            </div>

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>活動</h3>
              <FormEventSection form={form} />
            </div>

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>文章</h3>
              <FormArticleSection form={form} />
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
