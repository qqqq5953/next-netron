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
import { handleModifyApiResponse, toTimestampString, toYYYYMMDD } from '@/lib/utils'
import { addCase, updateCase } from '@/lib/actions'
import { ApiGetResponse, Language, NewsTableData } from '@/lib/definitions'
import { KeyedMutator, mutate } from 'swr'
import { toast } from 'sonner'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...caseSchema,
  ...contentSchema,
})

type Props = {
  type: "edit"
  lang?: Language
  case: NewsTableData
  mutate: KeyedMutator<ApiGetResponse<{
    rows: NewsTableData[];
    total: number;
  }>>
} | {
  type: "add"
  lang?: Language,
  page: string
  id?: string
}

export default function FormCase(props: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.type === 'edit' ? (props.case.m_title ?? "") : "",
      metaKeyword: props.type === 'edit' ? (props.case.m_keywords ?? "") : "",
      metaDescription: props.type === 'edit' ? (props.case.m_description ?? "") : "",
      customizedLink: props.type === 'edit' ? (props.case.m_url ?? "") : "",

      category: props.type === 'edit' ? props.case.cid.toString() : "",
      title: props.type === 'edit' ? (props.case.title ?? "") : "",
      caseDescription: props.type === 'edit' ? (props.case.description ?? "") : "",
      coverImage: props.type === 'edit' ? (props.case.img ?? undefined) : undefined,
      content: props.type === 'edit' ? (props.case.content ?? "") : "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('data', data);

    // return
    const {
      metaTitle,
      metaKeyword,
      metaDescription,
      customizedLink,
      category,
      title,
      caseDescription,
      coverImage,
      content,
    } = data

    console.log('coverImage', coverImage);

    try {
      let result

      if (props.type === 'edit') {
        result = await updateCase({
          id: props.case.id,
          m_title: metaTitle,
          m_keywords: metaKeyword || null,
          m_description: metaDescription || null,
          m_url: customizedLink || null,
          updated_at: toYYYYMMDD(new Date()),
          cid: +category,
          title: title,
          description: caseDescription,
          lang: props.lang ?? "tw",
          img: coverImage || "test.png", // 無法傳 File 到 server action
          content: content
        })

        await props.mutate()
      } else {
        result = await addCase({
          m_title: metaTitle,
          m_keywords: metaKeyword || null,
          m_description: metaDescription || null,
          m_url: customizedLink || null,
          updated_at: toYYYYMMDD(new Date()),
          created_at: toTimestampString(new Date()),
          cid: +category,
          title: title,
          description: caseDescription,
          lang: props.lang ?? "tw",
          img: coverImage || "test.png", // 無法傳 File 到 server action
          content: content,
        })

        const key = props.id ?
          `case/${props.id}?adminLang=${props.lang ?? "tw"}&page=${props.page}` :
          `case?adminLang=${props.lang ?? "tw"}&page=${props.page}`

        await mutate(key)
      }

      handleModifyApiResponse(result)
    } catch (error) {
      console.log('error', error);
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
              <h3 className='text-2xl text-neutral-700 font-semibold'>案例</h3>
              <FormCaseSection form={form} lang={props.lang ?? "tw"} />
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
