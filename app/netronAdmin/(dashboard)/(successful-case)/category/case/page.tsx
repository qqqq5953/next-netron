import { Language } from '@/lib/definitions'
import { isSuccessResponse } from '@/lib/utils'
import DialogCategory from '../../../(latest-news)/_components/DialogCategory'
import TableCategories from '../../../(latest-news)/_components/TableCategories'
import { fetchCategoryForCases } from '@/lib/data'

type Props = {
  searchParams: {
    adminLang: Language
  }
}

export default async function CategoryCasePage({ searchParams }: Props) {
  const result = await fetchCategoryForCases(searchParams.adminLang)

  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>分類管理</h2>
        <DialogCategory type="add" />
      </div>

      <section>
        {isSuccessResponse(result) ?
          <TableCategories initialData={result.data} /> :
          <div>{result.errorMsg}</div>
        }
      </section >
    </>
  )
}
