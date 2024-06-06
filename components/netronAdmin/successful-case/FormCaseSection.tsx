import { z } from "zod"
import { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'

import FormTitleField, { titleSchema } from '@/components/netronAdmin/global/FormTitleField'
import FormCoverImageField, { coverImageSchema } from '@/components/netronAdmin/global/FormCoverImageField'

export const caseSchema = {
  category: z.string().min(1, {
    message: "必選欄位",
  }),
  ...titleSchema,
  caseDescription: z.string(),
  ...coverImageSchema
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

function FormCaseSection(props: Props) {
  return (
    <div className='flex flex-col gap-4'>
      {/* 分類 */}
      <FormField
        control={props.form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">分類</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="primary-input-focus">
                  <SelectValue placeholder="請選擇活動分類" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="case">成功案例</SelectItem>
                  <SelectItem value="msp">MSP 新世代雲端託管</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        )}
      />

      {/* 標題 */}
      <FormTitleField form={props.form} />

      {/* 簡述 */}
      <FormField
        control={props.form.control}
        name="caseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">簡述</FormLabel>
            <FormControl>
              <Textarea
                className="primary-input-focus"
                placeholder="請輸入案例簡述"
                {...field}
              />
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        )}
      />

      {/* 封面照 */}
      <FormCoverImageField form={props.form} />
    </div>
  )
}

export default FormCaseSection