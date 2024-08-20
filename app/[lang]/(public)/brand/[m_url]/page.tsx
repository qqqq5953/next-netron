import { fetchBrand } from "@/lib/dataPublic";
import { Language } from "@/lib/definitions";
import { isSuccessResponse } from "@/lib/utils";
import { notFound } from 'next/navigation';

type Props = {
  params: {
    lang: Language,
    m_url: string
  },
}

export default async function BrandPage(props: Props) {
  const { lang, m_url } = props.params

  const result = await fetchBrand(
    lang ?? "tw",
    m_url
  )

  if (result.statusCode === 404) {
    return notFound()
  }

  return (
    <>
      <main className="flex flex-col gap-8">
        <p className="text-3xl font-semibold">品牌項目</p>
        {isSuccessResponse(result) && result.data &&
          <>
            <h1>{result.data.title}</h1>
            {result.data.content && <article dangerouslySetInnerHTML={{
              __html: result.data.content
            }}></article>}
          </>
        }
      </main>
    </>
  )
}
