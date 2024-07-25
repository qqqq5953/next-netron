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
import { ApiGetResponse, Language, NewsTableData } from '@/lib/definitions'
import { updateNews, addNews } from '@/lib/actions'
import { handleModifyApiResponse, toYYYYMMDD, toTimestampString } from '@/lib/utils'
import { toast } from 'sonner'
import { KeyedMutator, mutate } from 'swr'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...eventSchema,
  ...articleSchema,
  ...contentSchema
})

type Props = {
  type: "edit"
  lang?: Language
  news: NewsTableData
  mutate: KeyedMutator<ApiGetResponse<{
    rows: NewsTableData[];
    total: number;
  }>>
} | {
  type: "add"
  lang?: Language,
  page: string
}

export default function FormAddNews(props: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.type === 'edit' ? (props.news.m_title ?? "") : "",
      metaKeyword: props.type === 'edit' ? (props.news.m_keywords ?? "") : "",
      metaDescription: props.type === 'edit' ? (props.news.m_description ?? "") : "",
      customizedLink: props.type === 'edit' ? (props.news.m_url ?? "") : "",

      eventType: props.type === 'edit' ? props.news.mode : null,
      speaker: props.type === 'edit' ? (props.news.lecturer ?? "") : "",
      eventStartTime: props.type === 'edit' ? props.news.start_at?.replace(/ /, '') : "",
      eventEndTime: props.type === 'edit' ? props.news.end_at?.replace(/ /, '') : "",
      eventCost: props.type === 'edit' ? props.news.price : null,
      currency: props.type === 'edit' ?
        (props.news.currency ?? "TWD") :
        "TWD",
      ticketDeadline: props.type === 'edit' ? (props.news.soldout_at ?? "") : "",
      eventWebsite: props.type === 'edit' ? (props.news.website ?? "") : "",
      hostCompany: props.type === 'edit' ? (props.news.hostCompany ?? "") : "",
      hostWeb: props.type === 'edit' ? props.news.hostWeb : "",
      articleDate: props.type === 'edit' ?
        (props.news.updated_at ? new Date(props.news.updated_at) : undefined) :
        undefined,
      category: props.type === 'edit' ? props.news.cid.toString() : "",
      title: props.type === 'edit' ? (props.news.title ?? "") : "",
      coverImage: props.type === 'edit' ? (props.news.img ?? undefined) : undefined,
      content: props.type === 'edit' ? (props.news.content ?? "") : "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const {
      metaTitle,
      metaKeyword,
      metaDescription,
      customizedLink,
      eventType,
      speaker,
      eventStartTime,
      eventEndTime,
      eventCost,
      currency,
      ticketDeadline,
      eventWebsite,
      hostCompany,
      hostWeb,
      articleDate,
      category,
      title,
      coverImage,
      content,
    } = data

    console.log('coverImage', coverImage);
    console.log('toYYYYMMDD(articleDate)', toYYYYMMDD(articleDate));

    try {
      let result

      if (props.type === 'edit') {
        result = await updateNews({
          id: props.news.id,
          m_title: metaTitle,
          m_keywords: metaKeyword || null,
          m_description: metaDescription || null,
          m_url: customizedLink || null,
          mode: eventType,
          lecturer: speaker || null,
          start_at: eventStartTime,
          end_at: eventEndTime,
          price: eventCost || null,
          currency: currency,
          soldout_at: ticketDeadline || null,
          website: eventWebsite || null,
          hostCompany: hostCompany || null,
          hostWeb: hostWeb || null,
          updated_at: toYYYYMMDD(articleDate),
          cid: +category,
          title: title,
          img: coverImage || "test.png", // 無法傳 File 到 server action
          content: content
        })

        await props.mutate()
      } else {
        result = await addNews({
          m_title: metaTitle,
          m_keywords: metaKeyword || null,
          m_description: metaDescription || null,
          m_url: customizedLink || null,
          mode: eventType,
          lecturer: speaker,
          start_at: eventStartTime,
          end_at: eventEndTime,
          price: eventCost || null,
          currency: currency,
          soldout_at: ticketDeadline || null,
          website: eventWebsite || null,
          hostCompany: hostCompany || null,
          hostWeb: hostWeb || null,
          updated_at: toYYYYMMDD(articleDate),
          cid: +category,
          title: title,
          img: coverImage || "test.png", // (coverImage) 無法傳 File 到 server action
          content: content,
          lang: props.lang ?? 'tw',
          post_date: null,
          location: null,
          county: null,
          street: null,
          created_at: toTimestampString(new Date()),
        })

        await mutate(`/news?adminLang=${props.lang}&page=${props.page}`)
      }

      handleModifyApiResponse(result)
    } catch (error) {
      toast.error("Oops! Something went wrong.")
    }
    setOpen(false)
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
