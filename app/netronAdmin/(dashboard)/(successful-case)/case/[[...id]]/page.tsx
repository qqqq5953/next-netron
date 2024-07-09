import TableCase from '@/app/netronAdmin/(dashboard)/(successful-case)/_components/TableCase'
import FormAddCase from '@/app/netronAdmin/(dashboard)/(successful-case)/_components/FormAddCase'
import TabsNav from '@/components/TabsNav'
import { Language } from '@/lib/definitions'
import { isSuccessResponse } from '@/lib/utils'
import Paginations from '@/components/Paginations'
import { fetchCases } from '@/lib/data'

type Props = {
  params: {
    id: string
  }
  searchParams: {
    adminLang: Language
    page: string
  }
}

const tabs = [
  { name: "全部", path: "/netronAdmin/case" },
  { name: "成功案例", path: "/netronAdmin/case/3" },
  { name: "MSP 新世代雲端託管", path: "/netronAdmin/case/14" },
]

export default async function CasePage({
  searchParams: { adminLang, page },
  params: { id }
}: Props) {
  const result = await fetchCases(adminLang, page, id?.[0])

  return (
    <div className='relative flex flex-col gap-4 h-full'>
      <div className='absolute top-0 inset-x-0 flex items-center'>
        <h2 className='text-3xl font-medium'>案例清單</h2>
        <FormAddCase />
      </div>

      <div className='absolute top-16'>
        <TabsNav tabs={tabs} />
      </div>

      <section className='absolute top-28 pt-4 bottom-0 inset-x-0 flex flex-col'>
        {isSuccessResponse(result) ?
          <TableCase data={result.data.rows} key={page} /> :
          <div>{result.errorMsg}</div>
        }

        <div className='pt-8 mt-auto'>
          {isSuccessResponse(result) &&
            <Paginations
              perPage={10}
              total={result.data.total}
            />
          }
        </div>
      </section>
    </div>
  )
}
