import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UseFormReturn } from 'react-hook-form'
import { z } from "zod"

export const metaSchema = {
  metaTitle: z.string().min(1, {
    message: "必填欄位",
  }),
  metaKeyword: z.string().optional(),
  metaDescription: z.string().min(1, {
    message: "必填欄位",
  }),
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

export default function FormMetaSection(props: Props) {
  return (
    <div className='flex flex-col gap-4'>
      {/* META 標題 */}
      <FormField
        control={props.form.control}
        name="metaTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">META 標題</FormLabel>
            <div className='grow'>
              <FormControl>
                <Input
                  className='primary-input-focus'
                  placeholder="請輸入 META 標題"
                  {...field}
                />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* META 關鍵字 */}
      <FormField
        control={props.form.control}
        name="metaKeyword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">META 關鍵字</FormLabel>
            <div className='grow'>
              <FormControl>
                <Input
                  className='primary-input-focus'
                  placeholder="請輸入 META 關鍵字"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* META 描述 */}
      <FormField
        control={props.form.control}
        name="metaDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">META 描述</FormLabel>
            <div className='grow'>
              <FormControl>
                <Textarea
                  className="primary-input-focus"
                  placeholder="請輸入 META 描述"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}