import React from 'react';
import dynamic from 'next/dynamic';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Loader from '@/components/loader';

const CustomEditor = dynamic(() => {
  return import('@/app/netronAdmin/_components/CustomEditor');
}, { ssr: false, loading: () => <Loader size={24} />, });

export const contentSchema = {
  content: z.string().min(1, {
    message: "必填欄位",
  }),
}

type Props = {
  form: UseFormReturn<any, any, undefined>
};

export default function CustomEditorField(props: Props) {
  return <FormField
    control={props.form.control}
    name="content"
    render={() => (
      <FormItem>
        <FormLabel className="font-normal text-base text-neutral-800">內容*</FormLabel>
        <CustomEditor form={props.form} />
        <FormMessage className='mt-1.5' />
      </FormItem>
    )}
  />
}