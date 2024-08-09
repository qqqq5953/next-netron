'use client'

import { useEffect, useRef, useState } from 'react'
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
import FormProductSection, { productsSchema } from '@/app/netronAdmin/(dashboard)/(cloud)/_components/FormProductSection'
import FormBrandSection, { brandItemsSchema } from '@/app/netronAdmin/(dashboard)/(cloud)/_components/FormBrandSection'
import FormNewsSection, { newsItemsSchema } from './FormNewsSection'
import { ApiGetResponse, Language, ProducTableData } from '@/lib/definitions'
import { KeyedMutator, mutate } from 'swr'
import { handleModifyApiResponse, toTimestampString } from '@/lib/utils'
import { addProduct, updateProduct } from '@/lib/actions'
import { toast } from 'sonner'

const formSchema = z.object({
  ...metaSchema,
  ...customLinkSchema,
  ...titleSchema,
  ...productsSchema,
  ...brandItemsSchema,
  ...newsItemsSchema
});

type Props = {
  type: "edit"
  lang?: Language
  product: ProducTableData
  allBrands: { id: number, title: string }[]
  allNews: { id: number, title: string }[]
  mutate: KeyedMutator<ApiGetResponse<ProducTableData[]>>
} | {
  type: "add"
  lang?: Language,
  allBrands: { id: number, title: string }[]
  allNews: { id: number, title: string }[]
}

export default function FormProduct(props: Props) {
  const [open, setOpen] = useState(false)
  const oldProductItemsRef = useRef<ProducTableData['productItems']>([])

  useEffect(() => {
    if (props.type === 'edit' && open) {
      oldProductItemsRef.current = props.product.productItems
    }
  }, [props.type, open])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metaTitle: props.type === 'edit' ? (props.product.m_title ?? "") : "",
      metaKeyword: props.type === 'edit' ? (props.product.m_keywords ?? "") : "",
      metaDescription: props.type === 'edit' ? (props.product.m_description ?? "") : "",
      customizedLink: props.type === 'edit' ? (props.product.m_url ?? "") : "",
      title: props.type === 'edit' ? (props.product.title ?? "") : "",
      productItems: props.type === 'edit' ? (props.product.productItems.map(item => {
        return {
          title: item.title,
          description: item.description,
          url: item.url,
          coverImage: item.coverImage ?? "test.png",
          pid: item.pid,
          id: item.id
        }
      }) ?? []) : [],
      brandIds: props.type === 'edit' ? (props.product.brandList ?? []) : [],
      newsIds: props.type === 'edit' ? (props.product.newsList ?? []) : [],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const {
      metaTitle,
      metaKeyword,
      metaDescription,
      customizedLink,
      title,
      productItems,
      brandIds,
      newsIds
    } = data

    console.log('productItems', productItems);
    const oldIds = oldProductItemsRef.current.map(item => item.id)
    console.log('oldIds', oldIds);
    const newIds = productItems.map(item => item.id)
    console.log('newIds', newIds);
    const difference = oldIds.filter(id => !newIds.includes(id));
    console.log('difference', difference);

    const newItems = productItems.map(item => {
      return {
        ...item,
        coverImage: item.coverImage || "test.png"
      }
    })

    console.log('newItems', newItems);

    try {
      let result

      if (props.type === 'edit') {
        const updated = {
          id: props.product.id,
          title: title,
          lang: props.lang ?? 'tw',
          brandList: brandIds,
          newsList: newsIds,
          m_title: metaTitle,
          m_keywords: metaKeyword || null,
          m_description: metaDescription || null,
          m_url: customizedLink || null,
          updated_at: toTimestampString(new Date()),
          productItems: newItems,
          deleteItemIds: difference // 先儲存
        }

        console.log('updated', updated);

        result = await updateProduct(updated)

        await props.mutate()
      } else {
        result = await addProduct({
          title: title,
          lang: props.lang ?? 'tw',
          brandList: brandIds,
          newsList: newsIds,
          m_title: metaTitle,
          m_keywords: metaKeyword || null,
          m_description: metaDescription || null,
          m_url: customizedLink || null,
          updated_at: toTimestampString(new Date()),
          created_at: toTimestampString(new Date()),
          productItems: productItems.map(item => {
            return {
              ...item,
              coverImage: item.coverImage || "test.png"
            }
          })
        })

        await mutate(`/product?adminLang=${props.lang ?? "tw"}`)
      }

      handleModifyApiResponse(result)
    } catch (error) {
      toast.error("Oops! Something went wrong.")
    }
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
              <FormProductSection form={form} id={props.type === 'edit' ? props.product.id : -1} />
            </div>

            <div>
              <h3 className='pb-4 text-2xl text-neutral-700 font-semibold'>品牌項目</h3>
              {props.allBrands.length !== 0 ?
                <FormBrandSection form={form} allBrands={props.allBrands} /> :
                <div className='text-rose-500'>品牌項目資料有誤</div>
              }
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