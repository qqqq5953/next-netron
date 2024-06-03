import FormAddBrand from '@/components/netronAdmin/cloud/FormAddBrand'
import TableBrand from '@/components/netronAdmin/cloud/TableBrand'
import React from 'react'

export default function BrandPage() {


  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>品牌項目</h2>
        <FormAddBrand />
      </div>

      <section>
        <TableBrand />
      </section>
    </>
  )
}
