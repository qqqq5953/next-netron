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
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckedState } from '@radix-ui/react-checkbox'
import { NewsTableData } from '@/lib/definitions'
import FormNews from './FormNews'
import DialogAlert from '@/components/DialogAlert'

type Props = {
  data: NewsTableData[]
}

export default function TableNews(props: Props) {
  const [news, setNews] = useState(props.data);
  const [openDialog, setOpenDialog] = useState(false);
  const deletedNews = useRef<{ title: string | null, id: number | null }>({ title: null, id: null })

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

  function handleRemoveNews(closeLoading: () => void) {
    // delete request with deletedNews.current.id
    closeLoading()
    setOpenDialog(false)
  }

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
                  <FormNews type="edit" news={item} />
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

    // <Table>
    //   <TableHeader className='block bg-neutral-50 rounded-t-lg'>
    //     <TableRow className='w-full flex'>
    //       <TableHead className='flex items-center w-[30%] px-4'>標題</TableHead>
    //       <TableHead className='flex items-center w-[10%] px-0'>上下架</TableHead>
    //       <TableHead className='flex items-center w-[10%] px-0'>首頁</TableHead>
    //       <TableHead className='flex items-center w-[20%] px-0'>排序</TableHead>
    //       <TableHead className='flex items-center w-[220px] px-1'>動作</TableHead>
    //     </TableRow>
    //   </TableHeader>
    //   <TableBody className='block overflow-auto w-full'>
    //     {news.map((item, index) => {
    //       return <TableRow key={item.title} className='flex items-center w-full'>
    //         <TableCell className='w-[30%]'>{item.title}</TableCell>
    //         <TableCell className='w-[10%] px-2'>
    //           <Checkbox
    //             checked={item.status === 1} onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'status')}
    //           />
    //         </TableCell>
    //         <TableCell className='w-[10%] px-2'>
    //           <Checkbox
    //             checked={item.show === 1}
    //             onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'show')}
    //           />
    //         </TableCell>
    //         <TableCell className='w-[20%] px-2'>
    //           <Input
    //             type="number"
    //             className="primary-input-focus"
    //             value={item.sort}
    //             onChange={(e) => handleOrderChange(index, e.target.value)}
    //           />
    //         </TableCell>
    //         <TableCell className="font-medium w-[220px] px-4">
    //           <div className='flex gap-2 w-full'>
    //             <Button variant="outline" size="sm">編輯</Button>
    //             <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'>刪除</Button>
    //             <Button variant="outline" size="sm" className='text-neutral-500 border-current hover:text-neutral-500/90'>預覽</Button>
    //           </div>
    //         </TableCell>
    //       </TableRow>
    //     })}
    //   </TableBody>
    // </Table>
  )
}