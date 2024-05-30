import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { Controller, UseFormReturn } from 'react-hook-form';

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

export default CustomEditor;
