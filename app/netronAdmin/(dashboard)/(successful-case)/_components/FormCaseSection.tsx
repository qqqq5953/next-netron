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

import FormTitleField, { titleSchema } from '@/app/netronAdmin/_components/FormTitleField'
import FormCoverImageField, { coverImageSchema } from '@/app/netronAdmin/_components/FormCoverImageField'
import { Language } from "@/lib/definitions"

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
  lang: Language,
};

function FormCaseSection(props: Props) {
  const selectOptionsMap = {
    "tw": <>
      <SelectItem value="3">成功案例</SelectItem>
      <SelectItem value="14">MSP 新世代雲端託管</SelectItem>
    </>,
    "en": <>
      <SelectItem value="7">成功案例</SelectItem>
    </>,
    "cn": <>
      <SelectItem value="6">成功案例</SelectItem>
    </>
  }

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
                  {selectOptionsMap[props.lang]}
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