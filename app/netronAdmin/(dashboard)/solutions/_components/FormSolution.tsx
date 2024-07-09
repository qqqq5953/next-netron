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
import FormTitleField, { titleSchema } from '../../../_components/FormTitleField'
import CustomEditorField, { contentSchema } from '../../../_components/CustomEditorField'
import FormCategoryField, { categorySchema } from './FormCategoryField'
import FormNewsSection, { newsItemsSchema } from '../../(cloud)/_components/FormNewsSection'
import { SolutionData } from '@/lib/definitions'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...titleSchema,
  ...categorySchema,
  ...contentSchema,
  ...newsItemsSchema
})

type Props = {
  type: "add" | "edit"
  solution?: SolutionData
  allNews: { id: number, title: string }[],
}

export default function FormSolution(props: Props) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.solution?.m_title ?? "",
      metaKeyword: props.solution?.m_keywords ?? "",
      metaDescription: props.solution?.m_description ?? "",
      customizedLink: props.solution?.m_url ?? "",
      title: props.solution?.title ?? "",
      category: props.solution?.type ?? "",
      content: props.solution?.content ?? "",
      newsIds: props.solution?.newsList,
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
      <SheetContent className='w-[60vw] sm:max-w-4xl overflow-auto px-12'>
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

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>最新消息</h3>
              <FormNewsSection form={form} allNews={props.allNews} />
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
