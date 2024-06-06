import { MenuList as MenuListType } from '@/lib/definitions'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils'

type Props = {
  menuList: MenuListType
  open: boolean
  isTransitioning: boolean
  isChild?: boolean
}

export default function MenuList(props: Props) {
  return (
    <ul
      className={cn(
        'flex flex-col gap-4 transition-all ease-in-out',
        props.isChild ? 'text-base' : 'text-lg pt-8',
      )}>
      {props.menuList.map(list => {
        return <li
          key={list.name}
          className={`flex flex-col gap-4 ${props.open ? '' : 'items-center'} `}
        >
          {list.children ?
            <Accordion type="single" collapsible>
              <AccordionItem
                value={list.name}
                className='border-none'
              >
                <AccordionTrigger
                  className={`p-0 hover:no-underline focus:no-underline font-normal`}
                  showChevron={props.open}
                >
                  <div className={`flex items-center gap-2 h-7`}>
                    {list.icon && <span className={`${!props.open && !props.isChild ? 'text-sky-700' : ''}`}><list.icon size={20} /></span>}
                    {props.open && !props.isTransitioning && <span>{list.name}</span>}
                  </div>
                </AccordionTrigger>
                <AccordionContent className={`pt-4 pb-0 ${props.open ? 'ml-7' : 'ml-0'}`}>
                  <MenuList
                    isTransitioning={props.isTransitioning}
                    menuList={list.children}
                    open={props.open}
                    isChild
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion> :
            <Link href={list.path} className={`flex items-center gap-2 h-7`}>
              {list.icon && <span><list.icon size={20} /></span>}
              {props.open &&
                !props.isTransitioning &&
                <span>{list.name}</span>
              }
              {props.isChild &&
                !props.open &&
                !props.isTransitioning &&
                <span>{list.name.substring(0, 1)}</span>
              }
            </Link>
          }
        </li>
      })}
    </ul>
  )
}
