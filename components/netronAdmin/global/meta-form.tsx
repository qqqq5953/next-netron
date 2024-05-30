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
import { useFormContext } from 'react-hook-form'
import { z } from "zod"
import { formSchema } from '@/app/netronAdmin/(dashboard)/about/page'

type MetaFormFields = Omit<z.infer<typeof formSchema>, "content">

export default function MetaForm() {
  const { control } = useFormContext<MetaFormFields>();

  return (
    <>
      {/* META 標題 */}
      <FormField
        control={control}
        name="metaTitle"
        render={({ field }) => (
          <FormItem className='flex items-center gap-2'>
            <FormLabel className="basis-32 shrink-0 font-normal text-base text-neutral-800">META 標題</FormLabel>
            <div className='grow'>
              <FormControl className='grow'>
                <Input
                  className="focus-visible:outline-blue-200"
                  placeholder="Please enter username"
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
        control={control}
        name="metaKeyword"
        render={({ field }) => (
          <FormItem className='flex items-center gap-2'>
            <FormLabel className="basis-32 shrink-0 font-normal text-base text-neutral-800">META 關鍵字</FormLabel>
            <div className='grow'>
              <FormControl className='grow'>
                <Input
                  className="focus-visible:outline-blue-200"
                  placeholder="Please enter password"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* META 描述 */}
      <FormField
        control={control}
        name="metaDescription"
        render={({ field }) => (
          <FormItem className='flex items-center gap-2'>
            <FormLabel className="basis-32 shrink-0 font-normal text-base text-neutral-800">META 描述</FormLabel>
            <div className='grow'>
              <FormControl className='grow'>
                <Textarea
                  className="focus-visible:outline-blue-200"
                  placeholder="Please enter password"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />

      {/* 連結客製化文字 */}
      <FormField
        control={control}
        name="customizedDescription"
        render={({ field }) => (
          <FormItem className='flex items-center gap-2'>
            <FormLabel className="basis-32 shrink-0 font-normal text-base text-neutral-800">連結客製化文字</FormLabel>
            <div className='grow'>
              <FormControl className='grow'>
                <Input
                  className="focus-visible:outline-blue-200"
                  placeholder="Please enter password"
                  {...field} />
              </FormControl>
              <FormMessage className='mt-1.5' />
            </div>
          </FormItem>
        )}
      />
    </>
  )
}
