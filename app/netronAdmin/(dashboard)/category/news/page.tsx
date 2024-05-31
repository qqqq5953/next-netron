'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


export default function CategoryNewsPage() {
  const [isOpen, setIsOpen] = useState(false)

  const data = [
    { category: "最新消息", order: "1" },
    { category: "雲端活動", order: "2" },
    { category: "雲端技能學習", order: "3" }
  ]

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>分類管理</h2>
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
          <DialogTrigger asChild>
            <Button size="sm" className='ml-auto bg-blue-600 hover:bg-blue-600/90'>新增</Button>
          </DialogTrigger>
          <DialogContent>
            <Label htmlFor='news'>分類名稱</Label>
            <Input id='news' className="focus-visible:outline-blue-200" placeholder="請輸入分類名稱" />
            <div className='flex items-center justify-end gap-2'>
              <Button size="sm" variant='ghost' onClick={() => setIsOpen(false)}>取消</Button>
              <Button size="sm" className='bg-blue-600 hover:bg-blue-600/90'>儲存</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">動作</TableHead>
              <TableHead>分類名稱</TableHead>
              <TableHead>排序</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(item => {
              return <TableRow key={item.category}>
                <TableCell className="font-medium">
                  <div className='flex gap-2'>
                    <Button variant="outline" size="sm" className='text-blue-500 border-current'>編輯</Button>
                    <Button variant="outline" size="sm" className='text-rose-500 border-current'>刪除</Button>
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Input value={item.order} />
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </section >
    </div >
  )
}
