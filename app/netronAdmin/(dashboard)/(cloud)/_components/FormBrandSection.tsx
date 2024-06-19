'use client'

import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from '@/components/ui/scroll-area';
import { ProductItems } from './FormProductSection';
import { useState } from 'react';

export const brandItemsSchema = {
  brandIds: z.number().array(),
}

type Props = {
  form: UseFormReturn<{
    newsIds: number[];
    brandIds: number[];
    productItems: ProductItems[];
    title: string;
    customizedLink: string;
    metaTitle: string;
    metaKeyword?: string;
    metaDescription: string;
  }, any, undefined>
  allBrands: { id: number, title: string }[]
};

export default function FormBrandSection(props: Props) {
  const [brandIds, setBrandIds] = useState(props.form.getValues('brandIds'))

  return (
    <ScrollArea className="grid rounded-md border h-80">
      {props.allBrands.map(brand => (
        <FormField
          key={brand.id}
          control={props.form.control}
          name={`brandIds`}
          render={({ field }) => (
            <FormItem className='p-4 border-b last:border-none'>
              <FormLabel className="flex items-center gap-4 font-normal text-base text-neutral-800">
                <FormControl>
                  {/* <Checkbox
                    checked={brandIds?.includes(brand.id)}
                    onCheckedChange={(checked) => {
                      const newIds = checked ?
                        [...brandIds, brand.id] :
                        brandIds.filter(id => id !== brand.id)
                      setBrandIds(newIds)
                    }}
                  /> */}
                  <Checkbox
                    checked={field.value?.includes(brand.id)}
                    onCheckedChange={(checked) => {
                      const newIds = checked ?
                        [...field.value, brand.id] :
                        field.value.filter(id => id !== brand.id)

                      field.onChange(newIds)
                    }}
                  />
                </FormControl>
                {brand.id} /{brand.title} / {JSON.stringify(field.value)}
              </FormLabel>
              <FormMessage className='mt-1.5' />
            </FormItem>
          )}
        />
      ))}
    </ScrollArea>
  );

}
