import FormAddNews from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/FormAddNews'
import TableNews from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/TableNews'
import Paginations from '@/components/Paginations';
import TabsNav from '@/components/TabsNav'
import { Language, NewsTableData } from '@/lib/definitions';

type Props = {
  params: {
    id: string
  }
  searchParams: {
    adminLang: Language
    page: string
  }
}

type FetchResult = {
  statusCode: number,
  data: {
    rows: NewsTableData,
    total: number
  },
  errorMsg?: string
}

const tabs = [
  { name: "所有資訊", path: "/netronAdmin/news" },
  { name: "雲端活動", path: "/netronAdmin/news/2" },
  { name: "雲端新聞", path: "/netronAdmin/news/5" },
  { name: "雲端技能學習", path: "/netronAdmin/news/9" },
]

async function fetchNews(lang: Language, page: string, id: string,) {
  page = page ?? "1"

  const url = id ?
    `${process.env.BASE_URL}/api/netronAdmin/news/${id}?adminLang=${lang}&page=${page}` :
    `${process.env.BASE_URL}/api/netronAdmin/news?adminLang=${lang}&page=${page}`

  const res = await fetch(url);
  const result: FetchResult = await res.json();
  return { ...result, url }
}

export default async function NewsPage({ searchParams, params }: Props) {
  const { data, statusCode, errorMsg } = await fetchNews(
    searchParams.adminLang,
    searchParams.page,
    params?.id?.[0],
  )

  return (
    <div className='relative flex flex-col gap-4 h-full'>
      <div className='absolute top-0 inset-x-0 flex items-center'>
        <h2 className='text-3xl font-medium'>消息清單</h2>
        <FormAddNews />
      </div>

      <div className='absolute top-16'>
        <TabsNav tabs={tabs} />
      </div>

      <section className='absolute top-28 pt-4 bottom-0 inset-x-0 flex flex-col'>
        {statusCode === 200 ?
          <TableNews data={data.rows} id={params.id} key={searchParams.page} /> :
          <div>{errorMsg}</div>
        }

        <div className='pt-4'>
          <Paginations
            perPage={10}
            total={data.total}
          />
        </div>
      </section>
    </div>
  )
}
