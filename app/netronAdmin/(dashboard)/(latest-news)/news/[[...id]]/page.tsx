'use client'

import { Button } from '@/components/netronAdmin/global/button'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import FormAddNews from '@/components/netronAdmin/latest-news/form-add-news'
import TableNews from '@/components/netronAdmin/latest-news/table-news'

const tabs = [
  { name: "所有資訊", path: "/netronAdmin/news" },
  { name: "雲端活動", path: "/netronAdmin/news/2" },
  { name: "雲端新聞", path: "/netronAdmin/news/5" },
  { name: "雲端技能學習", path: "/netronAdmin/news/9" },
]

export default function NewsPage() {
  const pathname = usePathname()
  const params = useParams<{ id: string }>()
  console.log('pathname', pathname);
  console.log('params', params);

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
