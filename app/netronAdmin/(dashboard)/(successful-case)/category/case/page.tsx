import { ApiResponse, CategoryTableData, Language } from '@/lib/definitions'
import { isSuccessResponse } from '@/lib/utils'
import DialogCategory from '../../../(latest-news)/_components/DialogCategory'
import TableCategories from '../../../(latest-news)/_components/TableCategories'

type Props = {
  searchParams: {
    adminLang: Language
  }
}

async function fetchCategoryForCases(lang: Language): Promise<ApiResponse<CategoryTableData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/cases?adminLang=${lang}`);
  const result = await res.json();
  return result
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
