'use client'

import { useState } from 'react'
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
import { CategoryTableData } from '@/lib/types/admin-types'

type Props = {
  initialData: CategoryTableData[]
}

export default function TableCategories(props: Props) {
  const [categories, setCategories] = useState(props.initialData);

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...categories];
    updatedData[index].sort = newOrder;
    setCategories(updatedData);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>分類名稱</TableHead>
          <TableHead>排序</TableHead>
          <TableHead>動作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((item, index) => {
          return <TableRow key={item.title}>
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
                  title={item.title}
                />
                <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'>刪除</Button>
              </div>
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}
