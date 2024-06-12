import { Language } from '@/lib/definitions'
import TableCategories from '@/components/netronAdmin/latest-news/TableCategories'
import DialogCategory from '@/components/netronAdmin/latest-news/DialogCategory'

type Props = {
  searchParams: {
    adminLang: Language
  }
}

async function fetchCategoryForNews(lang: Language) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/category/news?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export default async function CategoryNewsPage({ searchParams }: Props) {
  const { data, statusCode, error } = await fetchCategoryForNews(searchParams.adminLang)

  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>分類管理</h2>
        <DialogCategory type="add" />
      </div>

      <section>
        {statusCode === 200 ?
          <TableCategories initialData={data} /> :
          <div>{error}</div>
        }
      </section >
    </>
  )
}
