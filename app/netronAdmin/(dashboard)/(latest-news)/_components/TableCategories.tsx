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
import { CategoryTableData } from '@/lib/definitions'

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Props = {
  initialData: CategoryTableData[]
  category: "news" | "case"
}

export default function TableCategories(props: Props) {
  const {
    data: rawData,
    error,
    isLoading
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/netronAdmin/category/cases?adminLang=tw`, fetcher);

  const [categories, setCategories] = useState<CategoryTableData[]>(rawData?.data ?? []);

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...categories];
    updatedData[index].sort = newOrder;
    setCategories(updatedData);
  };

  useEffect(() => {
    setCategories(rawData?.data ?? [])
  }, [rawData])

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
        {isLoading && <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>}
        {error && <TableRow>
          <TableCell>Failed to load data...</TableCell>
        </TableRow>}
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
                  category={props.category}
                  title={item.title}
                  id={item.id}
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
