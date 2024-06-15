'use client'

import { z } from 'zod'
import { ChangeEvent, useEffect, useState } from 'react'
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form'
import { LuImagePlus } from 'react-icons/lu'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/app/netronAdmin/_components/Button'
import { MAX_FILE_SIZE, checkFileType } from '@/lib/utils'

export const coverImageSchema = {
  coverImage: z.any()
    .refine((file: File) => file instanceof File || !!file, "請上傳圖片")
    .refine((file: File) => file?.size < MAX_FILE_SIZE, "檔案限制為 5MB")
    .refine((file: File) => checkFileType(file), "圖片只能上傳 JPG、JPEG、PNG").optional(),
}

type Props = {
  form: UseFormReturn<any, any, undefined>
}

export default function FormCoverImageField(props: Props) {
  const coverImage: string = props.form.getValues('coverImage')

  // const blobString = coverImage ? URL.createObjectURL(coverImage) : ""

  const [preview, setPreview] = useState(`${process.env.NEXT_PUBLIC_BASE_URL}/${coverImage}`);
  console.log('preview', preview);

  function handleImageChange(
    field: ControllerRenderProps<any, "coverImage">,
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files?.length !== 0) {
      // 未來會先上傳到 file server 產生圖片連結後再賦予 setPreview
      setPreview(URL.createObjectURL(event.target.files![0]))
      field.onChange(event.target.files![0])
    }
  }

  return (
    <>
      <FormField
        control={props.form.control}
        name="coverImage"
        render={({ field }) => {
          return <FormItem>
            <div className='text-neutral-800'>封面照</div>
            <Button size="sm"
              variant="secondary"
              className='w-full text-sky-500 hover:text-sky-500/90' asChild
            >
              <FormLabel className='cursor-pointer gap-2'>
                <LuImagePlus /> 新增封面照
              </FormLabel>
            </Button>
            <FormControl>
              <Input
                type="file"
                accept='.jpg,.jpeg,.png,image/jpg,image/jpeg,image/png'
                className='hidden'
                onChange={(e) => handleImageChange(field, e)}
              />
            </FormControl>
            <FormMessage className='mt-1.5' />
          </FormItem>
        }}
      />
      {preview && coverImage && <img src={preview} alt="preview" className="object-cover rounded-lg size-40" />}
    </>
  )
}
