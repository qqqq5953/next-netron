import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { Controller, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { FormField, FormItem, FormLabel, FormMessage } from './ui/form';

const contentSchema = {
  content: z.string().min(1, {
    message: "內容不得空白",
  }),
}

const editorConfiguration = {
  toolbar: {
    shouldNotGroupWhenFull: true
  }
};

type Props = {
  form: UseFormReturn<any, any, undefined>
};

function CustomEditor(props: Props) {
  return (
    <Controller
      name="content"
      defaultValue=""
      control={props.form.control}
      render={({ field }) => (
        <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={field.value}
          onChange={(event, editor) => {
            const data = editor.getData();
            field.onChange(data);
            console.log({ event, editor, data });
          }}
        />
      )}
    />
  )
}

function CustomEditorField(props: Props) {
  return <FormField
    control={props.form.control}
    name="content"
    render={() => (
      <FormItem className='pt-4'>
        <FormLabel className="basis-32 shrink-0 font-normal text-base text-neutral-800">內容*</FormLabel>
        <CustomEditor form={props.form} />
        <FormMessage className='mt-1.5' />
      </FormItem>
    )}
  />
}

export default CustomEditor;

export { contentSchema, CustomEditorField }
