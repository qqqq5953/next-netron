import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { MenuList as MenuListType } from '@/lib/definitions'
import NavDropdown from "./NavDropdown";

type Props = {
  menuList: MenuListType
}

export default function NavList(props: Props) {
  return (
    <div className="hidden lg:flex lg:gap-4 lg:items-center lg:ml-auto">
      {props.menuList.map(item => {
        return <Fragment key={item.name}>
          {
            item.path ? (
              <Button variant="ghost" className="text-base font-normal">
                <Link href={item.path}>{item.name}</Link>
              </Button>
            ) : item.children && item.children.length > 0 ? (
              <NavDropdown item={item} />
            ) : (
              null
            )
          }
        </Fragment>
      })}
    </div>
  )
}
