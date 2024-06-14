import FormNews from '@/app/netronAdmin/(dashboard)/(latest-news)/_components/FormNews'
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
    rows: NewsTableData[],
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

// const data1: NewsTableData[] = [{
//   "id": 161,
//   "title": "【雲端活動】雲服務技術優化工作坊",
//   "cid": 2,
//   "description": "",
//   "img": "0YWN8zD10NZ4BGTw5sgBOMItp50hngv4sBeola28.png",
//   "content": "<div class=\"editorstreditorstr\"><meta charset=\"utf-8\"></div>\r\n<title></title>\r\n<link href=\"https://edm.gaia.net/Picture/logo/netron_200X200.png\" rel=\"icon\" sizes=\"16x16\" type=\"image/x-icon\" />\r\n<div class=\"editorstreditorstr\">\r\n<p style=\"text-align: center;\"><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSdGxbjKUPWH9HKTNepLYEBvgYgdbLdmiD5h5zRTFdVHM-e1gQ/viewform?fbzx=1290876493433033915\" target=\"_blank\"><img alt=\"\" src=\"https://edm.netron.asia/Picture/netron/GenAI_1.png\" style=\"width: 1080px; height: 5756px;\" usemap=\"#Map\" /></a><map name=\"Map\"><area coords=\"550,900,1200,1100\" href=\"https://docs.google.com/forms/d/e/1FAIpQLSdGxbjKUPWH9HKTNepLYEBvgYgdbLdmiD5h5zRTFdVHM-e1gQ/viewform?fbzx=1290876493433033915\" shape=\"rect\" /> <area coords=\"550,4000,1200,4300\" href=\"https://docs.google.com/forms/d/e/1FAIpQLSdGxbjKUPWH9HKTNepLYEBvgYgdbLdmiD5h5zRTFdVHM-e1gQ/viewform?fbzx=1290876493433033915\" shape=\"rect\" /> <area coords=\"550,8700,1200,9000\" href=\"https://docs.google.com/forms/d/e/1FAIpQLSdGxbjKUPWH9HKTNepLYEBvgYgdbLdmiD5h5zRTFdVHM-e1gQ/viewform?fbzx=1290876493433033915\" shape=\"rect\" /></map></p>\r\n</div>",
//   "lang": "tw",
//   "status": 1,
//   "sort": 41,
//   "m_title": "【雲端活動】雲服務技術優化工作坊",
//   "m_keywords": null,
//   "m_description": "誠摯邀請您參加我們即將舉辦的「Gen AI 應用 創新雲端服務」工作坊，掌握最新趨勢、提升競爭力，實現事業突破！",
//   "m_url": null,
//   "edit_at": "2024-05-16T16:00:00.000Z",
//   "post_date": null,
//   "created_at": "2024-05-13T06:22:59.000Z",
//   "updated_at": "2024-05-18T16:00:00.000Z",
//   "show": 1,
//   "type": "news",
//   "mode": "OfflineEventAttendanceMode",
//   "location": "集思北科大會議中心",
//   "county": "台北市",
//   "street": "大安區忠孝東路三段1號億光大樓",
//   "lecturer": null,
//   "start_at": "2024-05-19 T09:30",
//   "end_at": "2024-05-19 T16:30",
//   "price": null,
//   "currency": null,
//   "soldout_at": null,
//   "website": "https://edm.netron.asia/EDM/GenAI_EDM.html",
//   "hostCompany": "Netron網創資訊",
//   "hostWeb": "https://www.netron.asia/"
// }]

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
        <FormNews type="add" />
      </div>

      <div className='absolute top-16'>
        <TabsNav tabs={tabs} />
      </div>

      <section className='absolute top-28 pt-4 bottom-0 inset-x-0 flex flex-col'>
        {statusCode === 200 ?
          <TableNews data={data.rows} id={params.id} key={searchParams.page} /> :
          <div>{errorMsg}</div>
        }

        <div className='pt-8'>
          <Paginations
            perPage={10}
            total={data.total}
          />
        </div>
      </section>
    </div>
  )
}
