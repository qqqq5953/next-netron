import { Language } from "@/lib/definitions"
import { isSuccessResponse } from "@/lib/utils"
import FormMeta from "../../../(latest-news)/meta/news/_components/FormMeta"
import { fetchMetaSuccess } from "@/lib/data"

type Props = {
  searchParams: {
    adminLang: Language
  }
}

export default async function MetaCasePage({ searchParams }: Props) {
  const result = await fetchMetaSuccess(searchParams.adminLang)

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
