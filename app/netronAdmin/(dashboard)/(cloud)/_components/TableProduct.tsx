'use client'

import { useEffect, useRef, useState } from 'react'
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
import { Language, ProducTableData } from '@/lib/definitions'
import FormProduct from './FormProduct'
import { swrFetchProducts } from '@/lib/data'
import { ScrollArea } from '@/components/ui/scroll-area'
import DialogAlert from '@/components/DialogAlert'
import { handleModifyApiResponse, isSuccessResponse } from '@/lib/utils'
import { deleteProduct } from '@/lib/actions'

type Props = {
  initialData: ProducTableData[]
  allBrands: { id: number, title: string }[],
  allNews: { id: number, title: string }[],
  lang: Language
}

export default function TableProduct(props: Props) {
  const [products, setProducts] = useState(props.initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const deletedProduct = useRef<{ title: string | null, id: number | null }>({ title: null, id: null })

  const {
    data: rawData,
    mutate
  } = swrFetchProducts(props.lang)

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...products];
    updatedData[index].sort = Number(newOrder);
    setProducts(updatedData);
  };

  async function handleRemoveProduct() {
    if (!deletedProduct.current.id) return

    const result = await deleteProduct({ id: deletedProduct.current.id })
    await mutate()

    handleModifyApiResponse(result)
    setOpenDialog(false)
  }

  useEffect(() => {
    // update existing product
    if (rawData && isSuccessResponse(rawData)) {
      setProducts(rawData.data ?? [])
    }
  }, [rawData])

  return (
    <ScrollArea>
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
                    mutate={mutate}
                  />
                  <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'
                    onClick={() => {
                      setOpenDialog(true)
                      deletedProduct.current = {
                        title: product.title,
                        id: product.id
                      }
                    }}
                  >刪除</Button>
                </div>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      <DialogAlert
        title={<div className='leading-8'>
          <span>雲服務產品資訊</span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{deletedProduct.current.title}</span>
        </div>}
        open={openDialog}
        onConfirm={handleRemoveProduct}
        onClose={() => setOpenDialog(false)}
      />
    </ScrollArea>
  )
}