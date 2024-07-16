'use client'

import { useRef, useState } from 'react'

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
import { NewsTableData } from '@/lib/definitions'
import { ScrollArea } from '@/components/ui/scroll-area'
import DialogAlert from '@/components/DialogAlert'

type Props = {
  data: NewsTableData[]
}

export default function TableCase(props: Props) {
  const [news, setNews] = useState(props.data);
  const [openDialog, setOpenDialog] = useState(false);
  const deletedNews = useRef<{ title: string | null, id: number | null }>({ title: null, id: null })

  function toggleCheckbox(index: number, isChecked: CheckedState, type: 'status') {
    const updatedNews = [...news];
    updatedNews[index][type] = isChecked ? 1 : 0;
    setNews(updatedNews);
  }

  function handleOrderChange(index: number, newOrder: string) {
    const updatedNews = [...news];
    updatedNews[index].sort = Number(newOrder);
    setNews(updatedNews);
  };

  function handleRemoveNews() {
    // delete request with deletedNews.current.id
    setOpenDialog(false)
  }

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
          {news.map((item, index) => {
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
                  <Button variant="outline" size="sm">編輯</Button>
                  <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'>刪除</Button>
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