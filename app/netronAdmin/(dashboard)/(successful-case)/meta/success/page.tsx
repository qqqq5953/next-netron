import { ApiResponse, Language, MetaForm } from "@/lib/definitions"
import { isSuccessResponse } from "@/lib/utils"
import FormMeta from "../../../(latest-news)/meta/news/_components/FormMeta"

type Props = {
  searchParams: {
    adminLang: Language
  }
}

async function fetchMeta(lang: Language): Promise<ApiResponse<MetaForm>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/meta/success?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export default async function MetaCasePage({ searchParams }: Props) {
  const result = await fetchMeta(searchParams.adminLang)

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
