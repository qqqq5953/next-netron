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
import { BrandTableData } from '@/lib/definitions'
import FormBrand from './FormBrand'

type Props = {
  initialData: BrandTableData[]
}

export default function TableBrand(props: Props) {
  const [brands, setBrands] = useState(props.initialData);

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...brands];
    updatedData[index].sort = Number(newOrder);
    setBrands(updatedData);
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
        {brands.map((brand, index) => {
          return <TableRow key={brand.title}>
            <TableCell>{brand.title}</TableCell>
            <TableCell>
              <Input
                type="number"
                className="primary-input-focus"
                value={brand.sort}
                onChange={(e) => handleOrderChange(index, e.target.value)}
              />
            </TableCell>
            <TableCell className="font-medium">
              <div className='flex gap-2'>
                <FormBrand type="edit" brand={brand} />
                <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'>刪除</Button>
              </div>
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}