import { Language } from '@/lib/definitions'
import { isSuccessResponse } from '@/lib/utils'
import TableCategories from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/TableCategories'
import { fetchCategoryForNews } from '@/lib/data'
// import DialogCategory from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/DialogCategory'

type Props = {
  searchParams: {
    adminLang: Language
  }
}

export default async function CategoryNewsPage({ searchParams }: Props) {
  const result = await fetchCategoryForNews(searchParams.adminLang)

  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>分類管理</h2>
        {/* <DialogCategory type="add" /> */}
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
