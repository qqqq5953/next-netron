import { ApiResponse, CategoryTableData, Language } from '@/lib/definitions'
import TableCategories from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/TableCategories'
import DialogCategory from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/DialogCategory'
import { isSuccessResponse } from '@/lib/utils'

type Props = {
  searchParams: {
    adminLang: Language
  }
}

async function fetchCategoryForNews(lang: Language): Promise<ApiResponse<CategoryTableData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/news?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export default async function CategoryNewsPage({ searchParams }: Props) {
  const result = await fetchCategoryForNews(searchParams.adminLang)

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
