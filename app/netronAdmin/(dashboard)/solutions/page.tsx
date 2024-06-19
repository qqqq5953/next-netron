import FormSolution from '@/app/netronAdmin/(dashboard)/solutions/_components/FormSolution'
import TableSolution from '@/app/netronAdmin/(dashboard)/solutions/_components/TableSolution'
import { fetchAllNews, fetchSolutions } from '@/lib/data';
import { Language } from '@/lib/definitions';
import { isSuccessResponse } from '@/lib/utils';

type Props = {
  searchParams: {
    adminLang: Language
  }
}

async function fetchAll(lang: Language) {
  const solutionsPromise = fetchSolutions(lang)
  const newsPromise = fetchAllNews(lang)
  const result = await Promise.all([solutionsPromise, newsPromise])
  return result
}

const data = [
  {
    "id": 1,
    "title": "AWS解決方案",
    "content": "",
    "sort": 0,
    "lang": "tw",
    "newsList": [88, 82],
    "m_title": "AWS(Amazon Web Services)是什麼？AWS雲端運算優勢及熱門服務",
    "m_keywords": "aws devops, devop, devops, devops工具, aws服務",
    "m_description": "Amazon Web Services(AWS)為業界領先的雲端計算平台，提供了廣泛的雲基礎設施，詳細了解AWS帶來的平台特色及5個AWS雲端服務優勢，量身打造合適的雲端系統，成為眾公司首選雲端解決方案。",
    "type": "aws",
    "m_url": "aws-solution",
    "created_at": null,
    "updated_at": "2024-01-11T08:35:41.000Z"
  },
  {
    "id": 4,
    "title": "中國解決方案",
    "content": "",
    "sort": 0,
    "lang": "tw",
    "newsList": [],
    "m_title": "中國解決方案｜Netron 網創資訊 Connect You to The Cloud",
    "m_keywords": "china solution",
    "m_description": "從架構規劃、機房選擇、設備採購、雲端解決方案與抗攻擊服務，做全方位服務規劃，讓客戶輕鬆提供優質互聯網訪問體驗。",
    "type": "china",
    "m_url": "china-solution",
    "created_at": null,
    "updated_at": "2022-09-29T06:54:48.000Z"
  }
]

const allNews1 = [
  { id: 88, title: '2024 Netron x AWS Philippines event' },
  { id: 82, title: '【雲端活動】雲服務技術優化工作坊-地端大型系統搬遷上雲' },
  { id: 78, title: '【雲端活動】雲服務技術優化工作坊' },
  { id: 160, title: '【雲端活動】SRE CONFERENCE 2024' },
  { id: 158, title: '【雲端活動】AWS AI雲端之旅：加速企業數位轉型與產業升級' },
  { id: 157, title: '【媒體報導】網創資訊執行長李尚修主打快速 發揚雲端服務' },
  { id: 155, title: '【最新消息】Netron 網創資訊榮獲騰訊雲二項夥伴大獎 銷售業績位居全球前三' }
]

export default async function SolutionPage({ searchParams }: Props) {
  const [solutionsRes, newsRes] = await fetchAll(searchParams.adminLang)
  const allNews = isSuccessResponse(newsRes) ?
    newsRes.data.rows :
    []

  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>解決方案</h2>
        <FormSolution type="add" allNews={allNews1} />
      </div>

      <section>
        {isSuccessResponse(solutionsRes) ?
          <TableSolution
            initialData={solutionsRes.data}
            allNews={allNews}
          /> :
          <div>{solutionsRes.errorMsg}</div>
        }
      </section>
    </>
  )
}
