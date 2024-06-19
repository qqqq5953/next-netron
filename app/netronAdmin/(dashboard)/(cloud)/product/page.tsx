import FormProduct from '@/app/netronAdmin/(dashboard)/(cloud)/_components/FormProduct'
import TableProduct from '@/app/netronAdmin/(dashboard)/(cloud)/_components/TableProduct'
import { ApiResponse, Language, ProducTableData } from '@/lib/definitions'
import { isSuccessResponse, withDbConnection } from '@/lib/utils'

import { PoolConnection } from "mysql2/promise";
import { RowDataPacket } from 'mysql2';
import pool from "@/lib/mysql";

type Props = {
  searchParams: {
    adminLang: Language
  }
}

const data = [
  {
    "id": 3,
    "title": "Brand 雲端品牌",
    "lang": "tw",
    "brandList": [1, 50, 13, 15, 14, 22, 16, 3, 48, 51, 12, 17, 18, 20, 21, 60, 49],
    "newsList": [88, 82, 78, 79, 71, 4, 5],
    "m_url": "brands",
    "m_title": "雲端品牌｜Netron 網創資訊 Connect You to The Cloud",
    "m_description": "網創資訊是台灣唯一在 Kubernetes 取得 CNCF 認證之混合雲供應商，且擁有 AWS 進階合作夥伴、微軟 Azure 金級合作夥伴、阿里雲金級合作夥伴等國際雲端平台認證，代理品牌多樣，更能依照客戶需求高度客製化的解決方案。",
    "m_keywords": "kubernetes, aws, 雲端平台",
    "created_at": "2021-08-06T02:45:15.000Z",
    "updated_at": "2024-04-23T06:40:50.000Z",
    "sort": 1,
    "productItems": []
  },
  {
    "id": 4,
    "title": "Cloud 雲端服務",
    "lang": "tw",
    "brandList": [],
    "newsList": [88, 99, 96, 97, 4, 5],
    "m_url": "services",
    "m_title": "Cloud computing提供企業雲端服務公司｜Netron 網創資訊 Connect You to The Cloud",
    "m_description": "Netron網創資訊為雲端服務公司，擁有大型電商與遊戲網站建構經驗，提供企業雲端運算規劃、機房選擇、設備採購、抗攻擊等 cloud 雲端服務，為客戶做全方位的雲端平台規劃。",
    "m_keywords": "cloud computing, 雲端平台, 雲端服務公司, 雲端服務, 雲端運算, 雲端儲存, cloud雲端, 企業雲端",
    "created_at": "2021-08-12T11:07:11.000Z",
    "updated_at": "2024-04-17T05:16:22.000Z",
    "sort": 2,
    "productItems": [
      {
        "id": 7,
        "title": "雲端運算 Cloud Computing",
        "description": "網創資訊提供多雲政策、企業節費、雲端儲存、代管、AI / Big Data 等企業雲端服務，有了雲端就不需要購買並維護硬體設備，即使需要大量運算也能快速部署，遇到突發狀況也有資料備份、災難復原等機制，不怕資料一去不回。我們擁有專業的整合技術團隊，可以協助您快速上雲，並讓您更專注於產品及業務的開發。",
        "img": "a17cc2f8-14c7-454e-98bf-e418ee0db470.png",
        "created_at": "2021-08-12T11:07:11.000Z",
        "updated_at": "2023-10-18T09:58:19.000Z",
        "pid": 4,
        "url": null
      },
    ]
  }
]

const allBrands1 = [
  { id: 18, title: '全球專業域名購買註冊' },
  { id: 19, title: 'VDI 解決方案首選' },
  { id: 20, title: '世界第一 app 防護解決方案' },
  { id: 21, title: '大陸 CDN 解決方案' },
  { id: 34, title: '亚太区最大凭证销售' },
  { id: 61, title: 'Health Check Service' },
  { id: 60, title: '資安健檢服務' },
  { id: 62, title: '资安健检服务' },
  { id: 31, title: 'SOC资安监控维运服务' },
  { id: 42, title: 'Leading brand of  EIM' },
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

async function fetchProducts(lang: Language): Promise<ApiResponse<ProducTableData[]>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/product?adminLang=${lang}`);
  const result = await res.json();
  return result
}

async function fetchAllBrandsAndNews(lang: Language) {
  const brandQuery = `SELECT id, title FROM brands ORDER BY sort DESC`
  const newsQuery = `
    SELECT id, title FROM news 
    WHERE lang = ? AND type = "news" 
    ORDER BY sort DESC
  `

  const [allBrands, allNews] = await withDbConnection(pool, async (db: PoolConnection) => {
    const brandPromise = db.execute<RowDataPacket[]>(brandQuery);
    const newsPromise = db.execute<RowDataPacket[]>(newsQuery, [lang ?? "tw"]);
    const [[allBrands], [allNews]] = await Promise.all([
      brandPromise,
      newsPromise
    ])
    return [allBrands, allNews];
  });

  return [allBrands, allNews] as [
    { id: number, title: string }[],
    { id: number, title: string }[]
  ]
}

export default async function ProductPage({ searchParams }: Props) {
  const [allBrands, allNews] = await fetchAllBrandsAndNews(searchParams.adminLang)

  // console.log('allBrands', allBrands);
  // console.log('allNews', allNews);
  const result = await fetchProducts(searchParams.adminLang)


  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>雲服務產品資訊</h2>
        <FormProduct
          type="add"
          allBrands={allBrands1}
          allNews={allNews1}
        />
      </div>

      <section>
        {isSuccessResponse(result) ?
          <TableProduct
            initialData={result.data}
            allBrands={allBrands}
            allNews={allNews}
          /> :
          <div>{result.errorMsg}</div>
        }
      </section>
    </>
  )
}

