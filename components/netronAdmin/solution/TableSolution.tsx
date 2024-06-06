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

type InitialData = {
  title: string;
}[]

const initialData: InitialData = [
  { title: "AWS 解決方案" },
  { title: "中國解決方案" },
]

export default function TableBrand() {
  const [data, setData] = useState(initialData);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">動作</TableHead>
          <TableHead>標題</TableHead>
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
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}