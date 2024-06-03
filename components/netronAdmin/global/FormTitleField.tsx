import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { UseFormReturn } from 'react-hook-form'
import { z } from "zod"

export const titleSchema = {
  title: z.string().min(1, {
    message: "標題不得空白",
  })
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

export default function FormTitleField(props: Props) {
  return <FormField
    control={props.form.control}
    name="title"
    render={({ field }) => (
      <FormItem>
        <FormLabel className="font-normal text-base text-neutral-800">標題</FormLabel>
        <FormControl>
          <Input
            className="primary-input-focus"
            placeholder="請輸入標題"
            {...field} />
        </FormControl>
        <FormMessage className='mt-1.5' />
      </FormItem>
    )}
  />
}