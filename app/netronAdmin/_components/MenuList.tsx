import { motion } from "framer-motion";
import { cn } from '@/lib/utils'
import { MenuItem } from "./MenuItem";
import { MenuList as MenuListType } from '@/lib/definitions'
import { Accordion } from "@/components/ui/accordion";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { menuListObj } from "./Drawer";

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

type Props = {
  menuList: MenuListType
  open: boolean
  isChild?: boolean
}

export default function MenuList(props: Props) {
  const pathname = usePathname()
  const breadcrumbs = menuListObj[pathname]
  const [expandedItem, setExpandedItem] = useState(props.isChild ? "" : breadcrumbs[0])

  return <motion.ul variants={listVariants} className={cn(
    'transition-all ease-in-out',
    props.isChild ? 'text-base' : 'text-lg pt-8',
  )}>
    <Accordion
      type="single"
      collapsible
      value={expandedItem}
      onValueChange={(menuItemName) => setExpandedItem(menuItemName)}
      className="space-y-4"
    >
      {props.menuList.map((item) => {
        const isActive = item.path === pathname
        return <MenuItem
          key={item.name}
          item={item}
          open={props.open}
          isChild={props.isChild}
          isActive={isActive}
        />
      })}
    </Accordion>
  </motion.ul>
};
