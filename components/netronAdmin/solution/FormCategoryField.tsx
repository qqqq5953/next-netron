import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const categorySchema = {
  category: z.string().min(1, {
    message: "必填欄位",
  })
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

export default function FormCategoryField(props: Props) {
  return (
    <FormField
      control={props.form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-normal text-base text-neutral-800">類別</FormLabel>
          <div className='grow'>
            <FormControl>
              <Input
                {...field}
                className='primary-input-focus'
                placeholder="請輸入類別"
              />
            </FormControl>
            <FormMessage className='mt-1.5' />
          </div>
        </FormItem>
      )}
    />
  )
}
