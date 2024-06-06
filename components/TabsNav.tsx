'use client'

import { Button } from './netronAdmin/global/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  tabs: { name: string, path: string }[]
}

export default function TabsNav(props: Props) {
  const pathname = usePathname()

  return (
    <div className='flex gap-2'>
      {props.tabs.map(tab => {
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
  )
}
