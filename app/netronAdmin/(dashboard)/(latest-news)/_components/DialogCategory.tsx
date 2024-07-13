'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/app/netronAdmin/_components/Button'
import { toast } from "sonner"
import { addCategoryCases, updateCategoryCases, updateCategoryNews } from '@/lib/actions'
import { ApiPostResponse, Language } from '@/lib/definitions'
import { handleModifyApiResponse, toTimestampString } from '@/lib/utils'
import { mutate } from 'swr';

type Props = {
  type: "edit"
  category: "news" | "case"
  title: string
  id: number
} | {
  type: "add"
  category: "news" | "case"
  lang: Language | undefined
}

export default function DialogAddCategory(props: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("");

  function isEditProps(props: Props): props is Extract<Props, { type: 'edit' }> {
    return props.type === 'edit';
  }

  async function handleUpdate(): Promise<ApiPostResponse<{
    affectedRows: number;
    changedRows: number;
  } | null>> {
    if (!isEditProps(props)) {
      throw new Error("Invalid props: 'handleUpdate' called with non-edit props");
    }

    let result

    if (props.category === 'news') {
      result = await updateCategoryNews({
        id: props.id,
        title: categoryName,
        updated_at: toTimestampString(new Date())
      })
    } else {
      result = await updateCategoryCases({
        id: props.id,
        title: categoryName,
        updated_at: toTimestampString(new Date())
      })
    }

    return result
  }

  async function handleSaveCategory() {
    setIsDialogOpen(false)

    try {
      let result

      if (props.type === 'edit') {
        result = await handleUpdate()
      } else {
        result = await addCategoryCases({
          title: categoryName,
          lang: props.lang ?? "tw",
          type: props.category,
          created_at: toTimestampString(new Date()),
          updated_at: toTimestampString(new Date())
        })
      }

      handleModifyApiResponse(result)
      mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/category/cases?adminLang=tw`);
    } catch (error) {
      console.log('error', error);
      toast.error("Oops! Something went wrong.")
    }
  }

  function handleEdit(category?: string) {
    setIsDialogOpen(true)
    if (category) setCategoryName(category)
  }

  function handleOpenDialog() {
    setIsDialogOpen(true)
    setCategoryName("")
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        {
          props.type === "add" ?
            <Button
              size="sm"
              className='ml-auto'
              onClick={handleOpenDialog}
            >
              新增
            </Button> :
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit(props.title)}
            >
              編輯
            </Button>
        }
      </DialogTrigger>
      <DialogContent>
        <Label htmlFor='news'>分類名稱</Label>
        <Input
          id='news'
          className="primary-input-focus"
          placeholder="請輸入分類名稱"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className='flex items-center justify-end gap-2'>
          <Button size="sm" variant='ghost' onClick={() => setIsDialogOpen(false)}>取消</Button>
          <Button size="sm" onClick={handleSaveCategory}>儲存</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
