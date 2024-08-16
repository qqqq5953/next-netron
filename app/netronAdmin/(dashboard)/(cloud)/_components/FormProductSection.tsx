import { ChangeEvent, useRef, useState } from 'react';
import { ControllerRenderProps, UseFormReturn, useFieldArray } from 'react-hook-form';
import { IoIosAdd } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DialogAlert from '@/components/DialogAlert';
import { Button } from '@/app/netronAdmin/_components/Button';
import { coverImageSchema } from '@/app/netronAdmin/_components/FormCoverImageField';

const productSchema = z.object({
  title: z.string().min(1, {
    message: "必填欄位",
  }),
  description: z.string().min(1, {
    message: "必填欄位",
  }),
  url: z.string().optional(),
  pid: z.number(),
  id: z.number(),
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
  id: number
};

export default function FormProductSection(props: Props) {
  const fieldArray = useFieldArray({
    control: props.form.control,
    name: "productItems",
  });

  const [titles, setTitles] = useState<string[]>(fieldArray.fields.map(field => field.title));

  const [open, setOpen] = useState(false);
  const deletedItemIndex = useRef(-1);

  function handleAddItem() {
    fieldArray.append({ title: "", description: "", url: "", img: "", pid: props.id, id: -1 });
    setTitles(prev => [...prev, `項目${prev.length + 1}`])
  }

  function handleTitleChange(
    field: ControllerRenderProps<any, `productItems.${number}.title`>,
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) {
    field.onChange(event.target.value);

    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    console.log('newTitles', newTitles);

    setTitles(newTitles);
  }

  function handleImageChange(
    field: ControllerRenderProps<any, `productItems.${number}.img`>,
    event: ChangeEvent<HTMLInputElement>
  ) {
    if (event.target.files?.length === 0) return;
    field.onChange(event.target.files![0]);
  }

  function handleRemoveItem() {
    const indexToRemove = deletedItemIndex.current;
    fieldArray.remove(indexToRemove);

    setTitles(prev => prev.filter((_, index) => index !== indexToRemove));
    setOpen(false);
  }

  return (
    <>
      <div className='flex items-center gap-4'>
        <Button size="sm" variant="secondary" className='my-4 text-sky-500 hover:text-sky-500/90' onClick={handleAddItem}>
          <IoIosAdd size={20} /> 新增產品項目
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {fieldArray.fields.map((fieldItem, index) => (
          <Card key={fieldItem.id} className='flex flex-col shadow-lg'>
            <CardHeader>
              <CardTitle className='truncate py-1'>{titles[index]}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
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
                        placeholder="Enter title here"
                        onChange={(e) => handleTitleChange(field, index, e)}
                      />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />

              <FormField
                control={props.form.control}
                name={`productItems.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-base text-neutral-800">產品敘述</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={5} className='primary-input-focus' placeholder="Enter description here" />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />

              <FormField
                control={props.form.control}
                name={`productItems.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-base text-neutral-800">連結</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} className='primary-input-focus' placeholder="Enter url here" />
                    </FormControl>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />

              <FormField
                control={props.form.control}
                name={`productItems.${index}.img`}
                render={({ field }) => (
                  <FormItem className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                      <div className='text-neutral-800'>圖片</div>
                      <div>
                        <Button size="sm" variant="ghost" className='w-fit text-sky-500 hover:text-sky-500/90' asChild>
                          <FormLabel className='cursor-pointer gap-2'>
                            <LuImagePlus /> 新增
                          </FormLabel>
                        </Button>
                        <Button size="sm" variant="ghost" className='w-fit text-red-500 hover:text-red-500/90'

                          onClick={() => {
                            URL.revokeObjectURL(field.value)
                          }}>
                          delete
                        </Button>
                        <FormControl>
                          <Input
                            type="file"
                            accept='.jpg,.jpeg,.png,image/jpg,image/jpeg,image/png'
                            onChange={(e) => handleImageChange(field, e)}
                            className='hidden'
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div className='grid place-items-center'>
                      {typeof field.value === 'object' && <img
                        src={URL.createObjectURL(field.value)}
                        alt="preview"
                        className="object-top object-cover rounded-lg aspect-square"
                      />}
                      {typeof field.value === 'string' && <img
                        src={field.value}
                        alt="preview"
                        className="object-top object-cover rounded-lg aspect-square"
                      />}
                    </div>
                    <FormMessage className='mt-1.5' />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className='border mt-auto'>
              <Button
                variant="secondary"
                className='w-full text-rose-500 hover:text-rose-500/90'
                onClick={() => {
                  deletedItemIndex.current = index;
                  const { title, description, url, img } = props.form.getValues("productItems")[deletedItemIndex.current];

                  if ([title, description, url, img].some(field => !!field)) {
                    setOpen(true);
                  } else {
                    fieldArray.remove(deletedItemIndex.current);
                  }
                }}
              >
                刪除
              </Button>
            </CardFooter>
          </Card>
        ))}

        <DialogAlert
          title={<div className='leading-8'><span>產品項目</span><span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{fieldArray.fields[deletedItemIndex.current]?.title}</span></div>}
          open={open}
          onConfirm={handleRemoveItem}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
}
