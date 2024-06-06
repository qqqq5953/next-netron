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

export const customLinkSchema = {
  customizedDescription: z.string()
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

export default function FormCustomLink(props: Props) {
  return (
    <FormField
      control={props.form.control}
      name="customizedDescription"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-normal text-base text-neutral-800">連結客製化文字</FormLabel>
          <FormControl>
            <Input
              className='primary-input-focus'
              placeholder="請輸入連結客製化文字"
              {...field} />
          </FormControl>
          <FormMessage className='mt-1.5' />
        </FormItem>
      )}
    />
  )
}
