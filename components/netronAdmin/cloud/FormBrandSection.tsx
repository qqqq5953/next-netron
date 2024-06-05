'use client'

import { UseFormReturn, useFieldArray } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from '@/components/netronAdmin/global/button';

import { z } from 'zod';
import { IoIosAdd } from "react-icons/io";
import { ContentItem } from './FormProductSection';

const brandItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "必填欄位",
  }),
  isActivated: z.boolean()
});

export const brandItemsSchema = {
  brandItems: z.array(brandItemSchema),
}

export type BrandItem = z.infer<typeof brandItemSchema>;

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

export default function FormBrandSection(props: Props) {
  const fieldArray = useFieldArray({
    control: props.form.control,
    name: "brandItems",
  });

  function handleAddItem() {
    fieldArray.append({ id: crypto.randomUUID(), name: "項目", isActivated: false })
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
      <div className={`grid rounded-md ${fieldArray.fields.length !== 0 ? 'border' : ''}`}>
        {fieldArray.fields.map((fieldItem, index) => (
          <FormField
            key={fieldItem.id}
            control={props.form.control}
            name={`brandItems.${index}.isActivated`}
            render={({ field }) => (
              <FormItem className='p-4 border-b last:border-none'>
                <FormLabel className="flex items-center gap-4 font-normal text-base text-neutral-800">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  {fieldItem.name}
                </FormLabel>
                <FormMessage className='mt-1.5' />
              </FormItem>
            )}
          />
        ))}
      </div>

    </>
  );

}
