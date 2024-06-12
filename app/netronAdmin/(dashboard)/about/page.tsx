import FormAbout from '@/app/netronAdmin/(dashboard)/about/_components/FormAbout'
import { Language } from '@/lib/definitions';

type Props = {
  searchParams: {
    adminLang: Language
  }
}

async function fetchAbout(lang: Language) {
  const res = await fetch(`${process.env.BASE_URL}/api/netronAdmin/about?adminLang=${lang}`);
  const result = await res.json();
  return result
}

export default async function AboutPage({ searchParams }: Props) {
  const { data, statusCode, error } = await fetchAbout(searchParams.adminLang)

  return (
    <>
      <h2 className='text-3xl font-medium'>關於我們</h2>
      <section>
        {statusCode === 200 ?
          <FormAbout about={data} /> :
          <div>{error}</div>
        }
      </section>
    </>
  )
}
