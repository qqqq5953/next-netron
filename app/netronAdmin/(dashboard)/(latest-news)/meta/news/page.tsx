import { Language } from "@/lib/definitions";
import FormMeta from "./_components/FormMeta"

type Props = {
  searchParams: {
    adminLang: Language
  }
}


async function fetchMeta(lang: Language) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/meta/news?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export default async function MetaNewsPage({ searchParams }: Props) {
  const { data, statusCode, error } = await fetchMeta(searchParams.adminLang)

  return (
    <>
      <h2 className='text-3xl font-medium'>Meta 資訊</h2>
      <section>
        {statusCode === 200 ?
          <FormMeta meta={data} /> :
          <div>{error}</div>
        }
      </section>
    </>
  )
}
