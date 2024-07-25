'use client'

import { Button } from '../app/netronAdmin/_components/Button'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  tabs: { name: string, path: string }[]
}

export default function TabsNav(props: Props) {
  const pathname = usePathname()

  return (
    <div className='flex gap-2'>
      {props.tabs.map(tab => {
        const pathWithoutPathname = tab.path.split("?")[0]

        return <Button
          key={tab.name}
          size="sm"
          variant="secondary"
          className={`${pathname === pathWithoutPathname ? 'text-sky-500' : 'font-normal'}`}
        >
          <Link href={tab.path}>{tab.name}</Link>
        </Button>
      })}
    </div>
  )
}
