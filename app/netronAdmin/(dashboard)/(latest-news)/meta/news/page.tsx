import { ApiResponse, Language, MetaForm } from "@/lib/definitions";
import FormMeta from "./_components/FormMeta"
import { isSuccessResponse } from "@/lib/utils";

type Props = {
  searchParams: {
    adminLang: Language
  }
}


async function fetchMeta(lang: Language): Promise<ApiResponse<MetaForm>> {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/meta/news?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export default async function MetaNewsPage({ searchParams }: Props) {
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
