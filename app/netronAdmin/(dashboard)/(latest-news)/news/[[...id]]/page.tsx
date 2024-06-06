'use client'

import { Button } from '@/components/netronAdmin/global/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FormAddNews from '@/components/netronAdmin/latest-news/FormAddNews'
import TableNews from '@/components/netronAdmin/latest-news/TableNews'

const tabs = [
  { name: "所有資訊", path: "/netronAdmin/news" },
  { name: "雲端活動", path: "/netronAdmin/news/2" },
  { name: "雲端新聞", path: "/netronAdmin/news/5" },
  { name: "雲端技能學習", path: "/netronAdmin/news/9" },
]

export default function NewsPage() {
  const pathname = usePathname()

  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>消息清單</h2>
        <FormAddNews />
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
        <TableNews />
      </section>
    </>
  )
}
