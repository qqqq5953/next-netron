import FormAddProduct from '@/app/netronAdmin/(dashboard)/(cloud)/_components/FormAddProduct'
import TableProduct from '@/app/netronAdmin/(dashboard)/(cloud)/_components/TableProduct'

export default function ProductPage() {
  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>雲服務產品資訊</h2>
        <FormAddProduct />
      </div>

      <section>
        <TableProduct />
      </section>
    </>
  )
}

