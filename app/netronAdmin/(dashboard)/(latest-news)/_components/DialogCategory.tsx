'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/app/netronAdmin/_components/Button'
import { toast } from "sonner"
import { updateCategoryNews } from '@/lib/actions'
import { CategoryTableData } from '@/lib/definitions'

type Props = {
  type: "edit" | "add"
  title?: string
  id?: number
  setCategories?: Dispatch<SetStateAction<CategoryTableData[]>>
}

export default function DialogAddCategory(props: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("");

  function handleOpenDialog() {
    setIsDialogOpen(true)
    setCategoryName("")
  }

  async function handleSaveCategory() {
    console.log('categoryName', categoryName);
    setIsDialogOpen(false)

    try {
      if (categoryName && props.id && props.setCategories) {
        // edit
        const result = await updateCategoryNews({
          id: props.id,
          title: categoryName
        })

        if (result.statusCode === 200) {
          toast.success(result.msg)
        } else if (result.statusCode === 204) {
          toast.info(result.msg)
        } else {
          toast.error(result.errorMsg)
        }

        props.setCategories(prev => {
          return prev.map(category => {
            if (category.id === props.id) {
              return {
                ...category,
                title: categoryName
              }
            } else {
              return category
            }
          })
        })
      } else {
        // add
      }
    } catch (error) {
      console.log('error', error);
      toast.error("Oops! Something went wrong.")
    }
  }

  function handleEdit(category?: string) {
    setIsDialogOpen(true)
    if (category) setCategoryName(category)
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
