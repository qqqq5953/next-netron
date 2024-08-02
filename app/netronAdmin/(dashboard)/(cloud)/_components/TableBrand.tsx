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
import { BrandTableData, Language } from '@/lib/definitions'
import FormBrand from './FormBrand'
import { swrFetchBrands } from '@/lib/data'
import { handleModifyApiResponse, isSuccessResponse } from '@/lib/utils'
import { deleteBrand } from '@/lib/actions'
import { ScrollArea } from '@/components/ui/scroll-area'
import DialogAlert from '@/components/DialogAlert'

type Props = {
  initialData: BrandTableData[]
  lang: Language
  page: string
}

export default function TableBrand(props: Props) {
  const [brands, setBrands] = useState(props.initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const deletedBrand = useRef<{ title: string | null, id: number | null }>({ title: null, id: null })

  const {
    data: rawData,
    mutate
  } = swrFetchBrands(props.lang, props.page)

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...brands];
    updatedData[index].sort = Number(newOrder);
    setBrands(updatedData);
  };

  async function handleRemoveBrand() {
    // delete request with deletedBrand.current.id
    if (!deletedBrand.current.id) return

    const result = await deleteBrand({ id: deletedBrand.current.id })
    await mutate()

    handleModifyApiResponse(result)
    setOpenDialog(false)
  }

  useEffect(() => {
    // update existing brands
    if (rawData && isSuccessResponse(rawData)) {
      setBrands(rawData.data.rows ?? [])
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
                  <FormBrand type="edit" brand={brand} mutate={mutate} />
                  <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'
                    onClick={() => {
                      setOpenDialog(true)
                      deletedBrand.current = {
                        title: brand.title,
                        id: brand.id
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
          <span>最新消息</span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 ml-1">{deletedBrand.current.title}</span>
        </div>}
        open={openDialog}
        onConfirm={handleRemoveBrand}
        onClose={() => setOpenDialog(false)}
      />
    </ScrollArea>
  )
}