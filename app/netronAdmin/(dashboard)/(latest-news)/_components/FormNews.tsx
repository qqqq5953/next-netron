'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import FormMetaSection, { metaSchema } from '@/app/netronAdmin/_components/FormMetaSection'
import FormCustomLink, { customLinkSchema } from '@/app/netronAdmin/_components/FormCustomLinkField'
import CustomEditorField, { contentSchema } from '@/app/netronAdmin/_components/CustomEditorField'
import FormEventSection, { eventSchema } from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/FormEventSection'
import FormArticleSection, { articleSchema } from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/FormArticleSection'

import { Button } from '@/app/netronAdmin/_components/Button'
import { Form } from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NewsTableData } from '@/lib/definitions'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...eventSchema,
  ...articleSchema,
  ...contentSchema,
})

type Props = {
  type: "edit" | "add"
  news?: NewsTableData
}

export default function FormAddNews(props: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.news?.m_title ?? "",
      metaKeyword: props.news?.m_keywords ?? "",
      metaDescription: props.news?.m_description ?? "",
      customizedLink: props.news?.m_url ?? "",

      eventType: props.news?.mode ?? "",
      speaker: props.news?.lecturer ?? "",
      eventStartTime: props.news?.start_at?.replace(/ /, '') ?? "",
      eventEndTime: props.news?.end_at?.replace(/ /, '') ?? "",
      eventCost: props.news?.price ?? "",
      currency: props.news?.currency ?? "TWD",
      ticketDeadline: props.news?.soldout_at ?? "",
      eventWebsite: props.news?.website ?? "",
      hostCompany: props.news?.hostCompany ?? "",
      hostWeb: props.news?.hostWeb ?? "",

      articleDate: props.news?.updated_at ?
        new Date(props.news?.updated_at) :
        undefined,
      category: props.news?.cid.toString() ?? "",
      title: props.news?.title ?? "",
      // coverImage: props.news?.img ?? undefined,
      content: props.news?.content ?? "",
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
              <h3 className='text-2xl text-neutral-700 font-semibold'>活動</h3>
              <FormEventSection form={form} />
            </div>

            <div className='flex flex-col gap-4'>
              <h3 className='text-2xl text-neutral-700 font-semibold'>文章</h3>
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
