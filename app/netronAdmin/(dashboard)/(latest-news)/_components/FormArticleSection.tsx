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

import { UseFormReturn } from 'react-hook-form'
import { z } from "zod"
import { DatePickerField } from '@/app/netronAdmin/_components/DatePicker'
import FormTitleField, { titleSchema } from '@/app/netronAdmin/_components/FormTitleField'
import FormCoverImageField, { coverImageSchema } from '@/app/netronAdmin/_components/FormCoverImageField'

export const articleSchema = {
  articleDate: z.date({
    required_error: "日期不得空白",
    invalid_type_error: "日期格式錯誤",
  }),
  category: z.string().min(1, {
    message: "必選欄位",
  }),
  ...titleSchema,
  ...coverImageSchema
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

function FormArticleSection(props: Props) {
  return (
    <div className='flex flex-col gap-4'>
      {/* 文章日期 */}
      <DatePickerField label="文章日期" form={props.form} />

      {/* 分類 */}
      <FormField
        control={props.form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">分類</FormLabel>
            <FormControl>
              <Select value={field.value.toString()} onValueChange={field.onChange}>
                <SelectTrigger className="primary-input-focus">
                  <SelectValue placeholder="請選擇活動分類" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">最新消息</SelectItem>
                  <SelectItem value="2">雲端活動</SelectItem>
                  <SelectItem value="9">雲端學習技能</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        )}
      />

      {/* 標題 */}
      <FormTitleField form={props.form} />

      {/* 封面照 */}
      {/* <FormCoverImageField form={props.form} /> */}
    </div>
  )
}

export default FormArticleSection