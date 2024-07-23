import FormNews from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/FormNews'
import TableNews from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/TableNews'
import Paginations from '@/components/Paginations';
import TabsNav from '@/components/TabsNav'
import { fetchNews } from '@/lib/data';
import { Language } from '@/lib/definitions';
import { isSuccessResponse } from '@/lib/utils';

type Props = {
  params: {
    id: string
  }
  searchParams: {
    adminLang: Language
    page: string
  }
}

const tabs = [
  { name: "所有資訊", path: "/netronAdmin/news" },
  { name: "雲端活動", path: "/netronAdmin/news/2" },
  { name: "雲端新聞", path: "/netronAdmin/news/5" },
  { name: "雲端技能學習", path: "/netronAdmin/news/9" },
]

export default async function NewsPage({
  searchParams: { adminLang, page },
  params: { id }
}: Props) {
  const result = await fetchNews(adminLang, page, id?.[0])

  return (
    <div className='relative flex flex-col gap-4 h-full'>
      <div className='absolute top-0 inset-x-0 flex items-center'>
        <h2 className='text-3xl font-medium'>消息清單</h2>
        <FormNews type="add" lang={adminLang} page={page} />
      </div>

      <div className='absolute top-16'>
        <TabsNav tabs={tabs} />
      </div>

      <section className='absolute top-28 pt-4 bottom-0 inset-x-0 flex flex-col'>
        {isSuccessResponse(result) ?
          <TableNews
            data={result.data.rows}
            lang={adminLang ?? 'tw'}
            id={id}
            page={page}
            key={page}
          /> :
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
