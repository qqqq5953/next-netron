'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/app/netronAdmin/_components/Button'
import { Form } from "@/components/ui/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import FormMetaSection, { metaSchema } from '@/app/netronAdmin/_components/FormMetaSection'
import FormCustomLink, { customLinkSchema } from '@/app/netronAdmin/_components/FormCustomLinkField'
import FormTitleField, { titleSchema } from '@/app/netronAdmin/_components/FormTitleField'
import FormProductSection, { productsSchema } from '@/app/netronAdmin/(dashboard)/(cloud)/_components/FormProductSection'
import FormBrandSection, { brandItemsSchema } from '@/app/netronAdmin/(dashboard)/(cloud)/_components/FormBrandSection'
import FormNewsSection, { newsItemsSchema } from './FormNewsSection'
import { ProducTableData } from '@/lib/definitions'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...titleSchema,
  ...productsSchema,
  ...brandItemsSchema,
  ...newsItemsSchema
});

type Props = {
  type: "add" | "edit"
  product?: ProducTableData
  allBrands: { id: number, title: string }[],
  allNews: { id: number, title: string }[],
}

export default function FormAddProduct(props: Props) {
  const [open, setOpen] = useState(false)
  const defaultForm = {
    metaTitle: props.product?.m_title ?? "",
    metaKeyword: props.product?.m_keywords ?? "",
    metaDescription: props.product?.m_description ?? "",
    customizedLink: props.product?.m_url ?? "",
    title: props.product?.title ?? "",
    productItems: props.product?.productItems.map(item => {
      return {
        title: item.title,
        description: item.description,
        link: item.url,
        coverImage: item.img
      }
    }) ?? [],
    brandIds: props.product?.brandList,
    newsIds: props.product?.newsList,
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultForm,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('onSubmit', values);
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => {
      if (!isOpen) form.reset()
      setOpen(isOpen)
    }}>
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
      <SheetContent className='w-[80vw] sm:max-w-4xl overflow-auto px-12'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12 h-full">
            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>META</h3>
              <FormMetaSection form={form} />
              <div className='pt-4'>
                <FormCustomLink form={form} />
              </div>
            </div>

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>產品</h3>
              <FormTitleField form={form} />
              <FormProductSection form={form} />
            </div>

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>品牌項目</h3>
              <FormBrandSection form={form} allBrands={props.allBrands} />
            </div>

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>最新消息</h3>
              <FormNewsSection form={form} allNews={props.allNews} />
            </div>

            <div className="space-x-2 text-right pb-12">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  form.reset()
                  setOpen(false)
                }}
              >
                取消
              </Button>
              <Button type="submit">儲存</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}