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

import DialogAlert from '@/components/DialogAlert';
import { Button } from '@/app/netronAdmin/_components/Button';
import { coverImageSchema } from '@/app/netronAdmin/_components/FormCoverImageField';

import { z } from 'zod';
import { IoIosAdd } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";

const productSchema = z.object({
  title: z.string().min(1, {
    message: "必填欄位",
  }),
  description: z.string().min(1, {
    message: "必填欄位",
  }),
  link: z.string().optional(),
  ...coverImageSchema
});

export const productsSchema = {
  productItems: z.array(productSchema).refine(items => {
    return items.length > 0, {
      message: "At least one content item is required",
    }
  }),
}

export type ProductItems = z.infer<typeof productSchema>;

type Props = {
  form: UseFormReturn<{
    newsIds: number[];
    brandIds: number[];
    productItems: ProductItems[];
    title: string;
    customizedLink: string;
    metaTitle: string;
    metaKeyword: string | null;
    metaDescription: string | null;
  }, any, undefined>
};

export default function FormProductSection(props: Props) {
  const fieldArray = useFieldArray({
    control: props.form.control,
    name: "productItems",
  });

  const [products, setProducts] = useState(props.form.getValues('productItems'))

  const [previews, setPreviews] = useState<string[]>(fieldArray.fields.map(field => {
    if (typeof field.coverImage === 'object') {
      return URL.createObjectURL(field.coverImage)
    } else {
      return field.coverImage
    }
  }))

  const [titles, setTitles] = useState<string[]>(fieldArray.fields.map(field => field.title));
  const [open, setOpen] = useState(false)
  const deletedItemIndex = useRef(-1)

  function handleAddItem() {
    // fieldArray.append({ title: "", description: "", link: "", coverImage: "" })
    setProducts(prev => [...prev, { title: "", description: "", link: "", coverImage: "" }])
    setTitles(prev => [...prev, `項目${prev.length + 1}`])
  }

  function handleTitleChange(
    field: ControllerRenderProps<any, `productItems.${number}.title`>,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    field.onChange(event.target.value)

    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };

  function handleImageChange(
    field: ControllerRenderProps<any, `productItems.${number}.coverImage`>,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files?.length === 0) return

    field.onChange(event.target.files![0])

    const newPreviews = [...previews];
    newPreviews[index] = URL.createObjectURL(event.target.files![0])
    setPreviews(newPreviews);
  }

  function handleRemoveItem(closeLoading: () => void) {
    // fieldArray.remove(deletedItemIndex.current)

    setProducts(products.filter((_, index) => index !== deletedItemIndex.current));
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
        {products.map((fieldItem, index) => (
          <Card key={fieldItem.title + index} className='shadow-lg'>
            <CardHeader>
              <CardTitle className='truncate py-1'>{titles[index] || ''}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {/* 產品名稱 */}
              <FormField
                control={props.form.control}
                name={`productItems.${index}.title`}
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
                name={`productItems.${index}.description`}
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
                name={`productItems.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-base text-neutral-800">連結</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
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
                name={`productItems.${index}.coverImage`}
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

                  const { title, description, link, coverImage } = props.form.getValues("productItems")[deletedItemIndex.current]

                  if ([title, description, link, coverImage].some(field => !!field)) {
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
