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
import Loader from '@/components/loader'

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
          <TableHead className='w-1/3'>分類名稱</TableHead>
          <TableHead className='w-1/3'>排序</TableHead>
          <TableHead className='w-1/3'>動作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {error && <TableRow>
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
        })}

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
