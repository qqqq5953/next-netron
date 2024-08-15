import Paginations from "@/components/Paginations";
import { fetchNews } from "@/lib/dataPublic";
import { Language } from "@/lib/definitions";
import { isSuccessResponse } from "@/lib/utils";
import Image from "next/image";
import Card from "../../_components/Card";

type Props = {
  params: {
    lang: Language,
    id: string
  },
  searchParams: {
    page: string
  }
}

const categoryTitles: Record<string, string> = {
  "2": "雲端活動",
  "5": "雲端新聞",
  "9": "雲端技能學習"
}

export default async function NewsListPage(props: Props) {
  const categoryId = props.params.id

  const result = await fetchNews(
    categoryId,
    props.params.lang ?? "tw",
    props.searchParams.page
  )

  const title = categoryTitles[categoryId] ?? "所有消息"

  return (
    <>
      <main className="flex flex-col gap-8">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <div className="grid grid-cols-2 gap-8">
          {isSuccessResponse(result) && (
            <>
              {result.data.rows.map(row => {
                return <Card
                  key={row.id}
                  imgUrl={row.img}
                  title={row.title}
                  content={row.created_at.split('T')[0]}
                />
              })}
            </>
          )}
        </div>
        <div className='not-prose'>
          {isSuccessResponse(result) &&
            <Paginations
              perPage={10}
              total={result.data.total}
            />
          }
        </div>
      </main>
    </>
  )
}
