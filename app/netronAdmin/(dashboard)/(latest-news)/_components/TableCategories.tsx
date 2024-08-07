'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { Button } from '@/app/netronAdmin/_components/Button'
import DialogCategory from './DialogCategory'
import { CategoryTableData, Language } from '@/lib/definitions'

// import { mutate } from "swr"
import { deleteCategoryCases, deleteCategoryNews } from '@/lib/actions'
import DialogAlert from '@/components/DialogAlert'
import { handleModifyApiResponse, isSuccessResponse } from '@/lib/utils'
import { swrFetchCategories } from '@/lib/data'

type Props = {
  initialData: CategoryTableData[],
  category: "news" | "case",
  lang?: Language
}

export default function TableCategories(props: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [deletedItem, setDeletedItem] = useState({ id: -1, title: "" })
  const [categories, setCategories] = useState<CategoryTableData[]>(props.initialData);

  const {
    data: rawData,
    // error,
    // isLoading
    mutate
  } = swrFetchCategories(props.lang, props.category)

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...categories];
    updatedData[index].sort = newOrder;
    setCategories(updatedData);
  };

  useEffect(() => {
    if (rawData && isSuccessResponse(rawData)) {
      console.log('setCategories');

      setCategories(rawData?.data ?? [])
    }
  }, [rawData])

  async function handleDelete() {
    console.log('id', deletedItem.id);

    let result
    if (props.category === 'case') {
      result = await deleteCategoryCases({ id: deletedItem.id })
    } else {
      result = await deleteCategoryNews({ id: deletedItem.id })
    }

    await mutate()
    // await mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/category/case?adminLang=tw`);

    handleModifyApiResponse(result)
    setOpenDialog(false)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-1/3'>分類名稱</TableHead>
          <TableHead className='w-1/3'>排序</TableHead>
          <TableHead className='w-1/3'>動作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {error && <TableRow>
          <TableCell>Failed to load data...</TableCell>
        </TableRow>}

        {isLoading && [...Array(2)].map((_ele, i) => {
          return <TableRow key={i}>
            <TableCell>
              <div className='bg-neutral-200 w-full h-5 rounded animate-pulse'></div>
            </TableCell>
            <TableCell>
              <div className='bg-neutral-200 w-full h-5 rounded animate-pulse'></div>
            </TableCell>
            <TableCell>
              <div className='bg-neutral-200 w-full h-5 rounded animate-pulse'></div>
            </TableCell>
          </TableRow>
        })} */}

        {categories.map((item, index) => {
          return <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <Input
                type="number"
                value={item.sort}
                className='primary-input-focus'
                onChange={(e) => handleOrderChange(index, e.target.value)}
              />
            </TableCell>
            <TableCell className="font-medium">
              <div className='flex gap-2'>
                <DialogCategory
                  type="edit"
                  category={item.type}
                  title={item.title}
                  id={item.id}
                  lang={item.lang}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className='text-rose-500 border-current hover:text-rose-500/90'
                  onClick={() => {
                    setOpenDialog(true)
                    setDeletedItem({ id: item.id, title: item.title })
                  }}
                >
                  刪除
                </Button>
              </div>
            </TableCell>
          </TableRow>
        })}

        <DialogAlert
          title={<div className='leading-8'>
            <span>分類</span>
            <span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{deletedItem.title}</span>
          </div>}
          open={openDialog}
          onConfirm={handleDelete}
          onClose={() => setOpenDialog(false)}
        />
      </TableBody>
    </Table>
  )
}
