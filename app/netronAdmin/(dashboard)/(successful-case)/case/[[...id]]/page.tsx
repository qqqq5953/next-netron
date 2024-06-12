import TableCase from '@/app/netronAdmin/(dashboard)/(successful-case)/_components/TableCase'
import FormAddCase from '@/app/netronAdmin/(dashboard)/(successful-case)/_components/FormAddCase'
import TabsNav from '@/components/TabsNav'

const tabs = [
  { name: "全部", path: "/netronAdmin/case" },
  { name: "成功案例", path: "/netronAdmin/case/3" },
  { name: "MSP 新世代雲端託管", path: "/netronAdmin/case/14" },
]

export default function CasePage() {
  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>案例清單</h2>
        <FormAddCase />
      </div>

      <TabsNav tabs={tabs} />

      <section>
        <TableCase />
      </section>
    </>
  )
}
