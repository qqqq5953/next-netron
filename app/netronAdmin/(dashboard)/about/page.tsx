import FormAbout from '@/app/netronAdmin/(dashboard)/about/_components/FormAbout'
import { fetchAbout } from '@/lib/data';
import { Language } from '@/lib/definitions';
import { isSuccessResponse } from '@/lib/utils';

type Props = {
  searchParams: {
    adminLang: Language
  }
}

export default async function AboutPage({ searchParams }: Props) {
  const result = await fetchAbout(searchParams.adminLang)

  return (
    <>
      <h2 className='text-3xl font-medium'>關於我們</h2>
      <section>
        {isSuccessResponse(result) ?
          <FormAbout about={result.data} /> :
          <div>{result.errorMsg}</div>
        }
      </section>
    </>
  )
}
