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
import { BrandItem } from './FormBrandSection';

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
  const [titles, setTitles] = useState<string[]>([]);
  const [open, setOpen] = useState(false)
  const deletedItemIndex = useRef(-1)

  const fieldArray = useFieldArray({
    control: props.form.control,
    name: "contentItems",
  });

  function handleAddItem() {
    fieldArray.append({ title: "", description: "", link: "", image: "" })
    setTitles(prev => [...prev, `項目${prev.length + 1}`])
  }

  function handleInputChange(
    field: ControllerRenderProps<any, `contentItems.${number}.title`>,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    field.onChange(event.target.value)

    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };

  function handleRemoveItem(closeLoading: () => void) {
    fieldArray.remove(deletedItemIndex.current)
    setTitles(titles.filter((_, index) => index !== deletedItemIndex.current));
    closeLoading()
    setOpen(false)
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <Button
          size="sm"
          type='button'
          variant="secondary"
          className='my-4 text-sky-500 hover:text-sky-500/90'
          onClick={handleAddItem}
        >
          <IoIosAdd size={20} /> 新增品牌項目
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {fieldArray.fields.map((fieldItem, index) => (
          <Card key={fieldItem.id}>
            <CardHeader>
              <CardTitle>{titles[index] || ''}</CardTitle>
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
                        onChange={(e) => handleInputChange(field, index, e)}
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
                  <FormItem>
                    <FormLabel className="font-normal text-base text-neutral-800">圖片</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="file"
                        accept='.jpg,.jpeg,.png,image/jpg,image/jpeg,image/png'
                        onChange={(event) => field.onChange(event.target.files![0])}
                      />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type='button'
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
            {/* ${} */}
            <DialogAlert
              title={<div className='leading-8'>
                <span>產品項目</span>
                <span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{titles[deletedItemIndex.current]}</span>
              </div>}
              open={open}
              onConfirm={handleRemoveItem}
              onClose={() => setOpen(false)}
            />
          </Card>
        ))}
      </div>

    </>
  );

}
