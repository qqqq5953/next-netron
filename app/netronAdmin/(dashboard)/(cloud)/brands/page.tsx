import FormBrand from '@/app/netronAdmin/(dashboard)/(cloud)/_components/FormBrand'
import TableBrand from '@/app/netronAdmin/(dashboard)/(cloud)/_components/TableBrand'
import Paginations from '@/components/Paginations'
import { fetchBrands } from '@/lib/data'
import { Language } from '@/lib/definitions'
import { isSuccessResponse } from '@/lib/utils'

type Props = {
  searchParams: {
    adminLang: Language
    page: string
  }
}

export default async function BrandPage({
  searchParams: { adminLang, page }
}: Props) {
  const result = await fetchBrands(adminLang, page)

  return (
    <div className='relative flex flex-col gap-4 h-full'>
      <div className='absolute top-0 inset-x-0 flex items-center'>
        <h2 className='text-3xl font-medium'>品牌項目</h2>
        <FormBrand type="add" lang={adminLang} />
      </div>

      <section className='absolute top-16 pt-4 bottom-0 inset-x-0 flex flex-col'>
        {isSuccessResponse(result) ?
          <TableBrand initialData={result.data.rows} key={page} /> :
          <div>{result.errorMsg}</div>
        }

        <div className='pt-8 mt-auto'>
          {isSuccessResponse(result) &&
            <Paginations
              perPage={10}
              total={result.data.total}
            />
          }
        </div>
      </section>
    </div>
  )
}
