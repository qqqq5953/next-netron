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
import { Button } from '@/app/netronAdmin/_components/Button'
import { Input } from '@/components/ui/input'
import { ProducTableData } from '@/lib/definitions'
import FormProduct from './FormProduct'

type Props = {
  initialData: ProducTableData[]
  allBrands: { id: number, title: string }[],
  allNews: { id: number, title: string }[],
}

export default function TableBrand(props: Props) {
  const [products, setProducts] = useState(props.initialData);

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...products];
    updatedData[index].sort = Number(newOrder);
    setProducts(updatedData);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>標題</TableHead>
          <TableHead>排序</TableHead>
          <TableHead>動作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => {
          return <TableRow key={product.title}>
            <TableCell>{product.title}</TableCell>
            <TableCell>
              <Input
                type="number"
                className="primary-input-focus"
                value={product.sort}
                onChange={(e) => handleOrderChange(index, e.target.value)}
              />
            </TableCell>
            <TableCell className="font-medium">
              <div className='flex gap-2'>
                <FormProduct
                  type="edit"
                  product={product}
                  allBrands={props.allBrands}
                  allNews={props.allNews}
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