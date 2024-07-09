import { Language } from "@/lib/definitions";
import FormMeta from "./_components/FormMeta"
import { isSuccessResponse } from "@/lib/utils";
import { fetchMetaNews } from "@/lib/data";

type Props = {
  searchParams: {
    adminLang: Language
  }
}

export default async function MetaNewsPage({ searchParams }: Props) {
  const result = await fetchMetaNews(searchParams.adminLang)

  return (
    <>
      <h2 className='text-3xl font-medium'>Meta 資訊</h2>
      <section>
        {isSuccessResponse(result) ?
          <FormMeta meta={result.data} /> :
          <div>{result.errorMsg}</div>
        }
      </section>
    </>
  )
}
