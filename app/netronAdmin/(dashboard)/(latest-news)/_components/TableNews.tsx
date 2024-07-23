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
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Language, NewsTableData } from '@/lib/definitions'
import FormNews from './FormNews'
import DialogAlert from '@/components/DialogAlert'
import { swrFetchNews } from '@/lib/data'
import { handleModifyApiResponse, isSuccessResponse } from '@/lib/utils'
import { deleteNews } from '@/lib/actions'

type Props = {
  lang: Language
  id: string
  page: string
  data: NewsTableData[]
}

export default function TableNews(props: Props) {
  const [news, setNews] = useState(props.data);
  const [openDialog, setOpenDialog] = useState(false);
  const deletedNews = useRef<{ title: string | null, id: number | null }>({ title: null, id: null })

  const {
    data: rawData,
    mutate
  } = swrFetchNews(props.lang, props.page, props.id)

  function toggleCheckbox(index: number, isChecked: CheckedState, type: 'status' | 'show') {
    const updatedNews = [...news];
    updatedNews[index][type] = isChecked ? 1 : 0;
    setNews(updatedNews);
  }

  function handleOrderChange(index: number, newOrder: string) {
    const updatedNews = [...news];
    updatedNews[index].sort = Number(newOrder);
    setNews(updatedNews);
  };

  async function handleRemoveNews() {
    // delete request with deletedNews.current.id
    if (!deletedNews.current.id) return

    const result = await deleteNews({ id: deletedNews.current.id })
    await mutate()

    handleModifyApiResponse(result)
    setOpenDialog(false)
  }

  useEffect(() => {
    // update existing news
    if (rawData && isSuccessResponse(rawData)) {
      setNews(rawData.data.rows ?? [])
    }
  }, [rawData])

  return (
    <ScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[40%]'>標題</TableHead>
            <TableHead className='w-[10%] px-0'>上下架</TableHead>
            <TableHead className='w-[10%] px-0'>首頁</TableHead>
            <TableHead className='w-[20%] px-0'>排序</TableHead>
            <TableHead className='w-[220px] px-4'>動作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((item, index) => {
            return <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell className='px-3'>
                <Checkbox
                  checked={item.status === 1} onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'status')}
                />
              </TableCell>
              <TableCell className='px-1.5'>
                <Checkbox
                  checked={item.show === 1}
                  onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'show')}
                />
              </TableCell>
              <TableCell className='px-0'>
                <Input
                  type="number"
                  className="primary-input-focus"
                  value={item.sort}
                  onChange={(e) => handleOrderChange(index, e.target.value)}
                />
              </TableCell>
              <TableCell className="font-medium px-4">
                <div className='flex gap-2 w-full'>
                  <FormNews type="edit" news={item} mutate={mutate} />
                  <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'
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
          <span>最新消息</span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{deletedNews.current.title}</span>
        </div>}
        open={openDialog}
        onConfirm={handleRemoveNews}
        onClose={() => setOpenDialog(false)}
      />
    </ScrollArea>
  )
}