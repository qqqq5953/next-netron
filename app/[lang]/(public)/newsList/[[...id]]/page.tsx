import Paginations from "@/components/Paginations";
import { fetchNews } from "@/lib/dataPublic";
import { Language } from "@/lib/definitions";
import { isSuccessResponse } from "@/lib/utils";
import CardNews from "../../_components/CardNews";

type Props = {
  params: {
    lang: Language,
    id: string
  },
  searchParams: {
    page: string
  }
}

export default async function NewsListPage(props: Props) {
  const { id: categoryId, lang } = props.params

  const result = await fetchNews(
    categoryId,
    lang ?? "tw",
    props.searchParams.page
  )

  return (
    <>
      <main className="flex flex-col gap-8">
        {isSuccessResponse(result) && (
          <>
            <h2 className="text-3xl font-semibold">{result.data.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {result.data.rows.map(row => {
                return <CardNews
                  key={row.id}
                  imgUrl={row.img}
                  title={row.title}
                  date={row.created_at.split('T')[0]}
                />
              })}
            </div>
          </>
        )}

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
