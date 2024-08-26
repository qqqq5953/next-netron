import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react"
import Link from "next/link";

import { MenuList as MenuListType } from '@/lib/definitions'

type Props = {
  menuList: MenuListType
}

export default function NavList(props: Props) {
  return (
    <div className="hidden lg:flex lg:gap-4 lg:items-center lg:ml-auto">
      {props.menuList.map(item => {
        return <Fragment key={item.name}>
          {item.children ? (
            <div className="relative group">
              <Button variant="ghost" className="text-base font-normal gap-1">
                {item.name}
                {item.icon && <item.icon />}
                <div className="group-hover:rotate-180 transition-all duration-500">
                  <ChevronDown size={16} />
                </div>
              </Button>
              <ul className="absolute top-full hidden group-hover:flex flex-col shadow-lg rounded-md min-w-full w-fit text-nowrap bg-white overflow-hidden py-1.5 border-t-4 border-t-sky-400">
                {item.children.map(child => {
                  return <li key={child.name}>
                    <Link href={child.path} className="block w-full px-4 py-2 hover:text-sky-500 transition-all duration-300">
                      {child.name}
                    </Link>
                  </li>
                })}
              </ul>
            </div>
          ) : (
            <Button variant="ghost" className="text-base font-normal">
              <Link href={item.path}>{item.name}</Link>
            </Button>
          )
          }</Fragment>
      })}
    </div>
  )
}
