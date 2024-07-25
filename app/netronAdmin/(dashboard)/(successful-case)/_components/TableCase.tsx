'use client'

import { useEffect, useRef, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/app/netronAdmin/_components/Button'
import { Input } from '@/components/ui/input'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Language, NewsTableData } from '@/lib/definitions'
import { ScrollArea } from '@/components/ui/scroll-area'
import DialogAlert from '@/components/DialogAlert'
import { swrFetchCases } from '@/lib/data'
import { handleModifyApiResponse, isSuccessResponse } from '@/lib/utils'
import { deleteCases } from '@/lib/actions'
import FormCase from './FormCase'

type Props = {
  lang: Language,
  id: string,
  page: string,
  data: NewsTableData[],
}

export default function TableCase(props: Props) {
  const [cases, setCases] = useState(props.data);
  const [openDialog, setOpenDialog] = useState(false);
  const deletedNews = useRef<{ title: string | null, id: number | null }>({ title: null, id: null })

  const {
    data: rawData,
    // error,
    // isLoading
    mutate
  } = swrFetchCases(props.lang, props.page, props.id)

  console.log('rawData', rawData);


  function toggleCheckbox(index: number, isChecked: CheckedState, type: 'status') {
    const updatedNews = [...cases];
    updatedNews[index][type] = isChecked ? 1 : 0;
    setCases(updatedNews);
  }

  function handleOrderChange(index: number, newOrder: string) {
    const updatedNews = [...cases];
    updatedNews[index].sort = Number(newOrder);
    setCases(updatedNews);
  };

  async function handleRemoveCase() {
    if (!deletedNews.current.id) return

    const result = await deleteCases({ id: deletedNews.current.id })
    await mutate()

    handleModifyApiResponse(result)
    setOpenDialog(false)
  }

  useEffect(() => {
    // update existing cases
    if (rawData && isSuccessResponse(rawData)) {
      setCases(rawData.data.rows ?? [])
    }
  }, [rawData])

  return (
    <ScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>標題</TableHead>
            <TableHead>上下架</TableHead>
            <TableHead>排序</TableHead>
            <TableHead>動作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cases.map((item, index) => {
            return <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Checkbox
                  checked={item.status === 1} onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'status')}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  className="primary-input-focus"
                  value={item.sort}
                  onChange={(e) => handleOrderChange(index, e.target.value)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className='flex gap-2'>
                  <FormCase type="edit" lang={item.lang} case={item} mutate={mutate} />
                  <Button
                    variant="outline"
                    size="sm"
                    className='text-rose-500 border-current hover:text-rose-500/90'
                    onClick={() => {
                      setOpenDialog(true)
                      deletedNews.current = {
                        title: item.title,
                        id: item.id
                      }
                    }}
                  >刪除</Button>
                  <Button variant="outline" size="sm" className='text-neutral-500 border-current hover:text-neutral-500/90'>預覽</Button>
                </div>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      <DialogAlert
        title={<div className='leading-8'>
          <span>案例清單</span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{deletedNews.current.title}</span>
        </div>}
        open={openDialog}
        onConfirm={handleRemoveCase}
        onClose={() => setOpenDialog(false)}
      />
    </ScrollArea>
  )
}