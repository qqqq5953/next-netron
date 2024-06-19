'use client'

import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

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

export const newsItemsSchema = {
  newsIds: z.number().array(),
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
  allNews: { id: number, title: string }[]
};

export default function FormNewsSection(props: Props) {
  return (
    <ScrollArea className="grid rounded-md border h-80">
      {props.allNews.map(news => (
        <FormField
          key={news.id}
          control={props.form.control}
          name="newsIds"
          render={({ field }) => {
            return (
              <FormItem className='p-4 border-b last:border-none'>
                <FormLabel className="flex items-center gap-4 font-normal text-base text-neutral-800">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(news.id)}
                      onCheckedChange={(checked) => {
                        const newIds = checked ?
                          [...field.value, news.id] :
                          field.value.filter(id => id !== news.id)

                        field.onChange(newIds)
                      }}
                    />
                  </FormControl>
                  {news.id} /{news.title} / {JSON.stringify(field.value)}
                </FormLabel>
                <FormMessage className='mt-1.5' />
              </FormItem>
            )
          }}
        />
      ))}
    </ScrollArea>
  );

}
