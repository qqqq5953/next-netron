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

import { z } from 'zod';
import { ContentItem } from './FormProductSection';
import { BrandItem } from './FormBrandSection';

const newsItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  isActivated: z.boolean()
});

export const newsItemsSchema = {
  newsItems: z.array(newsItemSchema),
}

export type newsItem = z.infer<typeof newsItemSchema>;

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

export default function FormNewsSection(props: Props) {
  const fieldArray = useFieldArray({
    control: props.form.control,
    name: "newsItems",
  });

  return (
    <div className={`grid rounded-md`}>
      {fieldArray.fields.map((fieldItem, index) => (
        <FormField
          key={fieldItem.id}
          control={props.form.control}
          name={`newsItems.${index}.isActivated`}
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

      {fieldArray.fields.length <= 5 && <div className='p-4 text-center text-neutral-400'>
        ...
      </div>}
    </div>
  );

}
