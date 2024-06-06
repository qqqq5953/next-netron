'use client'

import { ChangeEvent, useRef, useState } from 'react';
import { ControllerRenderProps, UseFormReturn, useFieldArray } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/netronAdmin/global/button';
import DialogAlert from '@/components/DialogAlert';

import { z } from 'zod';
import { MAX_FILE_SIZE, checkFileType } from '@/lib/utils';
import { IoIosAdd } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { BrandItem } from './FormBrandSection';
import { newsItem } from './FormNewsSection';

const contentItemSchema = z.object({
  title: z.string().min(1, {
    message: "必填欄位",
  }),
  description: z.string().min(1, {
    message: "必填欄位",
  }),
  link: z.string().optional(),
  image: z.any()
    .refine((file: File) => !!file, "請上傳圖片")
    .refine((file: File) => file?.size < MAX_FILE_SIZE, "檔案限制為 5MB")
    .refine((file: File) => checkFileType(file), "圖片只能上傳 JPG、JPEG、PNG").optional(),
});

export const contentItemsSchema = {
  contentItems: z.array(contentItemSchema).refine(items => {
    console.log('items', items);

    return items.length > 0, {
      message: "At least one content item is required",
    }
  }),
}

export type ContentItem = z.infer<typeof contentItemSchema>;

type Props = {
  form: UseFormReturn<{
    newsItems: newsItem[];
    brandItems: BrandItem[];
    contentItems: ContentItem[];
    title: string;
    customizedDescription: string;
    metaTitle: string;
    metaKeyword: string;
    metaDescription: string;
  }, any, undefined>
};

export default function FormProductSection(props: Props) {
  const fieldArray = useFieldArray({
    control: props.form.control,
    name: "contentItems",
  });

  const [previews, setPreviews] = useState<string[]>(fieldArray.fields.map(field => {
    if (typeof field.image === 'object') {
      return URL.createObjectURL(field.image)
    } else {
      return field.image
    }
  }))

  const [titles, setTitles] = useState<string[]>(fieldArray.fields.map(field => field.title));
  const [open, setOpen] = useState(false)
  const deletedItemIndex = useRef(-1)

  function handleAddItem() {
    fieldArray.append({ title: "", description: "", link: "", image: "" })
    setTitles(prev => [...prev, `項目${prev.length + 1}`])
  }

  function handleTitleChange(
    field: ControllerRenderProps<any, `contentItems.${number}.title`>,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    field.onChange(event.target.value)

    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };

  function handleImageChange(
    field: ControllerRenderProps<any, `contentItems.${number}.image`>,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files?.length === 0) return

    console.log('event.target.files', event.target.files);

    field.onChange(event.target.files![0])

    const newPreviews = [...previews];
    newPreviews[index] = URL.createObjectURL(event.target.files![0])
    setPreviews(newPreviews);
  }

  function handleRemoveItem(closeLoading: () => void) {
    fieldArray.remove(deletedItemIndex.current)

    setTitles(titles.filter((_, index) => index !== deletedItemIndex.current));
    setPreviews(previews.filter((_, index) => index !== deletedItemIndex.current));

    closeLoading()
    setOpen(false)
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <Button
          size="sm"
          variant="secondary"
          className='my-4 text-sky-500 hover:text-sky-500/90'
          onClick={handleAddItem}
        >
          <IoIosAdd size={20} /> 新增產品項目
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {fieldArray.fields.map((fieldItem, index) => (
          <Card key={fieldItem.id} className='shadow-lg'>
            <CardHeader>
              <CardTitle className='truncate py-1'>{titles[index] || ''}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {/* 產品名稱 */}
              <FormField
                control={props.form.control}
                name={`contentItems.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-base text-neutral-800">產品名稱</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='primary-input-focus'
                        placeholder="Enter link here"
                        onChange={(e) => handleTitleChange(field, index, e)}
                      />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />

              {/* 產品敘述 */}
              <FormField
                control={props.form.control}
                name={`contentItems.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-base text-neutral-800">產品敘述</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        className='primary-input-focus'
                        placeholder="Enter link here"
                      />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />

              {/* 連結 */}
              <FormField
                control={props.form.control}
                name={`contentItems.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-base text-neutral-800">連結</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='primary-input-focus'
                        placeholder="Enter link here"
                      />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />

              {/* 圖片 */}
              <FormField
                control={props.form.control}
                name={`contentItems.${index}.image`}
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <div className='text-neutral-800'>圖片</div>
                    {previews.length !== 0 && previews[index] && <div className='grid place-items-center'>
                      <img
                        src={previews[index]}
                        alt="preview"
                        className="object-top object-cover rounded-lg aspect-square"
                      />
                    </div>
                    }
                    <Button size="sm"
                      variant="secondary"
                      className='w-full text-sky-500 hover:text-sky-500/90' asChild
                    >
                      <FormLabel className='cursor-pointer gap-2'>
                        <LuImagePlus /> 新增圖片
                      </FormLabel>
                    </Button>
                    <FormControl>
                      <Input
                        type="file"
                        accept='.jpg,.jpeg,.png,image/jpg,image/jpeg,image/png'
                        onChange={(e) => handleImageChange(field, index, e)}
                        className='hidden'
                      />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />


            </CardContent>

            <CardFooter>
              <Button
                variant="secondary"
                className='w-full text-rose-500 hover:text-rose-500/90'
                onClick={() => {
                  deletedItemIndex.current = index

                  const { title, description, link, image } = props.form.getValues("contentItems")[deletedItemIndex.current]

                  if ([title, description, link, image].some(field => !!field)) {
                    setOpen(true)
                  } else {
                    fieldArray.remove(deletedItemIndex.current)
                    setTitles(titles.filter((_, index) => index !== deletedItemIndex.current));
                  }
                }}
              >
                刪除
              </Button>
            </CardFooter>
          </Card>
        ))}

        <DialogAlert
          title={<div className='leading-8'>
            <span>產品項目</span>
            <span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{titles[deletedItemIndex.current]}</span>
          </div>}
          open={open}
          onConfirm={handleRemoveItem}
          onClose={() => setOpen(false)}
        />
      </div>

    </>
  );

}
