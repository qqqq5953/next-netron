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
import { newsItem } from './FormNewsSection';
import { ScrollArea } from '@/components/ui/scroll-area';

const brandItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  isActivated: z.boolean()
});

export const brandItemsSchema = {
  brandItems: z.array(brandItemSchema),
}

export type BrandItem = z.infer<typeof brandItemSchema>;

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

export default function FormBrandSection(props: Props) {
  const fieldArray = useFieldArray({
    control: props.form.control,
    name: "brandItems",
  });

  return (
    <ScrollArea className={`grid rounded-md border ${fieldArray.fields.length > 6 ? 'h-[342px]' : 'h-auto'}`}>
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
    </ScrollArea>
  );

}
