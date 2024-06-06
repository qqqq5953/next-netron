'use client'

import { Button } from '@/components/netronAdmin/global/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import TableCase from '@/components/netronAdmin/successful-case/TableCase'
import FormAddCase from '@/components/netronAdmin/successful-case/FormAddCase'

const tabs = [
  { name: "全部", path: "/netronAdmin/case" },
  { name: "成功案例", path: "/netronAdmin/case/3" },
  { name: "MSP 新世代雲端託管", path: "/netronAdmin/case/14" },
]

export default function CasePage() {
  const pathname = usePathname()

  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>案例清單</h2>
        <FormAddCase />
      </div>

      <div className='flex gap-2'>
        {tabs.map(tab => {
          return <Button
            key={tab.name}
            size="sm"
            variant="secondary"
            className={`${pathname === tab.path ? 'text-sky-500' : 'font-normal'}`}
          >
            <Link href={tab.path}>{tab.name}</Link>
          </Button>
        })}
      </div>

      <section>
        <TableCase />
      </section>
    </>
  )
}
