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
import { Button } from '@/components/netronAdmin/global/button'
import { Input } from '@/components/ui/input'

type InitialData = {
  title: string;
  order: string;
}[]

const initialData: InitialData = [
  { title: "2024 Netron x AWS Philippines event", order: "1" },
  { title: "【雲端活動】雲服務技術優化工作坊", order: "2" },
  { title: "【雲端活動】SRE CONFERENCE 2024", order: "3" }
]

export default function TableBrand() {
  const [data, setData] = useState(initialData);

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...data];
    updatedData[index].order = newOrder;
    setData(updatedData);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">動作</TableHead>
          <TableHead>標題</TableHead>
          <TableHead>排序</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return <TableRow key={item.title}>
            <TableCell className="font-medium">
              <div className='flex gap-2'>
                <Button variant="outline" size="sm">編輯</Button>
                <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'>刪除</Button>
              </div>
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <Input
                type="number"
                className="primary-input-focus"
                value={item.order}
                onChange={(e) => handleOrderChange(index, e.target.value)}
              />
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}