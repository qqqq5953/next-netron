import { MenuList as MenuListType } from '@/lib/definitions'
import Link from 'next/link'
import clsx from 'clsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type Props = {
  menuList: MenuListType
  isChild?: boolean
}

export default function MenuList(props: Props) {
  return (
    <ul
      className={clsx(
        'flex flex-col gap-4',
        props.isChild ? 'font-normal text-base' : 'font-medium text-lg pt-8'
      )}>
      {props.menuList.map(list => {
        return <li
          key={list.name}
          className="flex flex-col gap-4"
        >
          {list.children ?
            <Accordion type="single" collapsible>
              <AccordionItem
                value={list.name}
                className='border-none'
              >
                <AccordionTrigger className='p-0 focus:no-underline no-underline'>
                  {list.icon && <list.icon />}
                  {list.name}
                </AccordionTrigger>
                <AccordionContent className='pt-4 pb-0'>
                  <MenuList menuList={list.children} isChild />
                </AccordionContent>
              </AccordionItem>
            </Accordion> :
            <Link href={list.path}>
              {list.icon && <list.icon />}
              {list.name}
            </Link>
          }
        </li>
      })}
    </ul>
  )
}
