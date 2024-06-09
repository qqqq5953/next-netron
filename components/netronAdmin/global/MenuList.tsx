import { motion } from "framer-motion";
import { cn } from '@/lib/utils'
import { MenuItem } from "./MenuItem";
import { MenuList as MenuListType } from '@/lib/definitions'

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
  return <motion.ul variants={listVariants} className={cn(
    'flex flex-col gap-4 transition-all ease-in-out',
    props.isChild ? 'text-base' : 'text-lg pt-8',
  )}>
    {props.menuList.map((item) => (
      <MenuItem
        key={item.name}
        item={item}
        open={props.open}
        isChild={props.isChild}
      />
    ))}
  </motion.ul>
};