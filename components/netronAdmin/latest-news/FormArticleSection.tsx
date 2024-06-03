import React, { useState } from 'react'
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
import { DatePickerField } from '../global/date-picker'
import FormTitleField, { titleSchema } from '../global/FormTitleField'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png"
]

function checkFileType(file: File) {
  if (file?.name) {
    if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return true;
    }
  }
  return false;
}

export const articleSchema = {
  articleDate: z.date({
    required_error: "日期不得空白",
    invalid_type_error: "日期格式錯誤",
  }),
  category: z.string().min(1, {
    message: "分類不得空白",
  }),
  ...titleSchema,
  coverImage: z.any()
    .refine((file: File) => !!file, "File is required")
    .refine((file: File) => file?.size < MAX_FILE_SIZE, "Max size is 5MB.")
    .refine((file: File) => checkFileType(file), "Only .jpg, .jpeg, .png formats are supported.").optional(),
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

function FormArticleSection(props: Props) {
  const [preview, setPreview] = useState("")

  return (
    <div className='flex flex-col gap-4'>
      {/* 文章日期 */}
      <DatePickerField form={props.form} />

      {/* 分類 */}
      <FormField
        control={props.form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">分類</FormLabel>
            <FormControl>
              <Input
                className="primary-input-focus"
                placeholder="請輸入分類"
                {...field} />
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        )}
      />

      {/* 標題 */}
      <FormTitleField form={props.form} />

      {/* 封面照 */}
      <FormField
        control={props.form.control}
        name="coverImage"
        render={({ field }) => {
          return <FormItem>
            <FormLabel className="font-normal text-base text-neutral-800">封面照</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept='.jpg,.jpeg,.png,image/jpg,image/jpeg,image/png'
                onChange={(event) => {
                  setPreview(URL.createObjectURL(event.target.files![0]))
                  field.onChange(event.target.files![0])
                }}
              />
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        }}
      />
      {preview && <img src={preview} alt="preview" className="object-cover rounded-lg size-40" />}
    </div>
  )
}

export default FormArticleSection